'use client';

import React from 'react';

export default function SharePage() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Health Insights',
          text: 'Check out my daily resilience and recovery metrics on Cohere!',
          url: window.location.href,
        });
      } catch (err) {
        console.error('Share failed', err);
      }
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl text-center">
        <h1 className="text-2xl font-black text-white mb-2">Weekly Wrap-up</h1>
        <p className="text-slate-400 mb-6 text-sm">Resilience Score: <span className="text-purple-400 font-bold">84/100</span></p>
        
        <div className="bg-purple-900/20 p-6 rounded-2xl border border-purple-500/30 mb-8">
          <div className="text-4xl mb-2">💪</div>
          <div className="text-white font-medium text-lg">Top 10% in Recovery</div>
        </div>

        <button 
          onClick={handleShare}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-bold py-4 px-6 rounded-xl transition-opacity shadow-lg shadow-purple-900/50"
        >
          Share to Socials
        </button>
      </div>
    </div>
  );
}
