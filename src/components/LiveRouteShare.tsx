'use client';
import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

export default function LiveRouteShare() {
  const [sharing, setSharing] = useState(false);

  return (
    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="w-5 h-5 text-green-400" />
        <h3 className="text-white font-bold">Live Route-Safety Sharing</h3>
      </div>
      <p className="text-slate-400 text-sm mb-4">Broadcast live GPS and biometric status to emergency contacts during outdoor workouts.</p>
      <button 
        onClick={() => setSharing(!sharing)}
        className={`${sharing ? 'bg-slate-700 text-green-400' : 'bg-green-600 hover:bg-green-500 text-white'} px-4 py-2 rounded-lg font-medium w-full transition-colors`}
      >
        {sharing ? 'Stop Broadcast' : 'Start Broadcast'}
      </button>
    </div>
  );
}
