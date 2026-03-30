"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Calendar, Plane } from 'lucide-react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ExploreLink from '../components/ExploreLink';
import { supabase } from '@/lib/supabase';
import { Destination } from '@/types/destination';

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeZone, setActiveZone] = useState("Toutes");
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  const zones = ["Toutes", "Nord", "Sud", "Est", "Ouest", "Centre"];

  useEffect(() => {
    async function fetchDestinations() {
      try {
        setLoading(true);
         const { data, error } = await supabase
          .from('destinations')
          .select('*')
          .order('name', { ascending: true });

        if (error) throw error;
        if (data) setDestinations(data);
      } catch (error) {
        console.error('Erreur Supabase:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDestinations();
  }, []);

  //  FILTERING
  const filteredDestinations = destinations.filter((dest) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      dest.name.toLowerCase().includes(searchLower) || 
      (dest.parent_region?.toLowerCase().includes(searchLower) ?? false);
    
    const matchesZone = activeZone === "Toutes" || dest.zone === activeZone;
    
    return matchesSearch && matchesZone;
  });

  return (
    <div className="bg-[#FDFCFB] min-h-screen font-lato">
      <Navbar />
      
      <main className="max-w-7xl mx-auto pt-32 pb-20 px-6">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-10 border-b border-slate-100 pb-10">
          <CategoryFilter 
            title="Explorer les Destinations"
            categories={zones}
            activeCategory={activeZone}
            setActiveCategory={setActiveZone}
          />

          <div className="w-full md:w-80">
            <SearchBar onSearch={setSearchQuery} placeholder='Trouver un lieu (ex: Isalo...)' />
          </div>
        </div>

        {/*LIST OF DESTINATIONS */}
        {loading ? (
          <div className="py-32 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
            <p className="text-slate-400 font-serif italic text-xl">Exploration en cours...</p>
          </div>
        ) : filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            {filteredDestinations.map((dest) => (
              <div key={dest.id} className="group flex flex-col">
                
                <Link href={`/destination/${dest.slug}`}>
                  <div className="relative aspect-[4/5] mb-8 overflow-hidden rounded-2xl shadow-sm bg-slate-100">
                    <Image 
                      src={dest.image_main || "/placeholder.jpg"} // Utilise image_main
                      alt={dest.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    
                    <div className="absolute top-6 left-6 z-10">
                      <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-slate-900 rounded-full shadow-sm">
                        {dest.zone}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Link>

                <div className="space-y-4 flex-grow px-2">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600">
                    <MapPin size={12} strokeWidth={3} />
                    <span>{dest.parent_region}</span> {/* Utilise parent_region */}
                  </div>
                  
                  <h3 className="text-3xl font-serif text-slate-900 leading-none group-hover:text-emerald-900 transition-colors tracking-tight">
                    {dest.name}
                  </h3>

                  <div className="flex gap-4 pt-1">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                      <Calendar size={12} className="text-emerald-500/50" />
                      {dest.best_time?.split('(')[0]} {/* Utilise best_time */}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                      <Plane size={12} className="text-emerald-500/50" />
                      {dest.access?.split('(')[0]}
                    </div>
                  </div>

                  <p className="text-slate-500 text-sm font-light leading-relaxed line-clamp-3 italic font-serif opacity-80 group-hover:opacity-100 transition-opacity">
                    "{dest.description}"
                  </p>
                </div>

                <ExploreLink href={`/destination/${dest.slug}`} label="Découvrir l'expérience"/>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="text-slate-200" size={32} />
            </div>
            <p className="text-slate-400 font-serif italic text-xl">
              Aucune destination trouvée pour votre recherche.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}