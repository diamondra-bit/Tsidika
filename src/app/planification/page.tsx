"use client";

import { useTrip } from '@/context/TripContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  MapPin, Sparkles, ArrowRight, Trash2, 
  Calendar, Utensils, Camera, Bed 
} from 'lucide-react';
import Navbar from '@/app/components/Navbar';

interface TripItem {
  id: string | number; 
  name?: string;
  title?: string;
  img?: string;
  type: 'hebergement' | 'gastronomie' | 'decouverte';
  startDate?: string;
  endDate?: string;
  totalPrice?: number;
}

export default function PlanPage() {
  const { tripCart, removeFromTrip, isInitialized } = useTrip();
  const [mounted, setMounted] = useState(false);


  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculation of the overall total
  const estimatedTotal = tripCart.reduce((acc: number, curr: TripItem) => {
    return acc + (Number(curr.totalPrice) || 0);
  }, 0);

  if (!mounted || !isInitialized) {
    return (
      <div className="bg-[#FDFCFB] min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center pt-60 font-serif italic text-slate-400">
          Chargement de votre itinéraire...
        </div>
      </div>
    );
  }

  if (tripCart.length === 0) {
    return (
      <div className="bg-[#FDFCFB] min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto pt-40 px-6 flex flex-col items-center justify-center text-center">
          <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center mb-12 animate-pulse">
            <MapPin size={48} className="text-emerald-200" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif italic text-slate-900 mb-6">Votre carnet est vide.</h1>
          <p className="text-slate-400 mb-10 max-w-md">Ajoutez des hébergements ou des activités pour commencer à planifier votre voyage à Madagascar.</p>
          <Link href="/destination" className="group flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-full hover:bg-emerald-800 transition-all shadow-xl">
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Explorer</span>
            <ArrowRight size={16} />
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFCFB] min-h-screen font-lato">
      <Navbar />
      <main className="max-w-5xl mx-auto pt-32 pb-20 px-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-slate-100 pb-12 gap-6">
          <div>
            <h1 className="text-6xl md:text-7xl font-serif italic text-slate-900 leading-tight">Mon Voyage</h1>
            <p className="text-slate-400 text-sm mt-2">{tripCart.length} élément(s) dans votre carnet</p>
          </div>
          <button className="flex items-center gap-3 bg-emerald-50 text-emerald-700 px-6 py-4 rounded-2xl hover:bg-emerald-100 transition-colors">
            <Sparkles size={18} />
            <span className="text-[10px] font-black uppercase">Générer avec l'IA</span>
          </button>
        </header>

        <div className="space-y-6">
          {tripCart.map((item: TripItem) => (
            <div key={item.id} className="group bg-white border border-slate-100 rounded-[2.5rem] p-4 flex flex-col md:flex-row gap-8 hover:shadow-2xl transition-all duration-500 border-l-4 border-l-transparent hover:border-l-emerald-400">
              <div className="relative w-full md:w-52 h-52 rounded-[2rem] overflow-hidden shrink-0 shadow-inner">
                <img src={item.img || "/placeholder.jpg"} alt={item.name || item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 shadow-lg">
                  {item.type === 'hebergement' && <div className="p-2.5 bg-emerald-500 text-white rounded-xl"><Bed size={18} /></div>}
                  {item.type === 'gastronomie' && <div className="p-2.5 bg-orange-500 text-white rounded-xl"><Utensils size={18} /></div>}
                  {item.type === 'decouverte' && <div className="p-2.5 bg-sky-500 text-white rounded-xl"><Camera size={18} /></div>}
                </div>
              </div>

              <div className="flex-1 py-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] font-black uppercase text-slate-300 tracking-[0.2em] mb-1 block">
                      {item.type === 'hebergement' ? 'Séjour' : item.type}
                    </span>
                    <h3 className="text-3xl font-serif italic text-slate-900">{item.name || item.title}</h3>
                  </div>
                  <button 
                    onClick={() => removeFromTrip(item.id)} 
                    className="p-3 bg-slate-50 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                    title="Supprimer du carnet"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                
                <div className="flex flex-wrap items-center justify-between pt-8 mt-4 border-t border-slate-50">
                  <div className="flex items-center gap-6">
                    {item.startDate && (
                      <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-4 py-2 rounded-lg">
                        <Calendar size={14} className="text-emerald-600" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">
                          {new Date(item.startDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                          {item.endDate && ` — ${new Date(item.endDate).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}`}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-slate-900 font-serif italic text-2xl">
                    {item.totalPrice && item.totalPrice > 0 ? `${item.totalPrice.toLocaleString()}€` : "—"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-slate-900 rounded-[3.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="relative space-y-2">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Total de votre itinéraire</p>
            <h2 className="text-5xl font-serif italic">{estimatedTotal.toLocaleString()}€</h2>
          </div>
          <button className="relative px-14 py-6 bg-emerald-600 rounded-full font-black uppercase tracking-[0.2em] text-[11px] hover:bg-emerald-500 hover:scale-105 transition-all shadow-xl active:scale-95">
            Finaliser mon carnet
          </button>
        </div>
      </main>
    </div>
  );
}