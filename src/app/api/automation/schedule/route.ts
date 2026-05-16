import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface UserHealthMetrics {
  id: string;
  macros: {
    proteinTarget: number;
    proteinConsumed: number;
    caloriesTarget: number;
    caloriesConsumed: number;
  };
  training: {
    targetSessionCompleted: boolean;
    load: number;
  };
  lastMealTimestamp: string;
}

interface ClassPassBooking {
  slotId: string;
  studioName: string;
  activityType: 'yoga' | 'recovery' | 'strength' | 'cardio';
  time: string;
  status: 'proposed' | 'booked';
}

interface DoorDashMeal {
  restaurantId: string;
  restaurantName: string;
  mealName: string;
  macros: { protein: number; calories: number };
  deliveryEstimateMinutes: number;
}

// ==========================================
// MOCK EXTERNAL API INTEGRATIONS
// ==========================================
async function mockClassPassAPI(location: string, type: 'recovery' | 'yoga'): Promise<ClassPassBooking> {
  const apiKey = process.env.CLASSPASS_API_KEY;
  if (!apiKey) console.warn("Missing CLASSPASS_API_KEY from Secrets Manager");
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    slotId: `cp_${Math.random().toString(36).substring(7)}`,
    studioName: "Zen Recovery & Yoga",
    activityType: type,
    time: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
    status: 'proposed'
  };
}

async function mockDoorDashAPI(macroTarget: { protein: number, maxCalories: number }): Promise<DoorDashMeal[]> {
  const apiKey = process.env.DOORDASH_API_KEY;
  if (!apiKey) console.warn("Missing DOORDASH_API_KEY from Secrets Manager");

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    {
      restaurantId: "dd_101",
      restaurantName: "Clean Eatz",
      mealName: "Grilled Chicken Protein Bowl",
      macros: { protein: 45, calories: 550 },
      deliveryEstimateMinutes: 25
    },
    {
      restaurantId: "dd_102",
      restaurantName: "Sweetgreen",
      mealName: "Custom Harvest Bowl with Extra Chicken",
      macros: { protein: 38, calories: 600 },
      deliveryEstimateMinutes: 35
    },
    {
      restaurantId: "dd_103",
      restaurantName: "Macro Kitchen",
      mealName: "Lean Turkey Meatballs & Quinoa",
      macros: { protein: 42, calories: 500 },
      deliveryEstimateMinutes: 30
    }
  ];
}

// ==========================================
// MAIN API ROUTE
// ==========================================
export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId parameter' }, { status: 400 });
    }

    // HIPAA COMPLIANCE: Ensure authorization/authentication middleware has run before this point
    // 1. Fetch user data from Firestore
    if (!db) throw new Error("Firestore not initialized");
    
    const userMetricsRef = doc(db, 'users', userId, 'metrics', 'daily');
    const userMetricsSnap = await getDoc(userMetricsRef);
    
    if (!userMetricsSnap.exists()) {
      return NextResponse.json({ error: 'User metrics not found' }, { status: 404 });
    }

    const metrics = userMetricsSnap.data() as Omit<UserHealthMetrics, 'id'>;
    const actionsTaken: string[] = [];
    const proposedUpdates: any = {};

    // 2. Training Automation Logic
    if (!metrics.training.targetSessionCompleted) {
      // Suggest recovery/yoga via ClassPass
      const booking = await mockClassPassAPI('local', 'recovery');
      proposedUpdates.classpassProposal = booking;
      actionsTaken.push(`Proposed ${booking.activityType} at ${booking.studioName}`);
    }

    // 3. Nutrition Automation Logic
    const proteinDeficit = metrics.macros.proteinTarget - metrics.macros.proteinConsumed;
    const caloriesRemaining = metrics.macros.caloriesTarget - metrics.macros.caloriesConsumed;
    
    // Check if within 2 hours of dinner (assuming 18:00 is dinner time for this mock logic)
    const currentHour = new Date().getHours();
    const isDinnerTimeWindow = currentHour >= 18 && currentHour <= 21;

    if (proteinDeficit >= 30 && isDinnerTimeWindow) {
      const mealOptions = await mockDoorDashAPI({ 
        protein: proteinDeficit, 
        maxCalories: caloriesRemaining 
      });
      proposedUpdates.doordashProposals = mealOptions;
      actionsTaken.push(`Suggested ${mealOptions.length} DoorDash high-protein options`);
    }

    // 4. Write back to Firestore 'weekly_plan'
    if (Object.keys(proposedUpdates).length > 0) {
      const weeklyPlanRef = doc(db, 'users', userId, 'dashboard', 'weekly_plan');
      await updateDoc(weeklyPlanRef, {
        lastAutomationRun: new Date().toISOString(),
        proposals: proposedUpdates
      });
    }

    return NextResponse.json({
      success: true,
      actions: actionsTaken,
      proposals: proposedUpdates
    });

  } catch (error) {
    console.error("Automation Route Error:", error);
    return NextResponse.json({ error: 'Internal Server Error', details: String(error) }, { status: 500 });
  }
}
