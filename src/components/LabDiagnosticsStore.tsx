'use client';
import React from 'react';

export default function LabDiagnosticsStore() {
  return (
    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
      <h3 className="text-white font-bold mb-2">Diagnostics & At-Home Labs</h3>
      <p className="text-slate-400 text-sm mb-4">Order whole genome sequencing and diagnostic blood tests. Results sync via FHIR.</p>
      <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-medium transition-colors w-full">
        Order DNA Kit
      </button>
    </div>
  );
}
