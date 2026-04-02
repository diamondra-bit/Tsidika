"use client";

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Compass, Utensils, Moon, MapPin } from 'lucide-react';
import { DailyPlan, DetailedViewProps } from '@/types/trip';
import { ScheduleRow } from './ScheduleRow';

export const DetailedView = ({ items, onBack, budget }: DetailedViewProps) => {
  const [activeDay, setActiveDay] = useState(0);

  /* DATA TRANSFORMATION LOGIC */
  const days = useMemo((): DailyPlan[] => {
    const hotels = items.filter(item => item.type === 'hébergement');
    const activities = items.filter(item => item.type !== 'hébergement');
    
   if (hotels.length === 0) {
      const chunks: DailyPlan[] = [];
      for (let i = 0; i < activities.length; i += 3) {
        chunks.push({ 
          day: Math.floor(i / 3) + 1,
          hotel: null, 
          activities: activities.slice(i, i + 3) 
        });
      }
      return chunks;
    }

    return hotels.map((hotel, idx) => ({
      day: idx + 1,
      hotel,
      activities: activities.slice(idx * 2, (idx * 2) + 2)
    }));
  }, [items]);

  const currentDay = days[activeDay] || { day: 1, hotel: null, activities: [] };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
     <header className="mb-16 flex flex-col md:flex-row justify-between items-center border-b border-slate-100 pb-12 gap-8">
      
      {/* Title*/}
      <div className="flex flex-col items-start">
        <button 
          onClick={onBack} 
          className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-all mb-4"
        >
          <ChevronLeft size={14} /> Retour au sommaire
        </button>
        <h2 className="text-6xl font-serif italic text-slate-950 tracking-tighter leading-none">
          Itinéraire <span className="text-slate-400">Temporel</span>
        </h2>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-6 md:gap-10">
        <button 
          onClick={() => setActiveDay(prev => Math.max(0, prev - 1))}
          disabled={activeDay === 0}
          className={`p-4 rounded-full border transition-all ${
            activeDay === 0 
            ? 'border-slate-50 text-slate-200' 
            : 'border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-600 mb-2">Progression</span>
          <div className="flex gap-3">
            {days.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === activeDay ? 'w-12 bg-slate-900' : 'w-3 bg-slate-200'
                }`}
              />
            ))}
          </div>
          <h3 className="mt-4 text-4xl font-serif italic text-slate-950 leading-none">Jour {activeDay + 1}</h3>
        </div>

        <button 
          onClick={() => setActiveDay(prev => Math.min(days.length - 1, prev + 1))}
          disabled={activeDay === days.length - 1}
          className={`p-4 rounded-full border transition-all ${
            activeDay === days.length - 1 
            ? 'border-slate-50 text-slate-200' 
            : 'border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white'
          }`}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">       
        {/* MAIN LAYOUT: Hotel + Activities */}
        <div className="lg:col-span-7 space-y-16 min-h-[600px]">

          {/* ACTIVITY ROWS */}
          <div className="space-y-24 pt-8">
            {currentDay.activities.map((item, idx) => (
              <ScheduleRow
                key={item.id}
                time={idx === 0 ? "09:00" : "14:30"}
                title={item.name || item.title || "Activité sans titre"}
                type={item.type}
                img={item.img}
                icon={idx === 0 ? <Compass size={18}/> : <Utensils size={18}/>}
              />
            ))}
          </div>
        </div>

        {/* ASIDE: MAP PREVIEW */}
        <aside className="lg:col-span-5">
          <div className="sticky top-32">
            <div className="rounded-[4rem] bg-slate-950 aspect-[4/5] relative overflow-hidden shadow-2xl">
               <div className="absolute inset-0 opacity-40 grayscale contrast-125">
                  <div className="w-full h-full flex flex-col items-center justify-center text-white/20">
                      <MapPin size={60} strokeWidth={1} className="mb-4" />
                      <p className="text-[10px] font-black uppercase tracking-[0.5em]">
                        Suivi des coordonnées J-{activeDay + 1}
                      </p>
                  </div>
               </div>
               
               <div className="absolute bottom-10 left-10 right-10 bg-white p-8 rounded-[2.5rem] shadow-xl">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2">Focus Géographique</p>
                  <p className="text-xl font-serif italic text-slate-950">
                    {currentDay.activities[0]?.name || "Exploration libre"}
                  </p>
               </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};