"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { recits } from '../../data/recits';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';

export default function RecitsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");
  const categories = ["Tous", "Aventure", "Culture", "Rencontre"];

  const filteredRecits = recits.filter((recit) => {
    const matchesSearch = 
      recit.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      recit.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Tous" || recit.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#FDFCFB]">
      <Navbar />
      
      <main className="min-h-screen pt-48 pb-32 px-6 max-w-6xl mx-auto">
        
        {/* --- ZONE DE CONTRÔLE ÉPURÉE --- */}
        <div className="mb-24 flex flex-col md:flex-row gap-10 items-end justify-between border-b border-slate-100 pb-2">
  
            {/* Barre de recherche qui prend l'espace disponible */}
            <div className="">
                <SearchBar onSearch={setSearchQuery} />
            </div>

            {/* Filtres par thématiques d'aventures */}
            <div className="flex items-center gap-6 md:gap-10 overflow-x-auto no-scrollbar pb-2 md:pb-4">
                {["Tous", "Aventure", "Culture", "Rencontre"].map((cat) => (
                <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)}
                    className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all relative group whitespace-nowrap
                    ${activeCategory === cat ? 'text-emerald-700' : 'text-slate-300 hover:text-slate-500'}`}
                >
                    {cat}
                    <span className={`absolute -bottom-2 md:-bottom-4 left-0 h-0.5 bg-emerald-600 transition-all duration-300
                    ${activeCategory === cat ? 'w-full' : 'w-0 group-hover:w-full'}`} 
                    />
                </button>
                ))}
            </div>
        </div>
        

        {/* --- FLUX DE RÉCITS --- */}
        {filteredRecits.length > 0 ? (
          <div className="space-y-48">
            {filteredRecits.map((recit, i) => {
              const isEven = i % 2 === 0;
              return (
                <Link 
                  key={recit.id} 
                  href={`/recits/${recit.slug}`}
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center group`}
                >
                  <div className="w-full md:w-3/5 relative">
                    <div className="aspect-[16/10] overflow-hidden rounded-sm bg-slate-100">
                      <Image 
                        src={recit.coverImage} 
                        alt={recit.title} 
                        fill 
                        className="object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-2/5 space-y-6">
                    <span className="text-[10px] text-emerald-500 font-black tracking-[0.2em] uppercase italic">
                      {recit.category}
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif leading-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {recit.title}
                    </h2>
                    <p className="text-slate-500 leading-relaxed font-light text-lg italic">
                      {recit.excerpt}
                    </p>
                    <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                      <span className="text-[10px] text-slate-300 uppercase tracking-widest">
                        {recit.date}
                      </span>
                      <span className="text-xs font-serif italic group-hover:translate-x-2 transition-transform">
                        Lire la suite →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-40 border-t border-slate-100">
            <p className="text-slate-300 font-serif italic text-2xl">
              Aucune trace trouvée pour cette recherche...
            </p>
          </div>
        )}
      </main>
    </div>
  );
}