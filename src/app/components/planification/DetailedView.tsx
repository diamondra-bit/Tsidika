"use client";

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Compass, Utensils, Moon } from 'lucide-react';
import { DetailedViewProps } from '@/types/trip';
import { ScheduleRow } from './ScheduleRow';
import { buildDetailedPlan } from '@/lib/builDetailedPlan';
import { SaveItineraryButton } from './SaveItineraryButton';

export const DetailedView = ({ items, onBack, budget, onSaved }: DetailedViewProps) => {
  const [activeDay, setActiveDay] = useState(0);

  const days = useMemo(() => buildDetailedPlan(items), [items]);

  const totalNights = useMemo(() => {
    return items.reduce((acc, item) => {
      if (item.type === 'hébergement') {
        return acc + (Number(item.nights) || 0);
      }
      return acc;
    }, 0);
  }, [items]);

  const currentDay = days[activeDay] || { day: 1, hotel: null, activities: [] };

  const getSlotIcon = (type: string) => {
    if (type === 'gastronomie') return <Utensils size={18} />;
    if (type === 'hébergement') return <Moon size={18} />;
    return <Compass size={18} />;
  };

  return (
    <div className="max-w-7xl mx-auto mt-20 animate-in fade-in duration-700 px-6 py-10">
      <header className="mb-16 flex flex-col md:flex-row justify-between items-center border-b border-slate-100 pb-12 gap-8">
        <div className="flex flex-col items-start">
          <button
            onClick={onBack}
            className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:text-slate-900 transition-all mb-4"
          >
            <ChevronLeft size={14} /> Retour au sommaire
          </button>

          <h2 className="text-6xl font-serif italic text-slate-950 tracking-tighter leading-none">
            Itinéraire <span className="text-emerald-700">Temporel</span>
          </h2>

          {currentDay.date && (
            <p className="mt-4 text-sm text-slate-400 font-medium">
              Date prévue : {new Date(currentDay.date).toLocaleDateString()}
            </p>
          )}

          {currentDay.hotel?.name && (
            <p className="mt-2 text-sm text-slate-500">
              Hébergement : {currentDay.hotel.name}
            </p>
          )}
        </div>

        <div className="flex flex-col items-center gap-6 md:gap-8">
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
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-600 mb-2">
                Progression
              </span>
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
              <h3 className="mt-4 text-4xl font-serif italic text-slate-950 leading-none">
                Jour {activeDay + 1}
              </h3>
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

          <div className="flex flex-wrap items-center justify-center gap-4">
            <SaveItineraryButton
              items={items}
              days={days}
              totalBudget={budget}
              totalNights={totalNights}
              onSaved={onSaved}
            />

            <button
              onClick={() => (window.location.href = '/mes-itineraires')}
              className="px-8 py-4 rounded-full border border-slate-200 text-slate-900 hover:bg-slate-900 hover:text-white transition-all"
            >
              Mes itinéraires
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        <div className="space-y-24 pt-5">
          {currentDay.activities.map((slot, idx) => (
            <ScheduleRow
              key={`${slot.time}-${idx}-${slot.title}`}
              time={slot.time}
              title={slot.title}
              type={slot.type}
              img={slot.img}
              icon={getSlotIcon(slot.type)}
              label={slot.label}
            />
          ))}
        </div>
      </div>
    </div>
  );
};