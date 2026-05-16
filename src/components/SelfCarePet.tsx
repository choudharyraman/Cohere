'use client';
import React from 'react';

export default function SelfCarePet() {
  return (
    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between">
      <div>
        <h3 className="text-white font-bold">Your Companion</h3>
        <p className="text-slate-400 text-sm">Level 12 • 450 XP</p>
      </div>
      <div className="text-4xl animate-bounce">🦊</div>
    </div>
  );
}
