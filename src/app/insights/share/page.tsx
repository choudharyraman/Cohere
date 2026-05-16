"use client";

import { motion } from 'framer-motion';
import { Share2, Download, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SharePage() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Aurora Health Milestone',
          text: 'I just hit a 12-day streak on Aurora Health Coach! 🚀',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 flex flex-col items-center justify-center relative">
      <Link href="/" className="absolute top-6 left-6 text-slate-400 hover:text-white flex items-center gap-2">
        <ArrowLeft className="w-5 h-5" /> Back to Dashboard
      </Link>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm"
      >
        <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 p-8 rounded-3xl shadow-2xl border border-indigo-500/30 text-center relative overflow-hidden mb-8">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-500/20 rounded-full mb-6 border border-indigo-500/50">
              <span className="text-4xl">🔥</span>
            </div>
            
            <h1 className="text-3xl font-black text-white mb-2">12 Day Streak</h1>
            <p className="text-indigo-200 mb-8 font-medium">Top 5% of Aurora Athletes</p>

            <div className="grid grid-cols-2 gap-4 text-left bg-black/20 p-4 rounded-xl border border-white/5">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Avg HRV</p>
                <p className="text-lg font-bold text-white">62 ms</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Sleep</p>
                <p className="text-lg font-bold text-white">7h 45m</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleShare}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
          <button 
            className="flex-1 bg-slate-800 hover:bg-slate-700 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 transition-all active:scale-95 border border-slate-700"
          >
            <Download className="w-5 h-5" />
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
}
