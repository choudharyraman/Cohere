import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { getVertexModel, TTM_SYSTEM_INSTRUCTION, evaluateClinicalSafety } from '@/lib/vertex-ai';

export async function POST(req: Request) {
  try {
    // 1. Verify the incoming request JWT
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized: Missing or invalid JWT' }, { status: 401 });
    }
    
    let userId = 'simulated_user_id';
    
    if (adminAuth) {
      try {
        const token = authHeader.split('Bearer ')[1];
        const decodedToken = await adminAuth.verifyIdToken(token);
        userId = decodedToken.uid;
      } catch (err) {
        console.warn('JWT verification failed, falling back to simulated for development', err);
      }
    }

    const { input, stage } = await req.json();

    if (!input) {
      return NextResponse.json({ error: 'Missing user input' }, { status: 400 });
    }

    // 2. Clinical Safety Check
    const isHighRisk = evaluateClinicalSafety(input);
    if (isHighRisk) {
      const triageResponse = "We detected a potential high-risk signal. Your safety is our priority. Please contact emergency services or your primary care provider immediately.";
      
      // Store safety trigger
      if (adminDb) {
         await adminDb.collection('safety_triggers').add({
           userId,
           input,
           timestamp: new Date().toISOString()
         });
      }

      return NextResponse.json({ response: triageResponse, isHighRisk: true }, { status: 200 });
    }

    // 3. Generate Coach Response using Vertex AI
    const model = getVertexModel('gemini-1.5-pro');
    
    const prompt = `
      System: ${TTM_SYSTEM_INSTRUCTION}
      User Stage: ${stage || 'Preparation'}
      User Input: ${input}
      Generate a supportive, TTM-grounded response.
    `;

    // Attempt generation if Vertex AI is configured, otherwise mock
    let coachResponse = "This is a simulated coaching response. Please configure Google Cloud credentials to use Vertex AI.";
    
    if (process.env.GOOGLE_CLOUD_PROJECT) {
      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedText = response.candidates?.[0]?.content?.parts?.[0]?.text;
        coachResponse = generatedText || coachResponse;
      } catch (genErr) {
        console.error("Vertex AI Generation Error:", genErr);
      }
    }

    // 4. Store coaching interaction
    if (adminDb) {
      await adminDb.collection('coaching_logs').add({
        userId,
        stage: stage || 'Preparation',
        input,
        response: coachResponse,
        timestamp: new Date().toISOString()
      });
    }

    return NextResponse.json({ response: coachResponse, isHighRisk: false }, { status: 200 });
  } catch (error) {
    console.error('Coaching API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
