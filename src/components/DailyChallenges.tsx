'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const challenges = [
  { id: 1, text: "Walk 15 mins post-lunch", type: "activity" },
  { id: 2, text: "Review sleep trend", type: "mindfulness" },
  { id: 3, text: "Hydrate: 64oz", type: "nutrition" }
];

export default function DailyChallenges() {
  const [completed, setCompleted] = useState<number[]>([]);

  const toggleChallenge = (id: number) => {
    if (completed.includes(id)) {
      setCompleted(completed.filter(c => c !== id));
    } else {
      setCompleted([...completed, id]);
    }
  };

  const progress = (completed.length / challenges.length) * 100;
  const allDone = completed.length === challenges.length;

  return (
    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-bold text-lg">Daily Biology Tasks</h3>
        <div className="text-purple-400 font-medium text-sm">Streak: 12 🔥</div>
      </div>

      <div className="space-y-3 relative z-10">
        {challenges.map(challenge => {
          const isDone = completed.includes(challenge.id);
          return (
            <motion.div 
              key={challenge.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleChallenge(challenge.id)}
              className={`p-4 rounded-2xl cursor-pointer flex items-center justify-between transition-colors border ${isDone ? 'bg-purple-900/40 border-purple-500/50' : 'bg-slate-800 border-slate-700/50 hover:bg-slate-700'}`}
            >
              <span className={`text-sm font-medium ${isDone ? 'text-purple-200 line-through' : 'text-slate-200'}`}>
                {challenge.text}
              </span>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${isDone ? 'border-purple-400 bg-purple-500' : 'border-slate-500'}`}>
                {isDone && <span className="text-white text-xs">✓</span>}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress Ring Background */}
      {allDone && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          className="absolute inset-0 bg-purple-600/20 blur-3xl rounded-full z-0 pointer-events-none" 
        />
      )}
      
      <div className="mt-6 flex flex-col items-center">
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: `${progress}%` }} 
            className={`h-full ${allDone ? 'bg-green-400 shadow-[0_0_10px_#4ade80]' : 'bg-purple-500'}`} 
          />
        </div>
        {allDone && <span className="text-green-400 text-xs font-bold mt-2 tracking-widest uppercase">All tasks complete!</span>}
      </div>
    </div>
  );
}
