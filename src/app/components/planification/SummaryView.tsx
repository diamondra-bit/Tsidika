"use client";

import { Wallet, Calendar, Camera, Trash2, ChevronRight } from 'lucide-react';
import { SummaryProps, TripItem } from '@/types/trip';

export const SummaryView = ({ items, budget, duration, onRemove, onGenerate }: SummaryProps) => {
  
  // Filter activities to show count in the dashboard
  const nbActivites = items.filter((i: TripItem) => 
    i.type?.toLowerCase().includes('decouverte') || 
    i.type?.toLowerCase().includes('activit')
  ).length;

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
      
      {/* SECTION: HEADER */}
      <div className="mb-16 border-l-4 border-slate-900 pl-8">
        <h1 className="text-4xl font-serif tracking-tight text-slate-900 mb-2">
          Planification du voyage
        </h1>
        <p className="text-slate-500 font-light italic">
          Récapitulatif des ressources et étapes de votre itinéraire à Madagascar.
        </p>
      </div>

      {/* SECTION: DASHBOARD STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 border border-slate-100 rounded-3xl overflow-hidden bg-white shadow-sm mb-16">
        <StatTile 
          label="Budget Prévu" 
          value={`${budget.toLocaleString()} Ar`} 
          icon={<Wallet className="text-slate-400" size={20}/>} 
        />
        <StatTile 
          label="Durée Estimée" 
          value={`${duration} Jours`} 
          icon={<Calendar className="text-slate-400" size={20}/>} 
          isMiddle
        />
        <StatTile 
          label="Étapes Retenues" 
          value={`${nbActivites} activités`} 
          icon={<Camera className="text-slate-400" size={20}/>} 
        />
      </div>

      {/* SECTION: SELECTIONS LIST  */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 mb-12">
        <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
            Détails des sélections ({items.length})
          </h3>
        </div>

        <div className="divide-y divide-slate-50">
          {items.map((item) => {
            // Price normalization logic
            const itemPrice = typeof item.price === 'string' 
              ? parseFloat(item.price.replace(/[^0-9.]/g, '')) 
              : (item.price || 0);

            return (
              <div key={item.id} className="py-6 flex items-center group transition-colors">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100">
                  <img src={item.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" alt="" />
                </div>
                
                <div className="ml-6 flex-grow">
                  <h4 className="text-lg font-medium text-slate-900">{item.name || item.title}</h4>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{item.type}</span>
                </div>

                <div className="text-right flex items-center gap-8">
                  <span className="text-sm font-mono text-slate-600">
                    {itemPrice > 0 ? `${itemPrice.toLocaleString()} Ar` : '0 Ar'}
                  </span>
                  {/* Item removal action */}
                  <button 
                    onClick={() => onRemove(item.id)}
                    className="p-2 text-slate-200 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION: NAVIGATION ACTIONS */}
      <div className="mt-16 pt-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Secondary Action: Back to exploration */}
        <button 
          onClick={() => window.location.href = '/destinations'}
          className="group flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-colors duration-300"
        >
          <div className="w-8 h-[1px] bg-slate-200 group-hover:w-12 group-hover:bg-slate-900 transition-all duration-500"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Continuer l'exploration</span>
        </button>

        {/* Primary Action: Launch itinerary generation */}
        <button 
          onClick={onGenerate}
          className="relative px-12 py-5 group overflow-hidden border border-slate-900 rounded-full transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200"
        >
          <div className="absolute inset-0 w-0 bg-slate-900 group-hover:w-full transition-all duration-500 ease-out"></div>
          <div className="relative flex items-center gap-4">
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-900 group-hover:text-white transition-colors duration-500">
              Finaliser l'itinéraire
            </span>
            <ChevronRight size={14} className="text-slate-900 group-hover:text-white group-hover:translate-x-1 transition-all duration-500" />
          </div>
        </button>

      </div>
    </div>
  );
};

/**
 * Sub-component for Dashboard statistics.
 */
const StatTile = ({ label, value, icon, isMiddle }: { label: string, value: string, icon: React.ReactNode, isMiddle?: boolean }) => (
  <div className={`p-10 flex flex-col items-center text-center ${isMiddle ? 'border-x border-slate-50' : ''}`}>
    <div className="mb-4">{icon}</div>
    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</span>
    <span className="text-2xl font-serif text-slate-900">{value}</span>
  </div>
);