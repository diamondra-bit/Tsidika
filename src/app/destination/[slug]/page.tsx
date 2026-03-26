"use client";

import { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Bed, Utensils, Camera, Info, 
  MapPin, Calendar, Plane, ArrowRight 
} from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import DestinationCard from '@/app/components/DestinationCard'; 
import ActivityCard from '@/app/components/ActivityCard';
import HotelModal from '@/app/components/HotelModal';
import RestoModal from '@/app/components/RestoModal';
import ActivityModal from '@/app/components/ActivityModal'; 
import { destinations } from '../../../data/destinations';
import { notFound } from 'next/navigation';

export default function DestinationDetail({ params }: { params: Promise<{ slug: string }> }) {
  // Extracting slug from dynamic route parameters
  const resolvedParams = use(params);
  const dest = destinations.find((d) => d.slug === resolvedParams.slug);

  // --- CENTRALIZED STATE MANAGEMENT ---
  // Controls the active tab (Overview, Hotels, Restos, Activities)
  const [activeTab, setActiveTab] = useState('overview');
  
  // Controls which item (hotel, resto, or activity) is currently being viewed in a modal
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [itemType, setItemType] = useState<'hotel' | 'resto' | 'activity' | null>(null);
  
  // Stores the user's selected items for their trip (The Shopping Cart logic)
  const [tripCart, setTripCart] = useState<any[]>([]);

  // Safety check: if destination slug doesn't exist, trigger 404
  if (!dest) return notFound();

  // Logic for the footer: finds the next destination in the list for a continuous loop
  const currentIndex = destinations.indexOf(dest);
  const nextDest = destinations[(currentIndex + 1) % destinations.length];

 
  const handleAddToTrip = (selection: any) => {
    setTripCart((prev) => [...prev, selection]);
    console.log("Trip Updated:", [...tripCart, selection]);
  };

  const tabs = [
    { id: 'overview', label: 'L’Essence', icon: <Info size={14} /> },
    { id: 'hotels', label: 'Hébergements', icon: <Bed size={14} /> },
    { id: 'restos', label: 'Gastronomie', icon: <Utensils size={14} /> },
    { id: 'activities', label: 'Découvertes', icon: <Camera size={14} /> },
  ];

  return (
    <div className="bg-[#FDFCFB] min-h-screen font-lato selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      {/* --- CONDITIONAL MODALS RENDERER --- */}
      {selectedItem && itemType === 'hotel' && (
        <HotelModal 
          hotel={selectedItem} 
          onClose={() => { setSelectedItem(null); setItemType(null); }} 
          onAddToTrip={handleAddToTrip}
        />
      )}

      {selectedItem && itemType === 'resto' && (
        <RestoModal 
          resto={selectedItem} 
          onClose={() => { setSelectedItem(null); setItemType(null); }} 
          onAddToTrip={handleAddToTrip}
        />
      )}

      {selectedItem && itemType === 'activity' && (
        <ActivityModal 
          activity={selectedItem} 
          onClose={() => { setSelectedItem(null); setItemType(null); }} 
          onAddToTrip={handleAddToTrip}
        />
      )}

      {/* --- HERO SECTION --- */}
      <header className="relative h-[65vh] w-full flex items-end overflow-hidden bg-[#FDFCFB]">
        <Image
          src={dest.heroImage}
          alt={dest.name}
          fill
          priority
          quality={100}
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCFB] via-[#FDFCFB]/50 to-transparent from-0% via-40% to-75%" />
        
        <div className="relative z-10 max-w-6xl mx-auto w-full px-6 pb-32"> 
          <div className="space-y-7 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-emerald-600" />
              <span className="text-emerald-800 font-black uppercase tracking-[0.4em] text-[10px]">
                Madagascar • {dest.zone}
              </span>
            </div>
            <h1 className="text-7xl md:text-8xl font-serif italic text-slate-900 leading-[0.8] tracking-tighter">
              {dest.name}
            </h1>
          </div>
        </div>
      </header>

      {/* --- NAVIGATION TABS -- */}
      <nav className="sticky top-0 z-40 bg-[#FDFCFB]/90 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 flex justify-start gap-8 md:gap-12 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group flex items-center gap-2.5 py-6 text-[9px] font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap
              ${activeTab === tab.id ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 animate-in fade-in zoom-in" />
              )}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        
        {/* --- TAB: OVERVIEW ---  */}
        {activeTab === 'overview' && (
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 animate-in fade-in duration-1000 items-start">
            <div className="lg:col-span-7 space-y-16">
              <div className="space-y-4">
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-600">L'Expérience</span>
                <p className="text-2xl md:text-[25px] font-serif leading-tight text-slate-500 italic mt-5">
                  "{dest.description}"
                </p>
              </div>

              {/* HIGHLIGHTS GRID */}
              <div className="space-y-8 border-t border-slate-100">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-3 mt-8">
                  À ne pas manquer <span className="h-px w-16 bg-slate-100" />
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
                  {dest.pointsForts.map((pt, i) => (
                    <div key={i} className="group space-y-3">
                      <span className="text-3xl font-serif text-emerald-200 group-hover:text-emerald-400 transition-colors">0{i + 1}</span>
                      <p className="text-lg font-serif text-slate-900 border-b border-slate-50 pb-1.5 group-hover:border-emerald-100 transition-colors">
                        {pt.name}
                      </p>
                      <p className="text-sm text-slate-500 font-light leading-relaxed">
                        {pt.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm space-y-10">
                <div className="space-y-8">
                  <div className="flex gap-5 items-start">
                    <MapPin size={18} strokeWidth={1.5} className="text-emerald-600 mt-1" />
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 mb-0.5">Localisation</p>
                      <p className="text-lg font-serif text-slate-800 leading-tight">{dest.parentRegion}</p>
                    </div>
                  </div>
                  <div className="flex gap-5 items-start">
                    <Plane size={18} strokeWidth={1.5} className="text-emerald-600 mt-1" />
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 mb-0.5">Voyager</p>
                      <p className="text-lg font-serif text-slate-800 leading-tight">{dest.access}</p>
                    </div>
                  </div>
                  <div className="flex gap-5 items-start">
                    <Calendar size={18} strokeWidth={1.5} className="text-emerald-600 mt-1" />
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-slate-300 mb-0.5">Période Idéale</p>
                      <p className="text-lg font-serif text-slate-800 leading-tight">{dest.bestTime}</p>
                    </div>
                  </div>
                </div>
                {/* Editor's Pick / Tip section */}
                <div className="pt-8 border-t border-slate-100 space-y-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-emerald-600">Le Conseil Tsidika</p>
                  <p className="text-base font-serif italic text-slate-600 leading-relaxed">
                    {dest.bonPlan}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- Displays cards based on the selected tab --- */}
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          
          {/* TAB HÔTELS */}
          {activeTab === 'hotels' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {dest.hotels.length > 0 ? (
                dest.hotels.map((hotel, i) => (
                  <div key={i} onClick={() => { setSelectedItem(hotel); setItemType('hotel'); }} className="cursor-pointer">
                    <DestinationCard type="hotel" title={hotel.name} image={hotel.img} priceOrBudget={hotel.price} stars={hotel.stars} />
                  </div>
                ))
              ) : (
                <div className="col-span-full py-24 text-center bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200 text-slate-400 font-serif italic text-lg">
                   Sélection en cours...
                </div>
              )}
            </div>
          )}

          {/* TAB RESTOS */}
          {activeTab === 'restos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {dest.restaurants.length > 0 ? (
                dest.restaurants.map((resto, i) => (
                  <div key={i} onClick={() => { setSelectedItem(resto); setItemType('resto'); }} className="cursor-pointer">
                    <DestinationCard 
                      type="resto" 
                      title={resto.name} 
                      image={resto.img} 
                      priceOrBudget={`${resto.budgetMin}-${resto.budgetMax}`} 
                      subtitle={resto.specialite} 
                      stars={resto.stars} 
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full py-24 text-center bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200 text-slate-400 font-serif italic text-lg">
                  Les meilleures tables arrivent bientôt...
                </div>
              )}
            </div>
          )}

          {/* TAB ACTIVITY */}
          {activeTab === 'activities' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {dest.activites.length > 0 ? (
                dest.activites.map((act, i) => (
                  <div key={i} onClick={() => { setSelectedItem(act); setItemType('activity'); }} className="cursor-pointer">
                    <ActivityCard index={i} title={act.title} image={act.img} duration={act.duration} type={act.type} />
                  </div>
                ))
              ) : (
                <div className="col-span-full py-24 text-center bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200 text-slate-400 font-serif italic text-lg">
                   L'aventure se prépare...
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* --- FOOTER: Next Destination --- */}
      <footer className="relative h-[40vh] min-h-[300px] flex items-center overflow-hidden bg-slate-900 px-6 mt-16">
        <Image 
          src={nextDest.image} 
          alt="" 
          fill 
          className="object-cover opacity-20 grayscale transition-transform duration-[8s] hover:scale-110" 
        />
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <Link href={`/destination/${nextDest.slug}`} className="group inline-flex flex-col gap-8 items-start">
            <div className="flex items-center gap-4">
              <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.4em]">Continuer</span>
              <div className="h-px w-16 bg-emerald-400 group-hover:w-24 transition-all duration-700" />
            </div>
            <h2 className="text-white text-6xl md:text-7xl font-serif italic leading-none tracking-tighter group-hover:translate-x-6 transition-transform duration-1000 flex items-center gap-6">
              {nextDest.name}
              <ArrowRight className="w-12 h-12 text-emerald-500 group-hover:rotate-45 transition-transform" strokeWidth={1} />
            </h2>
          </Link>
        </div>
      </footer>
    </div>
  );
}