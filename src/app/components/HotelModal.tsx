"use client";

import { useState, useEffect } from 'react';
import { X, Calendar, Plus, Check, Waves, Wifi, Wind, MapPin, Info } from 'lucide-react';

export default function HotelModal({ hotel, onClose, onAddToTrip }: any) {
  const [dates, setDates] = useState({ start: '', end: '' });
  const [nights, setNights] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (dates.start && dates.end) {
      const start = new Date(dates.start);
      const end = new Date(dates.end);
      const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      setNights(diff > 0 ? diff : 0);
    }
  }, [dates]);

  const handleConfirm = () => {
    if (nights <= 0) return alert("Veuillez choisir une date de fin après la date de début.");
    
    onAddToTrip({ 
      ...hotel, 
      type: 'hebergement',
      startDate: dates.start, 
      endDate: dates.end, 
      totalNights: nights,
      totalPrice: nights * hotel.price 
    });
    
    setIsAdded(true);
    setTimeout(onClose, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-lato">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500" 
        onClick={onClose} 
      />
      
      <div className="relative bg-[#FDFCFB] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl animate-in zoom-in duration-300 no-scrollbar">
        <div className="relative h-72 w-full">
          <img src={hotel.img} alt={hotel.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <button 
            onClick={onClose} 
            className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-all"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-6 left-8 text-white">
             <div className="flex items-center gap-2 mb-1">
                {[...Array(hotel.stars)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xs">★</span>
                ))}
             </div>
             <h2 className="text-4xl font-serif italic leading-none">{hotel.name}</h2>
          </div>
        </div>

        <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-10">
            <section className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600">Disponibilités</h3>
              <div className="grid gap-4">
                <div className="group p-5 border border-slate-100 rounded-3xl flex justify-between items-center hover:bg-emerald-50/30 transition-all cursor-pointer">
                  <div className="space-y-1">
                    <p className="font-serif text-xl text-slate-900 italic">Suite Standard</p>
                    <p className="text-slate-400 text-xs flex items-center gap-1">
                        <Info size={12} /> Vue sur paysage & Petit-déjeuner inclus
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-serif text-slate-900">{hotel.price}€</p>
                    <p className="text-[10px] uppercase font-black text-slate-300">par nuit</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6 pt-6 border-t border-slate-100">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Services & Équipements</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Piscine Infinie', 'WiFi Fibre', 'Spa Naturel', 'Service Guide'].map((feat, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-600">
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-emerald-600">
                        {i === 0 && <Waves size={14} />}
                        {i === 1 && <Wifi size={14} />}
                        {i === 2 && <Wind size={14} />}
                        {i === 3 && <MapPin size={14} />}
                    </div>
                    <span className="text-xs font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-emerald-50/40 p-8 rounded-[2.5rem] space-y-8 sticky top-0">
              <div className="space-y-2">
                <h3 className="text-2xl font-serif italic text-slate-900">Planifier</h3>
                <p className="text-slate-500 text-xs font-light">Sélectionnez vos dates pour valider l'étape.</p>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-emerald-800 ml-1">Début</label>
                        <input 
                            type="date" 
                            className="w-full bg-white border-none rounded-2xl p-4 text-xs shadow-sm focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-slate-700" 
                            onChange={e => setDates({...dates, start: e.target.value})} 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-emerald-800 ml-1">Fin</label>
                        <input 
                            type="date" 
                            className="w-full bg-white border-none rounded-2xl p-4 text-xs shadow-sm focus:ring-2 focus:ring-emerald-200 outline-none transition-all text-slate-700" 
                            onChange={e => setDates({...dates, end: e.target.value})} 
                        />
                    </div>
                  </div>
                </div>

                {nights > 0 && (
                  <div className="p-5 bg-white rounded-2xl flex items-center justify-between animate-in slide-in-from-top-2">
                    <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-emerald-600" />
                        <span className="text-xs font-bold text-slate-700">{nights} nuits</span>
                    </div>
                    <span className="text-lg font-serif italic text-emerald-800">{nights * hotel.price}€</span>
                  </div>
                )}
              </div>

              <button 
                onClick={handleConfirm}
                disabled={nights <= 0 || isAdded}
                className={`w-full py-5 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] transition-all flex items-center justify-center gap-3 shadow-lg
                  ${isAdded 
                    ? 'bg-emerald-600 text-white' 
                    : nights > 0 
                        ? 'bg-slate-900 text-white hover:bg-black active:scale-95' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
              >
                {isAdded ? (
                    <><Check size={18} /> Confirmé</>
                ) : (
                    <><Plus size={18} /> Ajouter au voyage</>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}