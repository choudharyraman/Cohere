export interface WeeklyPlan {
  id: string;
  workoutType: string;
  intensity: 'low' | 'moderate' | 'high';
  durationMinutes: number;
}

export function recalibrateWorkout(currentPlan: WeeklyPlan, resilienceScore: number): WeeklyPlan {
  if (resilienceScore < 40 && currentPlan.intensity === 'high') {
    return {
      ...currentPlan,
      workoutType: "Active Recovery & Mindfulness Walk",
      intensity: 'low',
      durationMinutes: 30
    };
  }
  return currentPlan;
}
