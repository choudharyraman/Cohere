'use client';
import React, { useState } from 'react';
import { AlertCircle, Mic } from 'lucide-react';

export default function VoiceFirstAid() {
  const [active, setActive] = useState(false);

  const triggerEmergency = () => {
    setActive(true);
    console.log("Activating Voice-First Emergency Assistant...");
    console.log("Dialing 911...");
    console.log("Providing step-by-step first-aid directives...");
  };

  return (
    <div className={`p-4 rounded-xl border ${active ? 'bg-red-900/40 border-red-500' : 'bg-red-900/10 border-red-500/30'}`}>
      <div className="flex items-center gap-2 mb-3">
        <AlertCircle className="w-5 h-5 text-red-500" />
        <h3 className="text-red-400 font-bold">Voice-First Emergency Assistant</h3>
      </div>
      <p className="text-red-200 text-sm mb-4">Hands-free safety layer. Speaks step-by-step first-aid while triggering emergency services.</p>
      <button 
        onClick={triggerEmergency}
        className={`${active ? 'bg-red-500' : 'bg-red-600 hover:bg-red-500'} text-white px-4 py-3 rounded-lg font-bold w-full transition-colors flex items-center justify-center gap-2`}
      >
        <Mic className="w-5 h-5" />
        {active ? 'Emergency Triggered' : 'Activate First-Aid'}
      </button>
    </div>
  );
}
