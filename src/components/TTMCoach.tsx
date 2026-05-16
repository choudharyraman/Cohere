'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Activity, Heart, ArrowRight, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

type TTMStage = 'Precontemplation' | 'Contemplation' | 'Preparation' | 'Action' | 'Maintenance';

export default function TTMCoach() {
  // Simulated State for TTM Stage
  const [stage] = useState<TTMStage>('Preparation');
  const [crisisTriggered, setCrisisTriggered] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();

  const stageContent = {
    Precontemplation: "Small steps lead to big changes. Let's just track your energy today.",
    Contemplation: "You're thinking about moving more. What's one small thing you can do?",
    Preparation: "Ready to start? Let's log your first 10-minute walk.",
    Action: "You are doing great! Keep up the momentum.",
    Maintenance: "Consistency is key. You've built a strong habit.",
  };

  const [coachMessage, setCoachMessage] = useState(stageContent['Preparation']);

  const handleLogActivity = async (intensity: number) => {
    setLoading(true);
    try {
      const token = user ? await user.getIdToken() : 'mock-token';

      // 1. Ingest Activity
      const ingestRes = await fetch('/api/ingest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ heartRate: intensity * 10 + 60, intensity })
      });
      
      if (!ingestRes.ok) throw new Error('Ingestion failed');

      // 2. Ask Coach
      let inputString = `Logged an activity with intensity ${intensity}.`;
      if (intensity > 9) {
        // Trigger crisis logic by appending a high risk keyword for demo purposes
        inputString += " I am feeling chest pain.";
      }
      
      const coachRes = await fetch('/api/coach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ input: inputString, stage })
      });

      if (!coachRes.ok) throw new Error('Coach request failed');
      
      const data = await coachRes.json();
      
      if (data.isHighRisk) {
        setCrisisTriggered(true);
      } else {
        setCoachMessage(data.response);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative"
      >
        {/* Purple gradient glassmorphism background effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/30 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-600/20 blur-[80px] rounded-full pointer-events-none" />

        {/* Crisis Modal Overlay */}
        {crisisTriggered && (
          <div className="absolute inset-0 bg-slate-950/90 z-50 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Medical Alert</h2>
            <p className="text-slate-300 mb-6">
              We detected a potential high-risk signal in your activity log. Your safety is our priority. Please contact emergency services or your primary care provider immediately.
            </p>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-8 rounded-full transition-colors w-full">
              Contact Emergency Services
            </button>
          </div>
        )}

        <div className="p-8 relative z-10">
          <header className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Aurora <span className="text-purple-400">Coach</span></h1>
              <p className="text-slate-400 font-medium">Stage: {stage}</p>
            </div>
            <button 
              onClick={logout}
              className="text-slate-400 hover:text-white transition-colors p-2"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </header>

          <section className="mb-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <p className="text-lg text-slate-200 leading-relaxed">
                {loading ? "Thinking..." : `"${coachMessage}"`}
              </p>
            </div>
          </section>

          {/* Locked Interactive Controls to prevent hallucination */}
          <section className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Log Today&apos;s Activity</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleLogActivity(3)}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 disabled:opacity-50 border border-white/10 rounded-xl p-4 transition-all"
                >
                  <Activity className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-medium">Light</span>
                </button>
                <button 
                  onClick={() => handleLogActivity(6)}
                  disabled={loading}
                  className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 disabled:opacity-50 border border-white/10 rounded-xl p-4 transition-all"
                >
                  <Heart className="w-5 h-5 text-indigo-400" />
                  <span className="text-white font-medium">Moderate</span>
                </button>
              </div>
              <button 
                onClick={() => handleLogActivity(10)} // Will trigger crisis for demo
                disabled={loading}
                className="w-full mt-3 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white rounded-xl p-4 transition-all font-semibold shadow-lg shadow-purple-900/20"
              >
                <span>Intense Workout</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
