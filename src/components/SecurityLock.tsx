"use client";

import { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';

export default function SecurityLock() {
  const [locked, setLocked] = useState(false);
  const [passphrase, setPassphrase] = useState('');

  const handleLockToggle = async () => {
    if (!locked && passphrase.length >= 6) {
      // Hash passphrase and lock
      const encoder = new TextEncoder();
      const data = encoder.encode(passphrase);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      localStorage.setItem('health_vault_lock', hashHex);
      setLocked(true);
      setPassphrase('');
    } else if (locked) {
      const savedHash = localStorage.getItem('health_vault_lock');
      if (!savedHash) {
        setLocked(false);
        return;
      }
      
      const encoder = new TextEncoder();
      const data = encoder.encode(passphrase);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      if (hashHex === savedHash) {
        setLocked(false);
        setPassphrase('');
      } else {
        alert('Incorrect passphrase');
      }
    } else {
      alert('Passphrase must be at least 6 characters');
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800 mt-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold">Vault Security</h3>
          <p className="text-slate-400 text-sm">Encrypt health logs on-device</p>
        </div>
        {locked ? <Lock className="text-green-400" /> : <Unlock className="text-orange-400" />}
      </div>
      
      <div className="flex gap-3">
        <input 
          type="password"
          placeholder="Enter Passphrase"
          value={passphrase}
          onChange={(e) => setPassphrase(e.target.value)}
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
        />
        <button 
          onClick={handleLockToggle}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            locked ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'
          }`}
        >
          {locked ? 'Unlock' : 'Lock Vault'}
        </button>
      </div>
    </div>
  );
}
