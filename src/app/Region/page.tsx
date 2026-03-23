"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { regions } from '../../data/region';

export default function RegionsPage() {
  // --- STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [activeZone, setActiveZone] = useState("Toutes");

  const zones = ["Toutes", "Nord", "Sud", "Est", "Ouest", "Centre"];

  // ---FILTERING LOGIC ---
  const filteredRegions = regions.filter((region) => {
    const matchesSearch = 
      region.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      region.chefLieu.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesZone = activeZone === "Toutes" || region.zone === activeZone;
    
    return matchesSearch && matchesZone;
  });

  return (
    <div className="bg-[#FDFCFB] min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto pt-30 pb-20 px-6">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-10 border-b border-slate-100 pb-10">
          <CategoryFilter 
            title="Explorer les Régions"
            categories={zones}
            activeCategory={activeZone}
            setActiveCategory={setActiveZone}
          />

          <div className="w-full md:w-80">
            <SearchBar onSearch={setSearchQuery} placeholder='Rechercher région' />
          </div>
          
        </div>

        {/* --- Main Section --- */}
        {filteredRegions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {filteredRegions.map((region, index) => (
              <div key={region.id} className="group flex flex-col">
                
                {/* Image */}
                <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-slate-100 rounded-sm">
                  <Image 
                    src={region.image} 
                    alt={region.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-[9px] font-black uppercase tracking-widest text-slate-900">
                      Zone {region.zone}
                    </span>
                  </div>

                  {/* Numero */}
                  <span className="absolute bottom-4 right-4 text-6xl font-black text-white/20 select-none">
                    {(index + 1).toString().padStart(2, '0')}
                  </span>
                </div>

                {/* Text */}
                <div className="space-y-3 flex-grow">
                  <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] text-emerald-600">
                    <span>Chef-lieu : {region.chefLieu}</span>
                  </div>
                  
                  <h3 className="text-2xl font-serif text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors uppercase tracking-tighter">
                    {region.name}
                  </h3>

                  <p className="text-slate-500 text-sm font-light leading-relaxed line-clamp-3 italic pt-2">
                    {region.description}
                  </p>
                </div>

                {/* Final Link */}
                <Link 
                  href={`/region/${region.slug}`}
                  className="mt-8 flex items-center gap-2 text-[10px] uppercase font-black tracking-widest text-slate-900 group/link"
                >
                  <span className="border-b border-slate-900 pb-0.5 group-hover/link:text-emerald-600 group-hover/link:border-emerald-600 transition-all">
                    Explorer la région
                  </span>
                  <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-slate-300 font-serif italic text-xl">
              Aucune région ne correspond à votre recherche...
            </p>
          </div>
        )}
      </main>
    </div>
  );
}