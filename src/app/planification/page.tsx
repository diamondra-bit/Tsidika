"use client";

import { useTrip } from '@/context/TripContext';
import Link from 'next/link';
import { 
  MapPin, Sparkles, ArrowRight, Trash2, 
  Calendar, Utensils, Camera, Bed 
} from 'lucide-react';
import Navbar from '@/app/components/Navbar';

interface TripItem {
  id: number;
  name?: string;
  title?: string;
  img?: string;
  image?: string;
  type: 'hebergement' | 'gastronomie' | 'decouverte';
  parentRegion?: string;
  specialite?: string;
  duration?: string;
  startDate?: string;
  endDate?: string;
  totalPrice?: number;
  budgetMin?: number;
  budgetMax?: number;
}

export default function PlanPage() {
  const { tripCart, removeFromTrip } = useTrip();

  // --- EMPTY STATE ---
  if (tripCart.length === 0) {
    return (
      <div className="bg-[#FDFCFB] min-h-screen">
        <Navbar />
        <main className="max-w-7xl mx-auto pt-40 px-6 flex flex-col items-center justify-center text-center font-lato">
          <div className="relative mb-12">
            <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center animate-pulse">
              <MapPin size={48} className="text-emerald-200" />
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-serif italic text-slate-900 mb-6 leading-tight">
            Votre carnet est encore vide.
          </h1>
          <p className="text-slate-500 max-w-md mx-auto mb-12 font-light leading-relaxed">
            L'aventure commence par le choix d'une terre à explorer. 
            Sélectionnez une destination pour commencer à bâtir votre itinéraire idéal.
          </p>

          <Link href="/destination" className="group flex items-center gap-4 bg-slate-900 text-white px-10 py-5 rounded-full hover:bg-emerald-800 transition-all duration-500 shadow-xl shadow-emerald-900/10">
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Explorer les destinations</span>
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </main>
      </div>
    );
  }

  // --- STATE WITH CONTENTS---
  return (
    <div className="bg-[#FDFCFB] min-h-screen font-lato">
      <Navbar />
      <main className="max-w-5xl mx-auto pt-32 pb-20 px-6">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-slate-100 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-emerald-600" />
              <span className="text-emerald-800 font-black uppercase tracking-[0.4em] text-[10px]">Votre Itinéraire</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-serif italic text-slate-900 leading-tight">
              Mon Voyage
            </h1>
          </div>
          
          <button className="flex items-center gap-3 bg-emerald-50 text-emerald-700 px-6 py-4 rounded-2xl hover:bg-emerald-100 transition-all group">
            <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Générer avec l'IA</span>
          </button>
        </header>

        {/* List of items */}
        <div className="space-y-6">
          {tripCart.map((item: TripItem) => (
            <div 
              key={item.id} 
              className="group relative bg-white border border-slate-100 rounded-[2rem] p-4 flex flex-col md:flex-row gap-8 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500"
            >
              {/*Image & Icon type*/}
              <div className="relative w-full md:w-48 h-48 rounded-2xl overflow-hidden shrink-0">
                <img 
                  src={item.img || item.image || "/placeholder.jpg"} 
                  alt={item.name || item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4">
                  {item.type === 'hebergement' && <div className="p-2 bg-emerald-500 text-white rounded-lg shadow-lg"><Bed size={16} /></div>}
                  {item.type === 'gastronomie' && <div className="p-2 bg-orange-500 text-white rounded-lg shadow-lg"><Utensils size={16} /></div>}
                  {item.type === 'decouverte' && <div className="p-2 bg-sky-500 text-white rounded-lg shadow-lg"><Camera size={16} /></div>}
                </div>
              </div>

              {/* Text content */}
              <div className="flex-1 py-2 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-serif italic text-slate-900">{item.name || item.title}</h3>
                    <button 
                      onClick={() => removeFromTrip(item.id)}
                      className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      title="Supprimer de l'itinéraire"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <p className="text-slate-400 text-sm font-light">
                    {item.type === 'hebergement' && `Séjour prévu à ${item.parentRegion || 'votre destination'}`}
                    {item.type === 'gastronomie' && `Spécialité : ${item.specialite || 'Cuisine locale'}`}
                    {item.type === 'decouverte' && `Durée estimée : ${item.duration || 'À définir'}`}
                  </p>
                </div>

                {/* Base card with Dates and Prices*/}
                <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-50">
                  {item.startDate && item.endDate && (
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar size={14} className="text-emerald-600" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">
                        {new Date(item.startDate).toLocaleDateString('fr-FR')} — {new Date(item.endDate).toLocaleDateString('fr-FR')}
                      </span>
                    </div>
                  )}
                  {item.totalPrice ? (
                    <div className="text-emerald-800 font-serif italic text-lg">
                      {item.totalPrice}€ au total
                    </div>
                  ) : item.budgetMin && (
                    <div className="text-slate-600 font-serif italic">
                      Budget : {item.budgetMin}€—{item.budgetMax}€
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer*/}
        <div className="mt-16 p-10 bg-slate-900 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Total estimé du séjour</p>
            <h2 className="text-4xl font-serif italic">
              {tripCart.reduce((acc: number, curr: TripItem) => acc + (curr.totalPrice || 0), 0)}€
            </h2>
          </div>
          <button className="w-full md:w-auto px-12 py-5 bg-emerald-600 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-950/20 active:scale-95">
            Finaliser mon carnet
          </button>
        </div>

      </main>
    </div>
  );
}