'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { regions } from '../../data/region';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';

export default function RegionsPage() {
  const [search, setSearch] = useState('');
  const [activeZone, setActiveZone] = useState('Toutes');

  const zones = ['Toutes', 'Nord', 'Sud', 'Est', 'Ouest', 'Centre'];

  // Logique de filtrage combinée
  const filteredRegions = regions.filter(region => {
    const matchesSearch = 
      region.name.toLowerCase().includes(search.toLowerCase()) ||
      region.chefLieu.toLowerCase().includes(search.toLowerCase());
  
      const matchesZone = activeZone === 'Toutes' || region.zone === activeZone;

    return matchesSearch && matchesZone;
  });

  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-slate-50 font-lato pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">     
          <div className="mb-16 flex flex-col md:flex-row gap-8 items-center justify-between border-b border-slate-100 ">
            {/* SearchBar */}
            <SearchBar onSearch={setSearch} />
            {/* Filter by area */}
            <div className="flex items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar">
              {zones.map((zone) => (
                <button 
                  key={zone} 
                  onClick={() => setActiveZone(zone)}
                  className={`pb-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group whitespace-nowrap
                    ${activeZone === zone ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {zone}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-emerald-600 transition-all duration-300
                    ${activeZone === zone ? 'w-full' : 'w-0 group-hover:w-full'}`} 
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Region */}
          <div className="space-y-6">
            {filteredRegions.length > 0 ? (
              filteredRegions.map((region) => (
                <div key={region.id} className="group bg-white rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-100">
                  <div className="relative w-full md:w-2/5 h-64 md:h-auto overflow-hidden bg-slate-200">
                    <Image src={region.image} alt={region.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-8 md:p-10 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">{region.name}</h2>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-md">
                          {region.chefLieu}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{region.description}</p>
                    </div>
                    <div className="mt-8 flex items-center justify-between">
                      <Link href={`/regions/${region.slug}`} className="flex items-center gap-2 text-emerald-700 font-black text-xs uppercase tracking-widest group/link">
                        Voir détails <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                      </Link>
                      <span className="text-4xl font-black text-slate-50 opacity-10">{region.id.toString().padStart(2, '0')}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20">
                <p className="text-slate-400 font-bold uppercase tracking-widest">Aucun résultat pour cette zone ou recherche.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}