"use client";

import { useState, useEffect } from 'react';
import { X, Plus, Check, Waves, Wifi, Wind, MapPin, Info } from 'lucide-react';
import { useTrip } from '@/context/TripContext';

export default function HotelModal({ hotel, onClose }: any) {
  const { addToTrip, tripCart } = useTrip();
  const [dates, setDates] = useState({ start: '', end: '' });
  const [nights, setNights] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  if (!hotel) return null;

  const uniqueKey = `hébergement-${hotel.id}`;
  const alreadyInCart = Array.isArray(tripCart)
    ? tripCart.some((item: any) => item.uniqueKey === uniqueKey)
    : false;

  const pricePerNight =
    typeof hotel.price === 'number'
      ? hotel.price
      : parseFloat(String(hotel.price || 0));

  const hotelImage = hotel.img || hotel.image_main || "/api/placeholder/800/600";

  useEffect(() => {
    if (!dates.start || !dates.end) {
      setNights(0);
      return;
    }

    const start = new Date(dates.start);
    const end = new Date(dates.end);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setNights(0);
      return;
    }

    const diff = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    setNights(diff > 0 ? diff : 0);
  }, [dates.start, dates.end]);

  const handleConfirm = () => {
    if (nights <= 0 || alreadyInCart) return;

    addToTrip({
      ...hotel,
      uniqueKey,
      cartId: `hotel-${hotel.id}-${Date.now()}`,
      destination_id: hotel.destination_id,
      type: 'hébergement',
      checkIn: dates.start,
      checkOut: dates.end,
      nights,
      totalPrice: nights * pricePerNight,
      img: hotelImage
    });

    setIsAdded(true);
    setTimeout(() => {
      onClose?.();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />

      <div className="relative bg-[#FDFCFB] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl no-scrollbar animate-in fade-in zoom-in duration-300">
        <div className="relative h-72 w-full">
          <img src={hotelImage} className="w-full h-full object-cover" alt={hotel.name} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="absolute bottom-8 left-10 text-white">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(hotel.stars || 0)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xs">★</span>
              ))}
            </div>
            <h2 className="text-5xl font-serif italic tracking-tight">{hotel.name}</h2>
          </div>
        </div>

        <div className="p-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-10">
            <div className="flex justify-between items-start border-b border-slate-100 pb-8">
              <div>
                <p className="font-serif text-2xl italic text-slate-800">Suite de Luxe</p>
                <p className="text-slate-400 text-sm flex items-center gap-2 mt-2">
                  <Info size={14} className="text-emerald-500" /> Petit-déjeuner local inclus
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-serif text-emerald-900">{pricePerNight}€</p>
                <p className="text-[10px] uppercase font-black tracking-widest text-slate-300 mt-1">
                  par nuit
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Services & Confort
              </h4>
              <div className="grid grid-cols-2 gap-y-4">
                <div className="flex items-center gap-3 text-sm text-slate-600 font-light"><Wifi size={16} className="text-emerald-600/50" /> WiFi Haut Débit</div>
                <div className="flex items-center gap-3 text-sm text-slate-600 font-light"><Waves size={16} className="text-emerald-600/50" /> Piscine à débordement</div>
                <div className="flex items-center gap-3 text-sm text-slate-600 font-light"><Wind size={16} className="text-emerald-600/50" /> Climatisation</div>
                <div className="flex items-center gap-3 text-sm text-slate-600 font-light"><MapPin size={16} className="text-emerald-600/50" /> Vue sur l'Océan</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-emerald-50/50 p-8 rounded-[2.5rem] border border-emerald-100/50 space-y-8 sticky top-0">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-800 text-center">
                  Sélectionnez vos dates
                </p>
                <div className="grid grid-cols-1 gap-3">
                  <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <label className="text-[9px] uppercase font-black text-slate-300 block mb-1">
                      Arrivée
                    </label>
                    <input
                      type="date"
                      className="w-full text-sm outline-none font-bold text-slate-700 bg-transparent"
                      value={dates.start}
                      onChange={(e) => setDates({ ...dates, start: e.target.value })}
                    />
                  </div>
                  <div className="bg-white rounded-2xl p-4 shadow-sm">
                    <label className="text-[9px] uppercase font-black text-slate-300 block mb-1">
                      Départ
                    </label>
                    <input
                      type="date"
                      className="w-full text-sm outline-none font-bold text-slate-700 bg-transparent"
                      value={dates.end}
                      onChange={(e) => setDates({ ...dates, end: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {nights > 0 ? (
                <div className="flex justify-between items-center bg-emerald-900 text-white p-6 rounded-2xl shadow-xl animate-in slide-in-from-top-2">
                  <div>
                    <p className="text-[10px] uppercase font-black opacity-60">
                      Total pour {nights} nuits
                    </p>
                    <p className="text-2xl font-serif italic">{nights * pricePerNight}€</p>
                  </div>
                  <div className="bg-white/10 p-2 rounded-lg">
                    <Check size={20} />
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-xs text-slate-400 italic font-serif">
                    Veuillez définir une durée de séjour
                  </p>
                </div>
              )}

              <button
                onClick={handleConfirm}
                disabled={nights <= 0 || isAdded || alreadyInCart}
                className={`w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-3
                  ${
                    isAdded || alreadyInCart
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : nights > 0
                        ? 'bg-slate-900 text-white hover:bg-emerald-900 shadow-xl hover:-translate-y-1'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
              >
                {isAdded || alreadyInCart ? (
                  <>
                    <Check size={18} strokeWidth={3} /> Expérience Ajoutée
                  </>
                ) : (
                  <>
                    <Plus size={18} strokeWidth={3} /> Réserver ce lieu
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}