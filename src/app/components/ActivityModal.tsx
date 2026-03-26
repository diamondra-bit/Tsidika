"use client";

import { X, Clock, Mountain, Map, Check, Plus, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

export default function ActivityModal({ activity, onClose, onAddToTrip }: any) {
  const [isAdded, setIsAdded] = useState(false);

 
  const handleConfirm = () => {
    onAddToTrip({ ...activity, type: 'decouverte' });
    setIsAdded(true);
    
     setTimeout(onClose, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" 
        onClick={onClose} 
      />
      
      {/* --- MODAL CONTAINER --- */}
      <div className="relative bg-[#FDFCFB] w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        
        {/* --- HEADER --- */}
        <div className="relative h-64">
          <img src={activity.img} className="w-full h-full object-cover" alt={activity.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FDFCFB] via-transparent" />
          
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 bg-black/20 backdrop-blur-md rounded-full text-white hover:bg-black/40 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* --- CONTENT--- */}
        <div className="p-10 space-y-8">
          <div className="space-y-2">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-600">
              Expérience Immersive
            </span>
            <h2 className="text-4xl font-serif italic text-slate-900">
              {activity.title}
            </h2>
          </div>

          {/* --- Quick info grid (Duration and Activity Type) --- */}
          <div className="flex gap-8 border-y border-slate-100 py-6">
            <div className="flex items-center gap-3">
              <Clock className="text-emerald-600" size={18} />
              <span className="text-sm font-medium text-slate-600">{activity.duration}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mountain className="text-emerald-600" size={18} />
              <span className="text-sm font-medium text-slate-600">{activity.type}</span>
            </div>
          </div>

          {/* --- DESCRIPTION --- */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-800">
              <ShieldCheck size={18} className="text-emerald-500" />
              <p className="text-[11px] font-black uppercase tracking-widest">
                Inclus : Guide certifié & équipement
              </p>
            </div>
            <p className="text-slate-500 font-serif italic text-lg leading-relaxed">
              "Une exploration profonde des paysages de Madagascar, conçue pour ceux qui cherchent à se reconnecter avec la nature sauvage."
            </p>
          </div>

          {/* ---  BUTTON --- */}
          <button 
            onClick={handleConfirm}
            disabled={isAdded}
            className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-3
              ${isAdded 
                ? 'bg-emerald-600 text-white' 
                : 'bg-slate-900 text-white hover:bg-emerald-800'
              }`}
          >
            {isAdded ? (
              <><Check size={18} /> Ajouté au voyage</>
            ) : (
              <><Plus size={18} /> Planifier cette activité</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}