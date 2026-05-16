interface WeeklyPlan {
  id: string;
  workoutType: string;
  intensity: 'low' | 'moderate' | 'high';
  durationMinutes: number;
}

export async function recalibrateForWeather(location: string, currentPlan: WeeklyPlan): Promise<WeeklyPlan> {
  // Mock external API call for environmental data
  console.log(`Fetching environmental data for ${location}`);
  const mockAQI = 150; // Hazardous

  if (mockAQI > 100 && currentPlan.workoutType.toLowerCase().includes("outdoor")) {
    return { 
      ...currentPlan, 
      workoutType: "Indoor Mobility & Core", 
      intensity: "low" 
    };
  }

  return currentPlan;
}
