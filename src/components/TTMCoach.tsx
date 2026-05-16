'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Activity, Heart, ArrowRight, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

type TTMStage = 'Precontemplation' | 'Contemplation' | 'Preparation' | 'Action' | 'Maintenance';

import DailyChallenges from './DailyChallenges';
import SecurityLock from './SecurityLock';
import DataExport from './DataExport';
import Vitals from './Vitals';
import Alerts from './Alerts';

// Next-Gen Features
import CamerarPPG from './CamerarPPG';
import GaitAnalysis from './GaitAnalysis';
import LabDiagnosticsStore from './LabDiagnosticsStore';
import SelfCarePet from './SelfCarePet';
import VoiceFirstAid from './VoiceFirstAid';
import LiveRouteShare from './LiveRouteShare';

import UserProfile from './UserProfile';

export default function TTMCoach() {
  // Simulated State for TTM Stage
  const [stage] = useState<TTMStage>('Preparation');
  const [crisisTriggered, setCrisisTriggered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'Coach' | 'Vitals' | 'Alerts' | 'Profile'>('Coach');
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

  const handleEmergencyCall = () => {
    window.open('tel:911', '_self');
  };

  return (
    <div className="min-h-[100dvh] bg-slate-950 flex items-center justify-center sm:p-6 lg:p-12">
      {/* Mobile Device Frame */}
      <div className="w-full h-[100dvh] sm:h-auto sm:max-w-[430px] sm:aspect-[9/16] bg-slate-950 sm:bg-slate-900 sm:rounded-[3rem] sm:border-[8px] border-slate-800 shadow-2xl relative overflow-hidden flex flex-col shadow-purple-900/20">
        
        {/* Background glow effects */}
        <div className="absolute top-0 left-0 w-full h-64 bg-purple-600/20 blur-[80px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-0 w-full h-64 bg-indigo-600/20 blur-[80px] rounded-full pointer-events-none -z-10" />

        {/* Top Header */}
        <header className="px-6 pt-12 pb-4 flex items-center justify-between z-10 relative bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-black text-white tracking-tight">Cohere</h1>
          </div>
          <button 
            onClick={() => setActiveTab('Profile')}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-slate-300 hover:text-white hover:bg-white/20 transition-colors overflow-hidden"
          >
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-4 h-4" />
            )}
          </button>
        </header>

        {/* Crisis Modal Overlay */}
        {crisisTriggered && (
          <div className="absolute inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-center p-6 text-center backdrop-blur-md">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full bg-red-950/40 border border-red-500/30 p-6 rounded-3xl shadow-2xl">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-black text-white mb-3">Medical Alert</h2>
              <p className="text-red-200 mb-6 text-sm leading-relaxed">
                Potential high-risk signal detected. Your safety is our priority. Please contact emergency services immediately.
              </p>
              <button 
                onClick={handleEmergencyCall}
                className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-xl transition-colors w-full shadow-lg shadow-red-900/50"
              >
                Call 911
              </button>
            </motion.div>
          </div>
        )}

        {/* Main Scrollable Content */}
        <main className="flex-1 overflow-y-auto px-6 pb-28 no-scrollbar relative z-10 space-y-8">
          
          {activeTab === 'Coach' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
              {/* Greeting */}
              <div>
                <h2 className="text-3xl font-black text-white mb-2">Hello, Athlete.</h2>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-xs font-medium rounded-full border border-slate-700">
                    TTM Stage
                  </span>
                  <span className="text-purple-400 font-bold text-sm">{stage}</span>
                </div>
              </div>

              {/* Coach Insight Card */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-purple-500 to-indigo-500" />
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                  Coach Insight
                </h3>
                <p className="text-xl text-slate-100 leading-relaxed font-light">
                  {loading ? (
                    <span className="flex items-center gap-2 text-base">
                      <svg className="animate-spin h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </span>
                  ) : `"${coachMessage}"`}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Log Today&apos;s Activity</h3>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button 
                    onClick={() => handleLogActivity(3)}
                    disabled={loading}
                    className="flex flex-col items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 disabled:opacity-50 border border-slate-700/50 rounded-2xl p-4 transition-all"
                  >
                    <Activity className="w-6 h-6 text-purple-400" />
                    <span className="text-white text-sm font-medium">Recovery</span>
                  </button>
                  <button 
                    onClick={() => handleLogActivity(6)}
                    disabled={loading}
                    className="flex flex-col items-center justify-center gap-2 bg-slate-800/50 hover:bg-slate-800 disabled:opacity-50 border border-slate-700/50 rounded-2xl p-4 transition-all"
                  >
                    <Heart className="w-6 h-6 text-indigo-400" />
                    <span className="text-white text-sm font-medium">Moderate</span>
                  </button>
                </div>
                <button 
                  onClick={() => handleLogActivity(10)}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 disabled:opacity-50 text-white rounded-2xl p-4 transition-all font-bold shadow-lg shadow-purple-900/30"
                >
                  Intense Push <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              {/* Extensibility Widgets inline for Coach Tab */}
              <div className="space-y-6 pt-4 border-t border-slate-800/50">
                <SelfCarePet />
                <DailyChallenges />
                <SecurityLock />
                <DataExport />
              </div>
            </motion.div>
          )}

          {activeTab === 'Vitals' && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
               <Vitals />
               <CamerarPPG />
               <GaitAnalysis />
               <LabDiagnosticsStore />
             </motion.div>
          )}

          {activeTab === 'Alerts' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <VoiceFirstAid />
              <Alerts />
              <LiveRouteShare />
            </motion.div>
          )}

          {activeTab === 'Profile' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <UserProfile />
            </motion.div>
          )}
        </main>

        {/* Bottom Tab Navigation */}
        <nav className="absolute bottom-0 w-full bg-slate-950/80 backdrop-blur-2xl border-t border-slate-800/50 pb-safe z-20">
          <div className="flex items-center justify-around p-4 pb-8 sm:pb-4">
            <button 
              onClick={() => setActiveTab('Coach')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'Coach' ? 'text-purple-400' : 'text-slate-500'}`}
            >
              <Activity className="w-6 h-6" />
              <span className="text-[10px] font-bold tracking-wider">COACH</span>
            </button>
            <button 
              onClick={() => setActiveTab('Vitals')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'Vitals' ? 'text-indigo-400' : 'text-slate-500'}`}
            >
              <Heart className="w-6 h-6" />
              <span className="text-[10px] font-bold tracking-wider">VITALS</span>
            </button>
            <button 
              onClick={() => setActiveTab('Alerts')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'Alerts' ? 'text-red-400' : 'text-slate-500'}`}
            >
              <AlertCircle className="w-6 h-6" />
              <span className="text-[10px] font-bold tracking-wider">ALERTS</span>
            </button>
            <button 
              onClick={() => setActiveTab('Profile')}
              className={`flex flex-col items-center gap-1 ${activeTab === 'Profile' ? 'text-slate-200' : 'text-slate-500'}`}
            >
              <User className="w-6 h-6" />
              <span className="text-[10px] font-bold tracking-wider">PROFILE</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
