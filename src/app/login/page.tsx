"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/app/components/Navbar';

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert('Compte créé avec succès. Vérifie éventuellement ton email.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        window.location.href = '/mes-itineraires';
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Erreur authentification');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FDFCFB] min-h-screen font-lato">
      <Navbar />

      <main className="max-w-2xl mx-auto px-6 pt-[110px] pb-20">
        <div className="bg-white rounded-[2rem] border border-slate-100 p-10 shadow-sm">
          <h1 className="text-4xl font-serif italic text-slate-950 mb-8">
            {mode === 'login' ? 'Connexion' : 'Créer un compte'}
          </h1>

          <div className="space-y-6">
            <div>
              <label className="text-sm text-slate-500 block mb-2">Email</label>
              <input
                type="email"
                className="w-full rounded-2xl border border-slate-200 px-4 py-4 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-slate-500 block mb-2">Mot de passe</label>
              <input
                type="password"
                className="w-full rounded-2xl border border-slate-200 px-4 py-4 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full rounded-2xl bg-slate-900 text-white py-4 hover:bg-emerald-700 transition-all"
            >
              {loading
                ? 'Chargement...'
                : mode === 'login'
                  ? 'Se connecter'
                  : 'Créer mon compte'}
            </button>

            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors"
            >
              {mode === 'login'
                ? "Je n'ai pas encore de compte"
                : "J'ai déjà un compte"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}