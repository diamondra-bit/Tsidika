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

  const filteredRecits = recits.filter((recit) => {
    const matchesSearch = 
      recit.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      recit.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Tous" || recit.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#FDFCFB] min-h-screen">
      <Navbar />
      
      <main className="max-w-6xl mx-auto pt-40 pb-20 px-6">
        
        {/* --- HEADER SIMPLE & ALIGNÉ --- */}
        <div className="mb-20 flex flex-col md:flex-row gap-8 items-center justify-between border-b border-slate-100 pb-6">
          <div className="w-full md:w-72">
            <SearchBar onSearch={setSearchQuery} />
          </div>

          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar">
            {["Tous", "Aventure", "Culture", "Rencontre"].map((cat) => (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] font-bold uppercase tracking-[0.2em] transition-all relative py-1
                ${activeCategory === cat ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-600'}`}
              >
                {cat}
                {activeCategory === cat && (
                  <span className="absolute -bottom-6 left-0 w-full h-0.5 bg-emerald-600" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* --- FLUX DE RÉCITS ÉPURÉ --- */}
        {filteredRecits.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-24">
            {filteredRecits.map((recit, i) => {
              const isEven = i % 2 === 0;
              return (
                <Link 
                  key={recit.id} 
                  href={`/recits/${recit.slug}`}
                  className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-10 md:gap-16 items-center group`}
                >
                  {/* Image : Simple et efficace */}
                  <div className="w-full md:w-1/2 overflow-hidden bg-slate-100 shadow-sm">
                    <div className="aspect-[16/9] relative">
                      <Image 
                        src={recit.coverImage} 
                        alt={recit.title} 
                        fill 
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Texte : Focus sur la clarté */}
                  <div className="w-full md:w-1/2 space-y-4">
                    <span className="text-[9px] text-emerald-600 font-bold uppercase tracking-[0.3em]">
                      {recit.category}
                    </span>
                    <h2 className="text-3xl font-serif text-slate-900 group-hover:text-emerald-800 transition-colors leading-tight">
                      {recit.title}
                    </h2>
                    <p className="text-slate-500 font-light leading-relaxed text-base line-clamp-3">
                      {recit.excerpt}
                    </p>
                    <div className="pt-2 flex items-center gap-4 text-slate-300">
                      <span className="text-[10px] uppercase tracking-widest">{recit.date}</span>
                      <span className="h-px w-8 bg-slate-100"></span>
                      <span className="text-xs font-serif italic text-slate-900 group-hover:pl-2 transition-all">Lire l'histoire</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-serif italic text-xl">Aucun récit trouvé...</p>
          </div>
        )}
      </main>
    </div>
  );
}