"use client";

import { useState } from 'react';
import { Download, Database } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, DocumentData } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

export default function DataExport() {
  const { user } = useAuth();
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    if (!user || !db) return;
    setExporting(true);
    
    try {
      const q = query(collection(db, 'fhir_observations'), where('userId', '==', user.uid));
      const snapshot = await getDocs(q);
      
      const records: DocumentData[] = [];
      snapshot.forEach(doc => records.push(doc.data()));
      
      const blob = new Blob([JSON.stringify(records, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `aurora_health_export_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data. See console for details.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl border border-slate-800 mt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Database className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Data Portability</h3>
            <p className="text-slate-400 text-sm">Download your medical FHIR records</p>
          </div>
        </div>
      </div>
      <button 
        onClick={handleExport}
        disabled={exporting || !user}
        className="w-full py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 border border-slate-700 rounded-xl text-white font-medium flex items-center justify-center gap-2 transition-colors"
      >
        <Download className="w-4 h-4" />
        {exporting ? 'Compiling Export...' : 'Export as JSON'}
      </button>
    </div>
  );
}
