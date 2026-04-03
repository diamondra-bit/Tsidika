"use client";

import { useMemo } from 'react';
import { Wallet, Calendar, Camera, Trash2, ChevronRight, AlertCircle } from 'lucide-react';
import { SummaryProps, TripItem } from '@/types/trip';

export const SummaryView = ({
  items,
  budget,
  duration,
  onRemove,
  onGenerate,
  onUpdateDates
}: SummaryProps) => {
  const nbExperiences = items.filter((i: TripItem) =>
    i.type?.toLowerCase().includes('découverte') ||
    i.type?.toLowerCase().includes('decouverte') ||
    i.type?.toLowerCase().includes('gastronomie')
  ).length;

  const hotels = useMemo(() => {
    return items.filter(
      item =>
        item.type?.toLowerCase().includes('hébergement') &&
        item.checkIn &&
        item.checkOut
    );
  }, [items]);

  const conflictingPairs = useMemo(() => {
    const conflicts: { a: TripItem; b: TripItem }[] = [];

    for (let i = 0; i < hotels.length; i++) {
      for (let j = i + 1; j < hotels.length; j++) {
        const startA = new Date(hotels[i].checkIn!).getTime();
        const endA = new Date(hotels[i].checkOut!).getTime();
        const startB = new Date(hotels[j].checkIn!).getTime();
        const endB = new Date(hotels[j].checkOut!).getTime();

        if (startA < endB && endA > startB) {
          conflicts.push({ a: hotels[i], b: hotels[j] });
        }
      }
    }

    return conflicts;
  }, [hotels]);

  const hasConflict = conflictingPairs.length > 0;

  return (
    <div className="max-w-7xl mx-auto mb-15 animate-in fade-in duration-500">
      <div className="mb-16 border-l-4 border-slate-900 pl-8">
        <h1 className="text-4xl font-serif tracking-tight text-slate-900 mb-2">
          Planification du voyage
        </h1>
        <p className="text-slate-500 font-light italic">
          Récapitulatif des ressources et étapes de votre itinéraire à Madagascar.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 border border-slate-100 rounded-3xl overflow-hidden bg-white shadow-sm mb-16">
        <StatTile
          label="Budget Prévu"
          value={`${budget.toLocaleString()} €`}
          icon={<Wallet className="text-slate-400" size={20}/>}
        />
        <StatTile
          label="Durée Estimée"
          value={`${duration} nuit${duration > 1 ? 's' : ''}`}
          icon={<Calendar className="text-slate-400" size={20}/>}
          isMiddle
        />
        <StatTile
          label="Étapes Retenues"
          value={`${nbExperiences} activité${nbExperiences > 1 ? 's' : ''}`}
          icon={<Camera className="text-slate-400" size={20}/>}
        />
      </div>

      {hasConflict && (
        <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex flex-col gap-4 text-red-600 animate-pulse">
          <div className="flex items-center gap-4">
            <AlertCircle size={20} />
            <p className="text-sm font-medium">
              Attention : Des hébergements ont des dates qui se chevauchent. Veuillez modifier les dates ou supprimer l’un des logements.
            </p>
          </div>

          <div className="pl-9 text-sm space-y-1">
            {conflictingPairs.map((pair, index) => (
              <p key={index}>
                <strong>{pair.a.name}</strong> ({pair.a.checkIn} → {pair.a.checkOut}) chevauche <strong>{pair.b.name}</strong> ({pair.b.checkIn} → {pair.b.checkOut})
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-3xl border border-slate-100 p-8 mb-12">
        <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">
            Détails des sélections ({items.length})
          </h3>
        </div>

        <div className="divide-y divide-slate-50">
          {items.map((item) => {
            const itemPrice = Number(item.totalPrice) || 0;
            const isHotel = item.type?.toLowerCase().includes('hébergement');

            return (
              <div key={item.uniqueKey} className="py-6 flex items-start group transition-colors">
                <div className="w-16 h-16 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 border border-slate-100">
                  <img src={item.img || "/api/placeholder/300/300"} className="w-full h-full object-cover grayscale-0 group-hover:grayscale transition-all duration-500" alt="" />
                </div>

                <div className="ml-6 flex-grow">
                  <h4 className="text-lg font-medium text-slate-900">{item.name || item.title}</h4>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{item.type}</span>

                    {isHotel && item.checkIn && item.checkOut && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Du {new Date(item.checkIn).toLocaleDateString()} au {new Date(item.checkOut).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {isHotel && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 max-w-xl">
                      <div className="bg-slate-50 rounded-2xl p-4 shadow-sm">
                        <label className="text-[9px] uppercase font-black text-slate-300 block mb-1">Arrivée</label>
                        <input
                          type="date"
                          value={item.checkIn || ''}
                          className="w-full text-sm outline-none font-bold text-slate-700 bg-transparent"
                          onChange={(e) => onUpdateDates(item.uniqueKey, e.target.value, item.checkOut || e.target.value)}
                        />
                      </div>

                      <div className="bg-slate-50 rounded-2xl p-4 shadow-sm">
                        <label className="text-[9px] uppercase font-black text-slate-300 block mb-1">Départ</label>
                        <input
                          type="date"
                          value={item.checkOut || ''}
                          className="w-full text-sm outline-none font-bold text-slate-700 bg-transparent"
                          onChange={(e) => onUpdateDates(item.uniqueKey, item.checkIn || e.target.value, e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-right flex items-center gap-8">
                  <span className="text-sm font-mono text-slate-600">
                    {itemPrice > 0 ? `${itemPrice.toLocaleString()} €` : '0 €'}
                  </span>
                  <button onClick={() => onRemove(item.uniqueKey)} className="p-2 text-slate-200 hover:text-red-500 transition-colors">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-8 border-t border-slate-50 flex flex-col md:flex-row items-center justify-between gap-8">
        <button
          onClick={() => window.location.reload()}
          className="group flex items-center gap-3 text-slate-400 hover:text-slate-900 transition-colors duration-300"
        >
          <div className="w-8 h-[1px] bg-slate-200 group-hover:w-12 group-hover:bg-slate-900 transition-all duration-500"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Continuer l'exploration</span>
        </button>

        <button
          onClick={onGenerate}
          disabled={hasConflict}
          className={`relative px-12 py-5 group overflow-hidden border rounded-full transition-all duration-500 
            ${hasConflict 
              ? 'border-slate-200 cursor-not-allowed opacity-50' 
              : 'border-slate-900 hover:shadow-2xl hover:shadow-slate-200'}`}
        >
          {!hasConflict && <div className="absolute inset-0 w-0 bg-slate-900 group-hover:w-full transition-all duration-500 ease-out"></div>}
          <div className="relative flex items-center gap-4">
            <span className={`text-[11px] font-black uppercase tracking-[0.4em] transition-colors duration-500 
              ${hasConflict ? 'text-slate-300' : 'text-slate-900 group-hover:text-white'}`}>
              {hasConflict ? 'Dates Invalides' : "Finaliser l'itinéraire"}
            </span>
            <ChevronRight size={14} className={hasConflict ? 'text-slate-300' : 'text-slate-900 group-hover:text-white group-hover:translate-x-1 transition-all duration-500'} />
          </div>
        </button>
      </div>
    </div>
  );
};

const StatTile = ({ label, value, icon, isMiddle }: { label: string, value: string, icon: React.ReactNode, isMiddle?: boolean }) => (
  <div className={`p-10 flex flex-col items-center text-center ${isMiddle ? 'border-x border-slate-50' : ''}`}>
    <div className="mb-4">{icon}</div>
    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</span>
    <span className="text-2xl font-serif text-slate-900">{value}</span>
  </div>
);