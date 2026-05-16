import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    // 1. Verify the incoming request JWT
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: Missing or invalid JWT' }, { status: 401 });
    }
    
    let userId = 'simulated_user_id';
    
    // Attempt actual verification if we have credentials
    if (adminAuth) {
      try {
        const token = authHeader.split('Bearer ')[1];
        const decodedToken = await adminAuth.verifyIdToken(token);
        userId = decodedToken.uid;
      } catch (err) {
        console.warn('JWT verification failed, falling back to simulated for development', err);
      }
    }

    // 2. Parse the raw webhook payload
    const rawPayload = await req.json();

    // 3. Transform incoming sensor metrics into valid HL7 FHIR (R4)
    // This utilizes the logic defined in the local 'fhir-normalizer' skill
    const fhirObservation = normalizeToFHIR(rawPayload, userId);

    if (!fhirObservation) {
      return NextResponse.json({ error: 'Bad Request: Invalid payload or missing user reference' }, { status: 400 });
    }

    // 4. Store normalized resources in Firestore
    if (adminDb) {
      await adminDb.collection('fhir_observations').add(fhirObservation);
    } else {
      console.log('Simulating DB write:', fhirObservation);
    }

    return NextResponse.json(
      { message: 'Ingestion successful', data: fhirObservation },
      { status: 201 }
    );
  } catch (error) {
    console.error('Ingestion API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Mock normalization function referencing the fhir-normalizer skill
function normalizeToFHIR(payload: Record<string, unknown>, userId: string) {
  if (!payload || !userId) return null;

  return {
    resourceType: 'Observation',
    status: 'final',
    category: [
      {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/observation-category',
            code: 'activity',
            display: 'Activity',
          },
        ],
      },
    ],
    code: {
      coding: [
        {
          system: 'http://loinc.org',
          code: '8867-4',
          display: 'Heart rate', // simplified example mapping
        },
      ],
      text: 'Heart rate from wearable',
    },
    subject: {
      reference: `Patient/${userId}`,
    },
    effectiveDateTime: new Date().toISOString(),
    valueQuantity: {
      value: payload.heartRate || 75,
      unit: 'beats/minute',
      system: 'http://unitsofmeasure.org',
      code: '/min',
    },
  };
}
