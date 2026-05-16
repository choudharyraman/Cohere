'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { User, Shield, Bell, ChevronRight, Edit3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UserProfile() {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col items-center justify-center p-6 bg-slate-900 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 w-full h-32 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 blur-2xl pointer-events-none" />
        
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-950 shadow-2xl flex items-center justify-center overflow-hidden">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User className="w-10 h-10 text-slate-500" />
            )}
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-purple-600 rounded-full border-2 border-slate-950 hover:bg-purple-500 transition-colors">
            <Edit3 className="w-4 h-4 text-white" />
          </button>
        </div>
        
        <h2 className="text-2xl font-black text-white">{user?.displayName || 'Anonymous Athlete'}</h2>
        <p className="text-slate-400 font-medium text-sm mt-1">{user?.email || 'No email attached'}</p>
        
        <div className="flex gap-4 mt-6 w-full">
          <div className="flex-1 bg-slate-800/50 rounded-2xl p-4 text-center border border-slate-700/50">
            <div className="text-2xl font-black text-purple-400">12</div>
            <div className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-1">Day Streak</div>
          </div>
          <div className="flex-1 bg-slate-800/50 rounded-2xl p-4 text-center border border-slate-700/50">
            <div className="text-2xl font-black text-indigo-400">450</div>
            <div className="text-xs text-slate-400 font-bold tracking-widest uppercase mt-1">Total XP</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest pl-2">Account Settings</h3>
        
        <motion.button whileTap={{ scale: 0.98 }} className="w-full flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800 hover:bg-slate-800 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
              <User className="w-5 h-5 text-slate-300" />
            </div>
            <span className="text-white font-medium">Personal Information</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </motion.button>

        <motion.button whileTap={{ scale: 0.98 }} className="w-full flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800 hover:bg-slate-800 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
              <Shield className="w-5 h-5 text-slate-300" />
            </div>
            <span className="text-white font-medium">Privacy & Security</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </motion.button>

        <motion.button whileTap={{ scale: 0.98 }} className="w-full flex items-center justify-between p-4 bg-slate-900 rounded-2xl border border-slate-800 hover:bg-slate-800 transition-colors group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
              <Bell className="w-5 h-5 text-slate-300" />
            </div>
            <span className="text-white font-medium">Notifications</span>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-500" />
        </motion.button>
      </div>

      <div className="pt-4">
        <button 
          onClick={logout}
          className="w-full flex items-center justify-center p-4 bg-red-900/20 text-red-400 font-bold rounded-2xl border border-red-500/20 hover:bg-red-900/40 hover:border-red-500/40 transition-colors"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
