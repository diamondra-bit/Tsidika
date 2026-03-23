"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookmarkPlus, Check, MapPin, Clock } from 'lucide-react'; 
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { recits } from '../../data/recits';

export default function RecitsPage() {
  // --- STATES ---
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [includedIds, setIncludedIds] = useState<string[]>([]);

  const categories = ["Tous", "Aventure", "Culture", "Rencontre"];

  // ---FILTERING LOGIC ---
  const filteredRecits = recits.filter((recit) => {
    const matchesSearch = 
      recit.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      recit.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recit.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "Tous" || recit.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  // --- ACTIONS ---
  const toggleInclude = (id: string) => {
    setIncludedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-[#FDFCFB] min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto pt-30 pb-20 px-6">
        
        {/* --- HEADER  --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-5 gap-10 border-b border-slate-100 pb-10">
          
          <CategoryFilter 
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

          <div className="w-full md:w-80">
            <SearchBar onSearch={setSearchQuery} />
          </div>
          
        </div>

        {/* --- MAIN SECTION --- */}
        {filteredRecits.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredRecits.map((recit) => {
              const isIncluded = includedIds.includes(recit.id);
              
              return (
                <div key={recit.id} className="group flex flex-col">
                  {/* Image  */}
                  <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-slate-100 rounded-sm">
                    <Image 
                      src={recit.coverImage} 
                      alt={recit.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Button to include in trip */}
                    <button 
                      onClick={() => toggleInclude(recit.id)}
                      className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all z-10
                      ${isIncluded ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white/80 text-slate-900 hover:bg-white'}`}
                      aria-label={isIncluded ? "Retirer du voyage" : "Inclure dans le voyage"}
                    >
                      {isIncluded ? <Check size={18} /> : <BookmarkPlus size={18} />}
                    </button>
                  </div>

                  {/* Text */}
                  <div className="space-y-3 flex-grow">
                    <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-emerald-600">
                      <span>{recit.category}</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock size={10} /> {recit.readingTime || "5 min"}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-serif text-slate-900 leading-snug group-hover:text-emerald-800 transition-colors">
                      {recit.title}
                    </h3>

                    <div className="flex items-center gap-1 text-slate-400 text-[10px] uppercase font-bold">
                      <MapPin size={10} /> {recit.region}
                    </div>

                    <p className="text-slate-500 text-sm font-light leading-relaxed line-clamp-2 italic pt-2">
                      {recit.excerpt}
                    </p>
                  </div>

                  {/* Final link to explore the region */}
                  <Link 
                    href={`/recits/${recit.slug}`}
                    className="mt-6 text-[10px] uppercase font-black tracking-widest border-b border-slate-900 w-fit pb-1 hover:text-emerald-600 hover:border-emerald-600 transition-all"
                  >
                    Découvrir l'histoire
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-slate-300 font-serif italic text-xl text-center w-full">
              Aucun récit ne correspond à votre recherche...
            </p>
          </div>
        )}
      </main>
    </div>
  );
}