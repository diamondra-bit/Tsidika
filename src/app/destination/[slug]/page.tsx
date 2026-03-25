"use client";

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Bed, Utensils, Camera, Info, 
  ChevronRight
} from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import DestinationCard from '@/app/components/DestinationCard'; 
import ActivityCard from '@/app/components/ActivityCard';
import { destinations } from '../../../data/destinations';
import { notFound } from 'next/navigation';

export default function DestinationDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const dest = destinations.find((d) => d.slug === resolvedParams.slug);

  const [activeTab, setActiveTab] = useState('overview');

  if (!dest) return notFound();

  // Search the next destination in the footer
  const currentIndex = destinations.indexOf(dest);
  const nextDest = destinations[(currentIndex + 1) % destinations.length];

  const tabs = [
    { id: 'overview', label: 'L’Expérience', icon: <Info size={14} /> },
    { id: 'hotels', label: 'Où Dormir', icon: <Bed size={14} /> },
    { id: 'restos', label: 'Saveurs', icon: <Utensils size={14} /> },
    { id: 'activities', label: 'À Faire', icon: <Camera size={14} /> },
  ];

  return (
    <div className="bg-[#FDFCFB] min-h-screen font-lato">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <div className="relative h-[65vh] w-full overflow-hidden bg-slate-900">
        <Image 
          src={dest.image} 
          alt={dest.name} 
          fill 
          className="object-cover opacity-70 scale-105" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/60" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <div className="flex items-center gap-3 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-700">
            <span className="h-[1px] w-6 bg-emerald-400" />
            <span className="text-emerald-400 font-black uppercase tracking-[0.5em] text-[10px]">
              Madagascar • {dest.zone}
            </span>
            <span className="h-[1px] w-6 bg-emerald-400" />
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none animate-in fade-in zoom-in duration-1000">
            {dest.name}
          </h1>
        </div>
      </div>

      {/* --- TABS NAVIGATION --- */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex justify-center gap-4 md:gap-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-6 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 
              ${activeTab === tab.id 
                ? 'border-emerald-600 text-emerald-600' 
                : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-20">      
        
        {/* --- TAB: OVERVIEW / EXPERIENCE --- */}
       {activeTab === 'overview' && (
          <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* --- Section 1 : Descritpion--- */}
            <div className="space-y-6 text-center">
              <h2 className="text-5xl font-serif text-slate-900 leading-tight">
                L'âme de <span className="italic text-emerald-700">{dest.name}</span>
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed font-light font-serif italic max-w-2xl mx-auto">
                "{dest.description}"
              </p>
            </div>

            {/* --- Section 2: Practical Information --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-y border-slate-100 py-10">
              <div className="text-center md:text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-2">Localisation</p>
                <p className="text-slate-800 font-bold">{dest.parentRegion}, Madagascar</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-2">Comment s'y rendre</p>
                <p className="text-slate-800 font-bold">{dest.access}</p>
              </div>
              <div className="text-center md:text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-2">Meilleure période</p>
                <p className="text-slate-800 font-bold">{dest.bestTime}</p>
              </div>
            </div>

            {/* --- Section 3: Textual Content --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              
              {/* The unmissable */}
              <div className="space-y-6">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">À ne pas manquer</h3>
                <ul className="space-y-4">
                  {dest.pointsForts.map((pt, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="text-emerald-500 font-bold">0{i + 1}.</span>
                      <div>
                        <p className="font-bold text-slate-900 uppercase text-sm">{pt.name}</p>
                        <p className="text-slate-500 text-sm font-light">L'un des trésors les plus emblématiques de la région.</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Advice & Atmosphere */}
              <div className="bg-emerald-50 p-10 rounded-3xl space-y-4 border border-emerald-100">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Le conseil Tsidika</h3>
                <p className="text-emerald-900 font-serif italic text-xl leading-relaxed">
                  {dest.bonPlan}
                </p>
                <div className="pt-4">
                  <p className="text-[10px] font-bold text-emerald-700/50 uppercase italic">* Prévoyez toujours de la monnaie locale (Ariary) pour les petits villages.</p>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* --- CONTENT GRIDS (HOTELS, RESTAURANTS, ACTIVITIES)--- */}
        <div className="mt-10">      
          {activeTab === 'hotels' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in slide-in-from-bottom-8 duration-500">
              {dest.hotels.length > 0 ? (
                dest.hotels.map((hotel, i) => (
                  <DestinationCard key={i} type="hotel" title={hotel.name} image={hotel.img} priceOrBudget={hotel.price} stars={hotel.stars} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                  <p className="text-slate-400 font-serif italic text-lg">Nos adresses d'exception à {dest.name} sont en cours de sélection...</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'restos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in slide-in-from-bottom-8 duration-500">
              {dest.restaurants.length > 0 ? (
                dest.restaurants.map((resto, i) => (
                  <DestinationCard 
                    key={i} 
                    type="resto" 
                    title={resto.name} 
                    image={resto.img} 
                    priceOrBudget={`${resto.budgetMin} - ${resto.budgetMax}`} 
                    subtitle={resto.specialite} 
                    stars={resto.stars} 
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                  <p className="text-slate-400 font-serif italic text-lg">Bientôt les meilleures tables de {dest.name} ici.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'activities' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom-8 duration-500">
              {dest.activites.length > 0 ? (
                dest.activites.map((act, i) => (
                  <ActivityCard key={i} index={i} title={act.title} image={act.img} duration={act.duration} type={act.type} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-100 rounded-3xl">
                  <p className="text-slate-400 font-serif italic text-lg">L'aventure commence bientôt à {dest.name}.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* --- NEXT DESTINATION FOOTER --- */}
     <footer className="mt-28 relative h-[80vh] w-full overflow-hidden group">
        <Image 
          src={nextDest.image} 
          alt={nextDest.name} 
          fill 
          className="object-cover transition-transform duration-[4s] group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <Link href={`/destination/${nextDest.slug}`} className="group/link flex flex-col items-center">
            <div className="flex items-center gap-4 mb-8">
              <span className="h-[1px] w-12 bg-white/30 group-hover/link:w-20 group-hover/link:bg-emerald-400 transition-all duration-500" />
              <span className="text-white text-[11px] font-black uppercase tracking-[0.6em]">Prochaine Étape</span>
              <span className="h-[1px] w-12 bg-white/30 group-hover/link:w-20 group-hover/link:bg-emerald-400 transition-all duration-500" />
            </div>

            <h2 className="text-white text-7xl md:text-[12rem] font-black uppercase tracking-tighter leading-none mb-12 transition-all duration-700 group-hover/link:scale-105">
              {nextDest.name}
            </h2>

            <div className="w-24 h-24 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center group-hover/link:bg-emerald-600 group-hover/link:border-emerald-600 group-hover/link:scale-110 transition-all duration-500">
              <ChevronRight className="text-white" size={32} strokeWidth={2} />
            </div>
          </Link>
        </div>
      </footer>
    </div>
  );
}