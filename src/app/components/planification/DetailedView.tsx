"use client";

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Compass, Utensils, Moon, MapPin } from 'lucide-react';
import { DailyPlan, DetailedViewProps, ScheduleRowProps } from '@/types/trip';
import { ScheduleRow } from './ScheduleRow';

export const DetailedView = ({ items, onBack, budget }: DetailedViewProps) => {
  const [activeDay, setActiveDay] = useState(0);

  /* DATA TRANSFORMATION LOGIC */
  const days = useMemo((): DailyPlan[] => {
    const hotels = items.filter(item => item.type === 'hébergement');
    const activities = items.filter(item => item.type !== 'hébergement');
    
    // Fallback: If no hotels are selected, chunk activities by 3
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

    // Standard Logic: Map activities to each hotel (2 activities per day)
    return hotels.map((hotel, idx) => ({
      day: idx + 1,
      hotel,
      activities: activities.slice(idx * 2, (idx * 2) + 2)
    }));
  }, [items]);

  const currentDay = days[activeDay] || { day: 1, hotel: null, activities: [] };

  return (
    <div className="max-w-7xl mx-auto py-12 animate-in fade-in duration-700">
      
      {/* HEADER SECTION */}
      <header className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-slate-100 pb-12">
        <div>
          <button 
            onClick={onBack} 
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-all mb-8"
          >
            <ChevronLeft size={14} /> Back to Summary
          </button>
          <h2 className="text-6xl font-serif italic text-slate-950 tracking-tighter">
            Temporal <span className="text-slate-300">Itinerary</span>
          </h2>
        </div>
        <div className="bg-slate-50 px-8 py-4 rounded-3xl border border-slate-100">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Total Budget</p>
          <span className="text-2xl font-serif italic text-emerald-700">
            {budget.toLocaleString()} Ar
          </span>
        </div>
      </header>

      {/* DAY NAVIGATION CONTROL */}
      <div className="flex items-center justify-center gap-12 mb-20">
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
          <h3 className="mt-6 text-4xl font-serif italic text-slate-950">Day {activeDay + 1}</h3>
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
        
        {/* MAIN LAYOUT: Hotel + Activities */}
        <div className="lg:col-span-7 space-y-16 min-h-[600px]">
          
          {/* BASE CAMP DISPLAY (HOTEL) */}
          {currentDay.hotel ? (
            <div className="p-10 bg-slate-950 rounded-[3rem] text-white flex items-center justify-between group overflow-hidden relative shadow-2xl">
              <div className="relative z-10 flex items-center gap-6">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                  <Moon className="text-emerald-400" size={24} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40 mb-1">Base Camp / Overnight</p>
                  <h4 className="text-3xl font-serif italic">{currentDay.hotel.name || currentDay.hotel.title}</h4>
                </div>
              </div>
              <img 
                src={currentDay.hotel.img} 
                className="absolute inset-0 w-full h-full object-cover opacity-20 scale-110 group-hover:scale-100 transition-transform duration-1000" 
                alt="Hotel background" 
              />
            </div>
          ) : (
            <div className="p-10 border-2 border-dashed border-slate-100 rounded-[3rem] flex items-center justify-center">
              <p className="text-slate-400 italic font-serif">No accommodation selected for this day</p>
            </div>
          )}

          {/* ACTIVITY ROWS */}
          <div className="space-y-24 pt-8">
            {currentDay.activities.map((item, idx) => (
              <ScheduleRow
                key={item.id}
                time={idx === 0 ? "09:00 AM" : "02:30 PM"}
                title={item.name || item.title || "Untitled Activity"}
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
                        Coordinate Tracking D-{activeDay + 1}
                      </p>
                  </div>
               </div>
               
               <div className="absolute bottom-10 left-10 right-10 bg-white p-8 rounded-[2.5rem] shadow-xl">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest mb-2">Geographic Focus</p>
                  <p className="text-xl font-serif italic text-slate-950">
                    {currentDay.activities[0]?.name || "Free Exploration"}
                  </p>
               </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

