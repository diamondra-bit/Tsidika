"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/app/components/Navbar';

interface ItineraryDay {
  id: string;
  day_number: number;
  date_value: string | null;
  hotel_title: string | null;
  slots: {
    time: string;
    title: string;
    type: string;
    img?: string;
    label?: string;
  }[];
}

interface ItineraryHeader {
  id: string;
  title: string;
  total_budget: number;
  total_nights: number;
}

export default function ItineraryDetailPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(true);
  const [itinerary, setItinerary] = useState<ItineraryHeader | null>(null);
  const [days, setDays] = useState<ItineraryDay[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const {
          data: { user }
        } = await supabase.auth.getUser();

        if (!user) {
          window.location.href = '/login';
          return;
        }

        const { data: itineraryData, error: itineraryError } = await supabase
          .from('itineraries')
          .select('*')
          .eq('id', params.id)
          .single();

        if (itineraryError) throw itineraryError;

        const { data: daysData, error: daysError } = await supabase
          .from('itinerary_days')
          .select('*')
          .eq('itinerary_id', params.id)
          .order('day_number', { ascending: true });

        if (daysError) throw daysError;

        setItinerary(itineraryData);
        setDays(daysData || []);
      } catch (error) {
        console.error('Erreur chargement détail itinéraire:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [params.id]);

  return (
    <div className="bg-[#FDFCFB] min-h-screen font-lato">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-[110px] pb-20">
        {loading ? (
          <div className="text-slate-400">Chargement...</div>
        ) : !itinerary ? (
          <div className="text-slate-400">Itinéraire introuvable.</div>
        ) : (
          <>
            <div className="mb-16 border-l-4 border-slate-900 pl-8">
              <h1 className="text-4xl font-serif tracking-tight text-slate-900 mb-2">
                {itinerary.title}
              </h1>
              <p className="text-slate-500 font-light italic">
                {Number(itinerary.total_budget || 0).toLocaleString()} € · {itinerary.total_nights || 0} nuit(s)
              </p>
            </div>

            <div className="space-y-12">
              {days.map((day) => (
                <div key={day.id} className="bg-white rounded-[2rem] border border-slate-100 p-8">
                  <div className="mb-8">
                    <h2 className="text-3xl font-serif italic text-slate-950">
                      Jour {day.day_number}
                    </h2>
                    {day.date_value && (
                      <p className="text-slate-400 mt-2">
                        {new Date(day.date_value).toLocaleDateString()}
                      </p>
                    )}
                    {day.hotel_title && (
                      <p className="text-sm text-slate-500 mt-2">
                        Hébergement : {day.hotel_title}
                      </p>
                    )}
                  </div>

                  <div className="space-y-6">
                    {day.slots?.map((slot, idx) => (
                      <div key={idx} className="flex items-start gap-6 border-b border-slate-50 pb-4">
                        <div className="w-20 text-slate-900 font-serif italic">{slot.time}</div>
                        <div>
                          <h3 className="text-lg text-slate-900">{slot.title}</h3>
                          {slot.label && (
                            <p className="text-sm text-slate-400 mt-1">{slot.label}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}