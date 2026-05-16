'use client';

import React, { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';

export default function SecurityLock() {
  const [locked, setLocked] = useState(true);
  const [pin, setPin] = useState('');

  const handleUnlock = async () => {
    // Basic Web Crypto API implementation mock for hashing
    const encoder = new TextEncoder();
    const data = encoder.encode(pin);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    // In reality, compare hashHex to stored hash
    if (pin === '1234') { 
      setLocked(false);
      setPin('');
    } else {
      alert("Invalid Passphrase");
    }
  };

  if (!locked) {
    return (
      <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-2xl flex items-center justify-between">
        <span className="text-green-400 text-sm font-medium">Vault Unlocked</span>
        <button onClick={() => setLocked(true)} className="text-slate-400 hover:text-white"><Unlock className="w-5 h-5" /></button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col gap-3">
      <div className="flex items-center gap-2 text-slate-400 mb-2">
        <Lock className="w-4 h-4" />
        <span className="text-xs uppercase font-bold tracking-wider">Health Data Vault</span>
      </div>
      <div className="flex gap-2">
        <input 
          type="password" 
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter Passphrase"
          className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
        />
        <button onClick={handleUnlock} className="bg-purple-600 hover:bg-purple-500 text-white font-medium px-4 py-2 rounded-xl text-sm transition-colors">
          Unlock
        </button>
      </div>
    </div>
  );
}
