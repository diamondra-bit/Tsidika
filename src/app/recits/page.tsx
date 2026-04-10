'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import { supabase } from '@/lib/supabase';
import { Search } from 'lucide-react';

export default function RecitsPage() {
  const [query, setQuery] = useState('');
  const [recits, setRecits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecits() {
      try {
        const { data, error } = await supabase
          .from('recits')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (data) setRecits(data);
      } catch (err) {
        console.error('Erreur lors de la récupération des récits:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchRecits();
  }, []);

  const filteredRecits = recits.filter((recit) =>
    recit.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-[#FDFCFB]  min-h-screen">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* --- HEADER & SEARCH --- */}
        <div className="text-center mb-20">
          <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">
            Tsidika Journal
          </span>
          <h1 className="text-4xl md:text-5xl font-serif italic text-slate-900 mb-8 tracking-tighter">
            Récits de Voyage
          </h1>
          
          <div className="max-w-md mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors z-10" />
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher par titre (ex: Vanille, Baobab...)"
              className="w-full bg-white border border-slate-100 py-3.5 pl-12 pr-4 rounded-full text-sm focus:outline-none focus:border-emerald-200 focus:ring-4 focus:ring-emerald-500/5 transition-all placeholder:text-slate-300 text-slate-600 shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="italic font-serif text-slate-400 text-sm">Chargement de la collection...</p>
          </div>
        ) : (
          <>
            {/* --- No results --- */}
            {filteredRecits.length === 0 ? (
              <div className="text-center py-20 animate-in fade-in slide-in-from-top-2 duration-500">
                <p className="italic font-serif text-slate-400 text-lg">
                  {query ? `Aucun récit ne correspond à "${query}"` : "Le carnet est encore vide."}
                </p>
                {query && (
                  <button 
                    onClick={() => setQuery('')}
                    className="mt-4 text-emerald-600 text-[10px] uppercase tracking-widest hover:text-emerald-800 transition-colors"
                  >
                    Effacer la recherche
                  </button>
                )}
              </div>
            ) : (
              /* --- Récits --- */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-20">
                {filteredRecits.map((recit) => (
                  <Link
                    key={recit.id}
                    href={`/recits/${recit.slug}`}
                    className="group flex flex-col items-center animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-700 ease-out"
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/10] w-[85%] overflow-hidden bg-slate-50 rounded-sm mb-7 shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-1">
                      <Image
                        src={recit.cover_image}
                        alt={recit.title}
                        fill
                        className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-emerald-900/0 group-hover:bg-emerald-900/[0.02] transition-colors duration-700" />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col items-center text-center px-4 space-y-3">
                      <span className="text-emerald-600 text-[9px] font-bold uppercase tracking-[0.4em]">
                        {recit.category}
                      </span>
                      
                      <h2 className="text-2xl font-serif italic text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2 min-h-[56px]">
                        {recit.title}
                      </h2>

                      <p className="text-slate-400 leading-relaxed font-light line-clamp-2 text-sm">
                        {recit.excerpt}
                      </p>

                      <div className="flex items-center gap-3 pt-3">
                         <div className="h-px w-6 bg-slate-100 group-hover:bg-emerald-100 transition-colors" />
                         <span className="text-[10px] text-slate-300 uppercase tracking-widest group-hover:text-emerald-500 transition-colors">
                           {recit.read_time || 5} min read
                         </span>
                         <div className="h-px w-6 bg-slate-100 group-hover:bg-emerald-100 transition-colors" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}