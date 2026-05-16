import { VertexAI } from '@google-cloud/vertexai';

const project = process.env.GOOGLE_CLOUD_PROJECT || 'mock-project-id';
const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';

// Initialize Vertex with your Cloud project and location
const vertex_ai = new VertexAI({ project: project, location: location });

// Provide helper function to get the gemini model
export function getVertexModel(modelName: string = 'gemini-1.5-pro') {
  return vertex_ai.preview.getGenerativeModel({
    model: modelName,
  });
}

// System instructions based on TTM
export const TTM_SYSTEM_INSTRUCTION = `
You are the Principal AI Clinical Health Coach. 
Rules:
1. You are explicitly restricted from acting as a licensed medical professional.
2. You must NEVER generate medical diagnoses, prescribe medications, or invent fake citations.
3. You must always ground your coaching in the Transtheoretical Model of Change (TTM).
Do not make assumptions outside your scope. If the user mentions mild discomfort, encourage resting, but do not diagnose. 
`;

export function evaluateClinicalSafety(input: string): boolean {
  // If any input contains high-risk medical alerts (e.g., chest pain, self-harm, eating disorder language), trigger the clinical triage safety route immediately.
  const highRiskKeywords = ['chest pain', 'heart attack', 'suicide', 'kill myself', 'self harm', 'self-harm', 'purge', 'starve'];
  const lowerInput = input.toLowerCase();
  for (const keyword of highRiskKeywords) {
    if (lowerInput.includes(keyword)) {
      return true; // Risk detected
    }
  }
  return false;
}
