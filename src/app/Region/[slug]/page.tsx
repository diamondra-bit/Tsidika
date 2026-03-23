"use client";

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bed, Utensils, Camera, Info, Star, ChevronRight } from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import RegionCard from '@/app/components/RegionCard'; 
import ActivityCard from '@/app/components/ActivityCard';
import { regions } from '../../../data/region';
import { notFound } from 'next/navigation';

export default function RegionDetail({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const region = regions.find((r) => r.slug === resolvedParams.slug);

  const [activeTab, setActiveTab] = useState('overview');

  if (!region) return notFound();

  const nextRegion = regions[(regions.indexOf(region) + 1) % regions.length];

  const tabs = [
    { id: 'overview', label: 'Aperçu', icon: <Info size={14} /> },
    { id: 'hotels', label: 'Hôtels', icon: <Bed size={14} /> },
    { id: 'restos', label: 'Restaurants', icon: <Utensils size={14} /> },
    { id: 'activities', label: 'Activités', icon: <Camera size={14} /> },
  ];

  return (
    <div className="bg-[#FDFCFB] min-h-screen">
      <Navbar />

      {/* --- HERO COMPACT --- */}
      <div className="relative h-[50vh] w-full overflow-hidden bg-slate-900">
        {/* Main Image */}
        <Image src={region.image} alt={region.name} fill className="object-cover opacity-60" priority />

        {/* Main Title */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-emerald-400 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Région {region.zone}</span>
          <h1 className="text-6xl md:text-8xl font-black text-white uppercase tracking-tighter">{region.name}</h1>
        </div>
      </div>

      {/* --- TABS NAVIGATION --- */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex justify-center gap-6 md:gap-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-6 text-[10px] font-black uppercase tracking-widest transition-all border-b-2 
              ${activeTab === tab.id ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-16">      
        {/* --- Overview --- */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 animate-in fade-in duration-700">
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <h2 className="text-4xl font-serif italic text-slate-900 leading-tight">L'essence de {region.name}</h2>
                <p className="text-lg text-slate-600 leading-relaxed font-light">{region.description}</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-10 border-t border-slate-100">
                <div><p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Chef-lieu</p><p className="font-black text-slate-800 uppercase">{region.chefLieu}</p></div>
                <div><p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Climat</p><p className="font-black text-slate-800 uppercase">{region.climat}</p></div>
                <div><p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Superficie</p><p className="font-black text-slate-800 uppercase">{region.superficie}</p></div>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-6">
               <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 shadow-sm">
                  <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] block mb-4">Conseil Tsidika</span>
                  <p className="text-emerald-900 font-medium italic text-lg leading-relaxed">"{region.bonPlan}"</p>
               </div>
               <div className="relative aspect-square rounded-3xl overflow-hidden shadow-xl">
                  <Image src={region.pointsForts[0].img} alt="" fill className="object-cover" />
               </div>
            </div>
          </div>
        )}

        <div className="mt-10">      
          {/* Grid for hotels & Restaurants */}
          {(activeTab === 'hotels' || activeTab === 'restos') && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-in slide-in-from-bottom-4 duration-500">
              {activeTab === 'hotels' && region.hotels.map((hotel, i) => (
                <RegionCard 
                  key={i}
                  type="hotel"
                  title={hotel.name}
                  image={hotel.img}
                  priceOrBudget={hotel.price}
                  stars={hotel.stars}
                />
              ))}

              {activeTab === 'restos' && region.restaurants.map((resto, i) => (
                <RegionCard 
                  key={i}
                  type="resto"
                  title={resto.name}
                  image={resto.img}
                  priceOrBudget={`${resto.budgetMin} - ${resto.budgetMax}`}
                  subtitle={resto.specialite}
                  stars={resto.stars} 
                />
              ))}
            </div>
          )}

          {/* Grid for Activities */}
          {activeTab === 'activities' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4 duration-500">
              {region.activites.map((act, i) => (
                <ActivityCard 
                  key={i}
                  index={i}
                  title={act.title}
                  image={act.img}
                  duration={act.duration}
                  type={act.type}
                />
              ))}
            </div>
          )}

        </div>

      </main>

      {/* --- FOOTER --- */}
     <footer className="mt-28 relative h-[600px] w-full overflow-hidden group cursor-pointer">
        {/* Image  */}
        <Image 
          src={nextRegion.image} 
          alt={nextRegion.name} 
          fill 
          className="object-cover transition-transform duration-[3s] cubic-bezier(0.4, 0, 0.2, 1) group-hover:scale-110" 
        />
        
        {/* Overlay  */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/20 to-slate-900/80 transition-opacity duration-700 group-hover:opacity-90" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <Link href={`/region/${nextRegion.slug}`} className="group/link flex flex-col items-center">
            
            {/* Label */}
            <div className="flex items-center gap-4 mb-6 opacity-70 group-hover/link:opacity-100 transition-all duration-500">
              <span className="h-[1px] w-8 bg-emerald-400 group-hover/link:w-12 transition-all" />
              <span className="text-white text-[10px] font-black uppercase tracking-[0.5em]">
                Destination Suivante
              </span>
              <span className="h-[1px] w-8 bg-emerald-400 group-hover/link:w-12 transition-all" />
            </div>

            {/* Name */}
            <h2 className="text-white text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-none mb-8 transition-all duration-700 group-hover/link:scale-105">
              {nextRegion.name}
            </h2>

            {/* Button */}
            <div className="relative flex items-center justify-center w-20 h-20 rounded-full border border-white/30 bg-white/5 backdrop-blur-sm group-hover/link:bg-emerald-600 group-hover/link:border-emerald-600 group-hover/link:scale-110 transition-all duration-500">
              <ChevronRight className="text-white group-hover/link:translate-x-1 transition-transform" size={28} strokeWidth={3} />
              
              {/* Text*/}
              <span className="absolute -bottom-12 whitespace-nowrap text-[9px] font-black uppercase tracking-[0.3em] text-white/50 group-hover/link:text-white transition-colors">
                Explorer le {nextRegion.zone}
              </span>
            </div>
          </Link>
        </div>

        {/* Copyright*/}
        <div className="absolute left-10 bottom-10 hidden md:block">
          <p className="text-white/30 text-[10px] font-black uppercase tracking-widest [writing-mode:vertical-lr] rotate-180">
            Tsidika Madagascar &copy; 2026
          </p>
        </div>
     </footer>
    </div>
  );
}