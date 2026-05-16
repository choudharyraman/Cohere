export interface HealthMetrics {
  trailingHRV: number; // ms
  restingHeartRate: number; // bpm
  sleepDuration: number; // hours
}

export interface WorkoutPlan {
  id: string;
  type: 'heavy-lifting' | 'active-recovery' | 'low-intensity-walk' | 'mindfulness';
  intensity: 'high' | 'medium' | 'low';
  description: string;
}

export function calculateResilienceScore(metrics: HealthMetrics): number {
  // Simple heuristic resilience calculator based on TTM and physiological markers
  let score = 100;
  
  if (metrics.sleepDuration < 7) {
    score -= (7 - metrics.sleepDuration) * 10;
  }
  if (metrics.restingHeartRate > 65) {
    score -= (metrics.restingHeartRate - 65) * 2;
  }
  if (metrics.trailingHRV < 50) {
    score -= (50 - metrics.trailingHRV) * 0.5;
  }
  
  return Math.max(1, Math.min(100, Math.round(score)));
}

export function interceptWorkoutPlan(
  scheduledWorkout: WorkoutPlan,
  metrics: HealthMetrics
): WorkoutPlan {
  const resilienceScore = calculateResilienceScore(metrics);

  // If score drops below 40, swap heavy lifting for recovery
  if (resilienceScore < 40 && scheduledWorkout.intensity === 'high') {
    return {
      id: `${scheduledWorkout.id}-recalibrated`,
      type: 'active-recovery',
      intensity: 'low',
      description: 'Your resilience score is low today. We swapped your heavy lifting for an active recovery session to prioritize your health.'
    };
  }

  return scheduledWorkout;
}
