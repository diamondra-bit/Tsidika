"use client";

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface DestinationItem {
  id: number;
  slug: string;
  name: string;
  zone: 'Nord' | 'Sud' | 'Est' | 'Ouest' | 'Centre';
  image_main: string;
  best_time?: string;
  parent_region?: string;
}

type FilterType = 'all' | 'Nord' | 'Sud' | 'Est' | 'Ouest' | 'Centre';

export default function TopDestinations() {
  const [destinations, setDestinations] = useState<DestinationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    async function fetchDestinations() {
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from('destinations')
          .select('id, slug, name, zone, image_main, best_time, parent_region')
          .order('name', { ascending: true });

        if (error) throw error;

        setDestinations(data || []);
      } catch (error) {
        console.error('Erreur chargement destinations:', error);
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDestinations();
  }, []);

  const filteredDestinations = useMemo(() => {
    const list = filter === 'all' 
      ? destinations 
      : destinations.filter((dest) => dest.zone === filter);
      
    return list.slice(0, 5);
  }, [destinations, filter]);

  const categories: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'Toutes' },
    { id: 'Nord', label: 'Nord' },
    { id: 'Sud', label: 'Sud' },
    { id: 'Est', label: 'Est' },
    { id: 'Ouest', label: 'Ouest' },
    { id: 'Centre', label: 'Centre' },
  ];

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto font-lato">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 mb-6">Top Destinations</h2>

          <div className="flex flex-wrap gap-6 text-sm font-bold text-slate-400">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`${
                  filter === cat.id
                    ? 'text-emerald-700 border-b-2 border-emerald-700'
                    : 'hover:text-slate-600'
                } pb-1 transition-all`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <Link
          href="/destination"
          className="border-2 border-emerald-50 px-6 py-2 rounded-full text-sm font-bold text-emerald-700 hover:bg-emerald-50 transition-all flex items-center gap-2"
        >
          Explorer tout <span className="text-xl">→</span>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-[430px] rounded-[2.2rem] bg-slate-100 animate-pulse"
            />
          ))}
        </div>
      ) : filteredDestinations.length === 0 ? (
        <div className="bg-white rounded-[2rem] border border-slate-100 p-10 text-slate-400">
          Aucune destination trouvée pour ce filtre.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 transition-all duration-500">
          {filteredDestinations.map((dest, index) => (
            <Link
              href={`/destination/${dest.slug}`}
              key={dest.id}
              className="group animate-in fade-in slide-in-from-bottom-4 duration-500 block"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-[380px] rounded-[2.2rem] overflow-hidden mb-4 shadow-sm border-2 border-transparent group-hover:border-white group-hover:shadow-xl transition-all duration-500 bg-slate-100">
                <Image
                  src={dest.image_main}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm">
                  <span className="text-[9px] font-black tracking-widest text-slate-800 uppercase">
                    {dest.zone}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-black text-slate-900 group-hover:text-emerald-700 transition-colors ml-2">
                {dest.name}
              </h3>

              <p className="text-xs text-slate-400 font-bold ml-2 uppercase tracking-tight opacity-0 group-hover:opacity-100 transition-opacity">
                {dest.parent_region || 'Découvrir plus'}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}