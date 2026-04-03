"use client";

import { X, Clock, Mountain, Check, Plus, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useTrip } from '@/context/TripContext';

export default function ActivityModal({ activity, onClose }: any) {
  const { addToTrip, tripCart } = useTrip();
  const [isAdded, setIsAdded] = useState(false);

  const activityPrice = Number(activity.price) || 0;
  const uniqueKey = `découverte-${activity.id}`;
  const alreadyInCart = tripCart.some((item: any) => item.uniqueKey === uniqueKey);

  const handleConfirm = () => {
    if (alreadyInCart) return;

    addToTrip({
      ...activity,
      uniqueKey,
      cartId: `activity-${activity.id}-${Date.now()}`,
      destination_id: activity.destination_id,
      name: activity.title,
      type: 'découverte',
      totalPrice: activityPrice,
      img: activity.img,
      preferred_moment: activity.preferred_moment,
      category: activity.category,
      intensity: activity.intensity,
      description: activity.description
    });

    setIsAdded(true);
    setTimeout(onClose, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 font-lato">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-[#FDFCFB] w-full max-w-xl max-h-[90vh] flex flex-col rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
        <div className="relative h-60 shrink-0">
          <img
            src={activity.img || "/api/placeholder/800/600"}
            className="w-full h-full object-cover"
            alt={activity.title}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all z-10"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 md:p-10 space-y-8 no-scrollbar">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-emerald-600" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-600">
                Expérience Immersive
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif italic text-slate-900 tracking-tight leading-tight">
              {activity.title}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-6">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 p-2 rounded-xl shrink-0">
                <Clock className="text-emerald-700" size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[8px] uppercase font-black text-slate-300 tracking-widest leading-none mb-1">Durée</p>
                <p className="text-xs font-medium text-slate-700">{activity.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 p-2 rounded-xl shrink-0">
                <Mountain className="text-emerald-700" size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[8px] uppercase font-black text-slate-300 tracking-widest leading-none mb-1">Type</p>
                <p className="text-xs font-medium text-slate-700">{activity.type}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2">Prix</p>
            <p className="text-2xl font-serif italic text-slate-900">{activityPrice}€</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-800">
              <ShieldCheck size={16} className="text-emerald-500" strokeWidth={2.5} />
              <p className="text-[9px] font-black uppercase tracking-[0.2em]">Inclus : Guide expert & matériel</p>
            </div>
            <p className="text-slate-500 font-serif italic text-base md:text-lg leading-relaxed">
              "{activity.description || "Une immersion profonde au cœur de la Grande Île, pensée pour ceux qui cherchent à s'évader."}"
            </p>
          </div>
        </div>

        <div className="p-8 pt-0 shrink-0 bg-[#FDFCFB]">
          <button
            onClick={handleConfirm}
            disabled={isAdded || alreadyInCart}
            className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.25em] text-[9px] transition-all flex items-center justify-center gap-3 shadow-lg
              ${isAdded || alreadyInCart
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 text-white hover:bg-emerald-900 active:scale-95'}`}
          >
            {isAdded || alreadyInCart ? (
              <><Check size={18} strokeWidth={3} /> Activité Planifiée</>
            ) : (
              <><Plus size={18} strokeWidth={3} /> Ajouter à mon voyage</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}