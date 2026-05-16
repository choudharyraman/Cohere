export const coachingPersonalities = {
  direct: "No excuses. Hit the target. We are looking at a 30g deficit.",
  empathetic: "It's okay to have an off day. Let's focus on recovery.",
  mindful: "Take a deep breath. Acknowledge your effort today. Be present.",
  spreadsheet: "Data indicates a 14% deviation from the weekly mean. Recalibrating.",
  intense: "Push harder! You're leaving gains on the table!",
  supportive: "You're doing amazing! Keep up the great work, step by step."
};

export function getCoachingResponse(persona: keyof typeof coachingPersonalities) {
  return coachingPersonalities[persona] || coachingPersonalities.empathetic;
}
