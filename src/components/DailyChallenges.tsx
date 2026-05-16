"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Share2, Flame } from 'lucide-react';
import Link from 'next/link';

interface Challenge {
  id: string;
  title: string;
  completed: boolean;
}

export default function DailyChallenges() {
  const [challenges, setChallenges] = useState<Challenge[]>([
    { id: '1', title: 'Walk 15 mins post-lunch', completed: false },
    { id: '2', title: 'Review sleep trend', completed: false },
    { id: '3', title: 'Hydrate 2L', completed: false }
  ]);
  const [streak] = useState(12);

  const toggleChallenge = (id: string) => {
    setChallenges(prev => 
      prev.map(c => c.id === id ? { ...c, completed: !c.completed } : c)
    );
  };

  const allCompleted = challenges.every(c => c.completed);

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-1">Daily Challenges</h2>
          <p className="text-slate-400 text-sm">Biology-backed tasks for today</p>
        </div>
        <div className="flex items-center gap-2 bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="font-bold text-orange-500">{streak} Day Streak</span>
        </div>
      </div>

      <div className="space-y-3">
        {challenges.map(challenge => (
          <motion.div 
            key={challenge.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleChallenge(challenge.id)}
            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors ${
              challenge.completed ? 'bg-indigo-500/20 border border-indigo-500/30' : 'bg-slate-800 border border-slate-700 hover:border-slate-600'
            }`}
          >
            {challenge.completed ? (
              <CheckCircle2 className="w-6 h-6 text-indigo-400 flex-shrink-0" />
            ) : (
              <Circle className="w-6 h-6 text-slate-500 flex-shrink-0" />
            )}
            <span className={`font-medium ${challenge.completed ? 'text-indigo-200 line-through opacity-70' : 'text-slate-200'}`}>
              {challenge.title}
            </span>
          </motion.div>
        ))}
      </div>

      {allCompleted && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-indigo-500/10 blur-xl"></div>
          <h3 className="text-lg font-bold text-indigo-300 relative z-10">Awesome Job! 🎉</h3>
          <p className="text-slate-300 text-sm mb-3 relative z-10">You&apos;ve completed all daily challenges.</p>
          <Link href="/insights/share" className="relative z-10 inline-flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full font-medium transition-colors">
            <Share2 className="w-4 h-4" />
            Share Milestone
          </Link>
        </motion.div>
      )}
    </div>
  );
}
