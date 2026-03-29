"use client";

import { X, Utensils, Star, Clock, Plus, Check } from 'lucide-react';
import { useState } from 'react';

export default function RestoModal({ resto, onClose, onAddToTrip }: any) {
  const [isAdded, setIsAdded] = useState(false);

  const handleConfirm = () => {
    onAddToTrip({
      ...resto,
      type: 'gastronomie',
      addedAt: new Date().toISOString()
    });
    setIsAdded(true);
    setTimeout(onClose, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-lato">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={onClose} 
      />

      <div className="relative bg-[#FDFCFB] w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="relative h-56 w-full">
          <img src={resto.img} alt={resto.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCFB] via-transparent to-black/20" />
          
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
          >
            <X size={18} />
          </button>

          <div className="absolute bottom-6 left-8">
            <span className="px-3 py-1 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
              Escale Gourmande
            </span>
          </div>
        </div>

        <div className="p-8 md:p-10 space-y-8">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h2 className="text-4xl font-serif italic text-slate-900 leading-tight">{resto.name}</h2>
              <div className="flex items-center gap-1.5 text-yellow-500">
                {[...Array(resto.stars)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
                <span className="text-slate-400 text-[10px] ml-1 uppercase font-bold tracking-tighter">Avis clients</span>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-2xl font-serif text-slate-900">{resto.budgetMin}€—{resto.budgetMax}€</p>
              <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest">Budget moyen</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 py-6 border-y border-slate-100">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
                <Utensils size={16} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Spécialité</p>
                <p className="text-sm font-medium text-slate-700">{resto.specialite}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                <Clock size={16} />
              </div>
              <div>
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Horaires</p>
                <p className="text-sm font-medium text-slate-700">12h00 — 22h30</p>
              </div>
            </div>
          </div>

          <p className="text-slate-500 font-serif italic text-lg leading-relaxed">
            "{resto.description || `Découvrez une cuisine authentique mettant en avant les produits locaux.`}"
          </p>

          <div className="flex gap-4 items-center pt-2">
            <button 
              onClick={handleConfirm}
              disabled={isAdded}
              className={`flex-[2] py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-3 shadow-lg
                ${isAdded 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-900 text-white hover:bg-black active:scale-95'}`}
            >
              {isAdded ? (
                <><Check size={18} /> Ajouté au voyage</>
              ) : (
                <><Plus size={18} /> Ajouter à mon itinéraire</>
              )}
            </button>
            
            <button 
              onClick={onClose}
              className="flex-1 py-5 border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all"
            >
              Plus tard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}