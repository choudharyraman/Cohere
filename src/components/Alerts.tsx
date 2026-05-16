'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, CheckCircle } from 'lucide-react';

export default function Alerts() {
  const pastAlerts = [
    { id: 1, date: '2026-05-14T08:30:00Z', type: 'High Heart Rate', resolved: true, description: 'Sustained HR > 180bpm during light activity.' },
    { id: 2, date: '2026-05-10T14:15:00Z', type: 'Crisis Keyword Detected', resolved: true, description: 'User mentioned chest pain. Emergency triage protocol initiated.' },
    { id: 3, date: '2026-05-02T09:00:00Z', type: 'Low HRV Warning', resolved: true, description: 'Trailing 7-day HRV dropped below baseline by 30%.' }
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <header className="mb-8">
        <h2 className="text-4xl font-black text-white mb-3">Safety Alerts</h2>
        <p className="text-slate-400 text-lg">System-generated clinical warnings and triage events.</p>
      </header>

      <div className="space-y-4">
        {pastAlerts.map((alert, idx) => (
          <motion.div 
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 relative overflow-hidden group"
          >
            <div className={`absolute top-0 left-0 w-1 h-full ${alert.type.includes('Crisis') ? 'bg-red-500' : 'bg-orange-500'}`} />
            
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-3">
                {alert.type.includes('Crisis') ? (
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-orange-400" />
                )}
                <h3 className="text-xl font-bold text-white">{alert.type}</h3>
              </div>
              <span className="flex items-center gap-1 text-sm text-slate-400">
                <Clock className="w-4 h-4" />
                {new Date(alert.date).toLocaleDateString()}
              </span>
            </div>
            
            <p className="text-slate-300 ml-8 mb-4">{alert.description}</p>
            
            <div className="ml-8 flex items-center gap-2">
              {alert.resolved ? (
                <span className="flex items-center gap-1 text-sm font-medium text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                  <CheckCircle className="w-4 h-4" /> Resolved by Provider
                </span>
              ) : (
                <span className="text-sm font-medium text-red-400 bg-red-400/10 px-3 py-1 rounded-full border border-red-400/20">
                  Action Required
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
