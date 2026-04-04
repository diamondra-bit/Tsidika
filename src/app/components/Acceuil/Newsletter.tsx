"use client";

import { useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setSuccess('');
    setError('');

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setError('Veuillez entrer une adresse email.');
      setLoading(false);
      return;
    }

    try {
      const { error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email: cleanEmail }]);

      if (insertError) {
        if (insertError.message.toLowerCase().includes('duplicate')) {
          setError('Cette adresse est déjà inscrite.');
        } else {
          throw insertError;
        }
      } else {
        setSuccess('Merci, votre inscription a bien été prise en compte.');
        setEmail('');
      }
    } catch (err) {
      console.error('Erreur newsletter:', err);
      setError("Impossible de s'inscrire pour le moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto font-lato">
      <div className="relative h-[450px] rounded-[3.5rem] overflow-hidden shadow-2xl flex items-center justify-center text-center px-6">
        <Image
          src="/Newsletter/newsletter-bg.jpg"
          alt="Paysage Madagascar"
          fill
          unoptimized
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
            Prêt à découvrir les <br /> Joyaux de Madagascar ?
          </h2>

          <p className="text-white/90 text-lg mb-10 font-medium">
            Inscrivez-vous pour recevoir nos guides secrets et récits d&apos;aventure directement dans votre boîte mail.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto bg-white/10 p-2 rounded-3xl backdrop-blur-md border border-white/20"
          >
            <input
              type="email"
              placeholder="Votre adresse email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white text-slate-900 px-6 py-4 rounded-2xl flex-grow focus:outline-none font-bold"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-4 rounded-2xl font-black transition-all shadow-lg active:scale-95 disabled:opacity-70"
            >
              {loading ? 'Envoi...' : "S'inscrire"}
            </button>
          </form>

          {success && (
            <p className="mt-4 text-white font-bold">
              {success}
            </p>
          )}

          {error && (
            <p className="mt-4 text-red-200 font-bold">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}