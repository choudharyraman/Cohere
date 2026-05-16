'use client';

import React from 'react';
import { Download } from 'lucide-react';

export default function DataExport() {
  const handleExport = () => {
    // Mocking Firebase Query and Aggregation
    const mockData = [
      { date: "2024-05-10", type: "sleep", value: "7.5 hrs" },
      { date: "2024-05-11", type: "mood", value: "calm" },
      { date: "2024-05-12", type: "heart_rate", value: "62 bpm" }
    ];

    // CSV Generation
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Date,Type,Value\n"
      + mockData.map(e => `${e.date},${e.type},${e.value}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "health_export.csv");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <button 
      onClick={handleExport}
      className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium py-3 px-4 rounded-xl transition-colors border border-slate-700"
    >
      <Download className="w-4 h-4" />
      Export Clinical Data (CSV)
    </button>
  );
}
