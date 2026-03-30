"use client";

import { useState } from 'react';
import { X, Utensils, Star, Plus, Check } from 'lucide-react';
import { useTrip } from '@/context/TripContext';

export default function RestoModal({ resto, onClose }: any) {
  const { addToTrip } = useTrip();
  const [isAdded, setIsAdded] = useState(false);

 const budgetMin = Number(resto.budget_min) || 0; 
  const budgetMax = Number(resto.budget_max) || 0;
  
 // Calculating a representative price for the basket
  const averageBudget = budgetMin > 0 ? (budgetMin + budgetMax) / 2 : 0;

  const handleConfirm = () => {
    addToTrip({
      ...resto,
      cartId: `resto-${resto.id}-${Date.now()}`, 
      type: 'gastronomie',
      totalPrice: averageBudget 
    });
    
    setIsAdded(true);
    setTimeout(onClose, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-lato">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative bg-[#FDFCFB] w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        
        {/* Banner Image */}
        <div className="relative h-72 w-full">
          <img 
            src={resto.img || "/api/placeholder/800/600"} 
            alt={resto.name} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCFB] via-transparent to-black/20" />
          
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-10 space-y-10">
          {/* Header & Budget */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="space-y-3">
              <h2 className="text-5xl font-serif italic text-slate-900 leading-none tracking-tight">
                {resto.name}
              </h2>
              <div className="flex items-center gap-1 text-emerald-600">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    fill={i < (Number(resto.stars) || 0) ? "currentColor" : "none"} 
                    className={i < (Number(resto.stars) || 0) ? "text-emerald-500" : "text-slate-200"}
                  />
                ))}
              </div>
            </div>
            
            <div className="bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 min-w-[140px] text-center">
              <p className="text-2xl font-serif text-slate-900 leading-none">
                {budgetMin}€<span className="text-slate-300 mx-1">—</span>{budgetMax}€
              </p>
              <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest mt-2">Budget moyen</p>
            </div>
          </div>

          {/* Specialty Section */}
          <div className="relative group">
            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-orange-200 rounded-full" />
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-orange-800">
                <Utensils size={18} strokeWidth={1.5} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em]">Signature Culinaire</h3>
              </div>
              <p className="text-slate-500 text-lg font-serif leading-relaxed italic">
                {resto.specialite ? `"${resto.specialite}"` : "Une table d'exception célébrant les saveurs locales et le savoir-faire malgache."}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4">
            <button 
              onClick={handleConfirm}
              disabled={isAdded}
              className={`w-full py-6 rounded-[1.8rem] font-black uppercase tracking-[0.25em] text-[10px] transition-all flex items-center justify-center gap-3 shadow-xl
                ${isAdded 
                  ? 'bg-emerald-600 text-white translate-y-0' 
                  : 'bg-slate-900 text-white hover:bg-emerald-900 hover:-translate-y-1 active:scale-95'}`}
            >
              {isAdded ? (
                <><Check size={20} strokeWidth={3} /> Expérience réservée</>
              ) : (
                <><Plus size={20} strokeWidth={3} /> Ajouter à mon voyage</>
              )}
            </button>
            <p className="text-center text-[9px] text-slate-300 uppercase tracking-widest mt-6 font-bold">
              Aucun paiement requis pour l'ajout à l'itinéraire
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}