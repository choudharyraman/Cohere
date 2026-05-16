'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Activity, Moon, TrendingUp } from 'lucide-react';

export default function Vitals() {
  const metrics = [
    { name: 'Heart Rate Variability', value: '62 ms', status: 'Optimal', icon: <Heart className="w-5 h-5 text-red-400" /> },
    { name: 'Resting Heart Rate', value: '58 bpm', status: 'Excellent', icon: <Activity className="w-5 h-5 text-purple-400" /> },
    { name: 'Sleep Duration', value: '7h 15m', status: 'Good', icon: <Moon className="w-5 h-5 text-indigo-400" /> },
    { name: 'Resilience Score', value: '88/100', status: 'High', icon: <TrendingUp className="w-5 h-5 text-emerald-400" /> }
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-white mb-3">Your Vitals</h2>
        <p className="text-slate-400 text-lg">Continuous physiological monitoring powered by FHIR.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, idx) => (
          <motion.div 
            key={metric.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700 shadow-inner">
                {metric.icon}
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">{metric.name}</h3>
                <span className="text-sm font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 mt-1 inline-block border border-slate-700">
                  {metric.status}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-white">{metric.value}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6">
        <h3 className="text-indigo-300 font-bold mb-2">Clinical Note</h3>
        <p className="text-indigo-200/70">
          Your current physiological metrics indicate a high readiness for intense physical activity. 
          Your HRV baseline is stable.
        </p>
      </div>
    </div>
  );
}
