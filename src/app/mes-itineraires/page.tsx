"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/app/components/Navbar';
import { Calendar, Wallet, ChevronRight } from 'lucide-react';

interface ItineraryRow {
  id: string;
  title: string;
  total_budget: number;
  total_nights: number;
  starts_on: string | null;
  ends_on: string | null;
  created_at: string;
}

export default function MesItinerairesPage() {
  const [loading, setLoading] = useState(true);
  const [itineraries, setItineraries] = useState<ItineraryRow[]>([]);

  useEffect(() => {
    async function fetchItineraries() {
      try {
        const {
          data: { user }
        } = await supabase.auth.getUser();

        if (!user) {
          window.location.href = '/login';
          return;
        }

        const { data, error } = await supabase
          .from('itineraries')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setItineraries(data || []);
      } catch (error) {
        console.error('Erreur chargement itinéraires:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchItineraries();
  }, []);

  return (
    <div className="bg-[#FDFCFB] min-h-screen font-lato">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-[110px] pb-20">
        <div className="mb-16 border-l-4 border-slate-900 pl-8">
          <h1 className="text-4xl font-serif tracking-tight text-slate-900 mb-2">
            Mes itinéraires
          </h1>
          <p className="text-slate-500 font-light italic">
            Retrouvez ici tous vos voyages enregistrés.
          </p>
        </div>

        {loading ? (
          <div className="text-slate-400">Chargement...</div>
        ) : itineraries.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-100 p-10 text-slate-400">
            Aucun itinéraire enregistré pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {itineraries.map((itinerary) => (
              <div
                key={itinerary.id}
                className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-3xl font-serif italic text-slate-950 leading-tight">
                      {itinerary.title}
                    </h2>
                    <p className="text-sm text-slate-400 mt-2">
                      Créé le {new Date(itinerary.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-slate-600">
                    <Wallet size={16} />
                    <span>{Number(itinerary.total_budget || 0).toLocaleString()} €</span>
                  </div>

                  <div className="flex items-center gap-3 text-slate-600">
                    <Calendar size={16} />
                    <span>{itinerary.total_nights || 0} nuit(s)</span>
                  </div>

                  {(itinerary.starts_on || itinerary.ends_on) && (
                    <div className="text-sm text-slate-400">
                      {itinerary.starts_on || '—'} → {itinerary.ends_on || '—'}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => (window.location.href = `/mes-itineraires/${itinerary.id}`)}
                  className="group flex items-center gap-3 text-slate-900 hover:text-emerald-600 transition-colors"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">
                    Voir l’itinéraire
                  </span>
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}