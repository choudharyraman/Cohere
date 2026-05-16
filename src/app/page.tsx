'use client';

import TTMCoach from '@/components/TTMCoach';
import Login from '@/components/Login';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main>
      {user ? <TTMCoach /> : <Login />}
    </main>
  );
}
