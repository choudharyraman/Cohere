'use client';
import React from 'react';

export default function GaitAnalysis() {
  return (
    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
      <h3 className="text-white font-bold mb-2">Gait & Joint Load Analysis</h3>
      <p className="text-slate-400 text-sm mb-4">Dynamically assess walking patterns and knee joint load angles via camera.</p>
      <button className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-lg font-medium w-full transition-colors">
        Analyze Kinematics
      </button>
    </div>
  );
}
