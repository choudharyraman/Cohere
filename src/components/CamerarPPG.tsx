'use client';
import React from 'react';

export default function CamerarPPG() {
  return (
    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
      <h3 className="text-white font-bold mb-2">Recharge Dayz Face Scan</h3>
      <p className="text-slate-400 text-sm mb-4">Extracts skin blood flow variations to calculate HRV using your camera (rPPG).</p>
      <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium w-full transition-colors">
        Start Morning Scan
      </button>
    </div>
  );
}
