"use client";

import { useState, useEffect } from 'react';
import { MapPin, Utensils, Bed, Camera, Plus, Loader2, ChevronRight, Check } from 'lucide-react';
import { supabase } from '@/lib/supabase';

import HotelModal from '../destination/HotelModal';
import RestoModal from '../destination/RestoModal';
import ActivityModal from '../destination/ActivityModal';

interface QuickStartProps {
  onAdd: (item: any) => void;
  tripCart: any[];
  onFinish: () => void;
}

export const QuickStartForm = ({ onAdd, tripCart, onFinish }: QuickStartProps) => {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [selectedDest, setSelectedDest] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<'hotel' | 'resto' | 'activity' | null>(null);
  const [modalData, setModalData] = useState<any>(null);

  useEffect(() => {
    async function fetchDestinations() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('destinations')
          .select(`
            *,
            hebergements(*),
            gastronomie(*),
            activites(*)
          `)
          .order('name');

        if (error) throw error;

        if (data) {
          setDestinations(data);
          if (data.length > 0) setSelectedDest(data[0]);
        }
      } catch (error) {
        console.error("Erreur Supabase:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDestinations();
  }, []);

  const buildUniqueKey = (type: string, id: string | number) => `${type}-${id}`;

  const checkInCart = (type: string, id: any) =>
    tripCart.some(item => item.uniqueKey === buildUniqueKey(type, id));

  return (
    <div className="flex w-full min-h-[calc(100vh-72px)] bg-white relative font-lato">
      {tripCart.length > 0 && (
        <div className="fixed bottom-10 right-10 z-[100] animate-in slide-in-from-bottom-10 duration-500">
          <button
            onClick={onFinish}
            className="flex items-center gap-6 pl-8 pr-4 py-4 bg-slate-950 text-white rounded-full shadow-2xl hover:bg-emerald-600 transition-all group scale-105 hover:scale-110"
          >
            <div className="text-left">
              <p className="text-[8px] font-black uppercase tracking-widest opacity-50">Prêt à partir ?</p>
              <p className="text-sm font-bold">
                {tripCart.length} élément{tripCart.length > 1 ? 's' : ''} sélectionné{tripCart.length > 1 ? 's' : ''}
              </p>
            </div>
            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-slate-950 transition-colors">
              <ChevronRight size={20} />
            </div>
          </button>
        </div>
      )}

      <div className="w-full md:w-[30%] lg:w-[25%] bg-slate-50 border-r border-slate-100 p-10 flex flex-col">
        <div className="mb-10">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 mb-3 block">Exploration</span>
          <h3 className="text-2xl font-serif italic text-slate-900 tracking-tight">Destinations</h3>
        </div>
        <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
          {loading ? (
            <div className="flex justify-center py-10"><Loader2 className="animate-spin text-slate-300" /></div>
          ) : (
            destinations.map((dest) => (
              <button
                key={dest.id}
                onClick={() => setSelectedDest(dest)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${selectedDest?.id === dest.id ? 'bg-white shadow-md border-emerald-100 border' : 'opacity-70 hover:opacity-100'}`}
              >
                <div className="flex items-center gap-3">
                  <img src={dest.image_main} className="w-10 h-10 rounded-xl object-cover" alt="" />
                  <span className={`text-sm font-serif italic ${selectedDest?.id === dest.id ? 'text-emerald-700 font-bold' : 'text-slate-600'}`}>{dest.name}</span>
                </div>
                <ChevronRight size={14} className={selectedDest?.id === dest.id ? 'text-emerald-500' : 'text-slate-200'} />
              </button>
            ))
          )}
        </div>
      </div>

      <div className="flex-1 p-8 md:py-16 lg:p-24 bg-white overflow-y-auto">
        {!selectedDest ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
            <MapPin size={48} className="mb-4" />
            <h4 className="text-5xl font-serif italic">Choisissez une ville</h4>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto -mt-10 space-y-16 animate-in slide-in-from-right-8 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500">{selectedDest.zone}</span>
                <h3 className="text-7xl font-serif italic text-slate-950 tracking-tighter leading-none">{selectedDest.name}</h3>
              </div>
              <img src={selectedDest.image_main} className="w-56 h-36 rounded-[2rem] object-cover shadow-2xl border-4 border-white" alt="" />
            </div>

            <div className="grid grid-cols-1 gap-14 mt-12">
              <div className="space-y-8">
                <h5 className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-3"><Bed size={16}/> Hébergements</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {selectedDest.hebergements?.map((h: any) => (
                    <QuickItemCard
                      key={h.id}
                      item={h}
                      type="hébergement"
                      onAdd={onAdd}
                      isInCart={checkInCart('hébergement', h.id)}
                      onClick={() => { setModalData(h); setActiveModal('hotel'); }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-slate-50">
                <div className="space-y-8">
                  <h5 className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-3"><Utensils size={16}/> Restaurants</h5>
                  {selectedDest.gastronomie?.map((g: any) => (
                    <QuickItemCard
                      key={g.id}
                      item={g}
                      type="gastronomie"
                      onAdd={onAdd}
                      isInCart={checkInCart('gastronomie', g.id)}
                      onClick={() => { setModalData(g); setActiveModal('resto'); }}
                    />
                  ))}
                </div>
                <div className="space-y-8">
                  <h5 className="text-[11px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-3"><Camera size={16}/> Activités</h5>
                  {selectedDest.activites?.map((a: any) => (
                    <QuickItemCard
                      key={a.id}
                      item={a}
                      type="découverte"
                      onAdd={onAdd}
                      isInCart={checkInCart('découverte', a.id)}
                      onClick={() => { setModalData(a); setActiveModal('activity'); }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {activeModal === 'hotel' && <HotelModal hotel={modalData} onClose={() => setActiveModal(null)} />}
      {activeModal === 'resto' && <RestoModal resto={modalData} onClose={() => setActiveModal(null)} />}
      {activeModal === 'activity' && <ActivityModal activity={modalData} onClose={() => setActiveModal(null)} />}
    </div>
  );
};

const QuickItemCard = ({ item, type, onAdd, onClick, isInCart }: any) => {
  const [added, setAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInCart) return;

    if (type === "hébergement") {
      onClick();
      return;
    }

    if (type === "gastronomie") {
      const budgetMin = Number(item.budget_min) || 0;
      const budgetMax = Number(item.budget_max) || 0;
      const totalPrice = budgetMin > 0 ? (budgetMin + budgetMax) / 2 : budgetMax;

      onAdd({
        ...item,
        uniqueKey: `gastronomie-${item.id}`,
        destination_id: item.destination_id,
        type,
        totalPrice,
        img: item.img,
        meal_service: item.meal_service || 'both'
      });

      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
      return;
    }

    onAdd({
      ...item,
      uniqueKey: `découverte-${item.id}`,
      destination_id: item.destination_id,
      name: item.title,
      type,
      totalPrice: Number(item.price) || 0,
      img: item.img,
      preferred_moment: item.preferred_moment,
      category: item.category,
      intensity: item.intensity,
      description: item.description
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      onClick={onClick}
      className={`group flex items-center justify-between p-5 rounded-[2rem] transition-all duration-500 border ${
        isInCart
          ? 'bg-slate-50 border-slate-100 opacity-60'
          : 'bg-white border-transparent hover:shadow-xl hover:border-slate-100 cursor-pointer'
      }`}
    >
      <div className="flex items-center gap-5">
        <div className="relative">
          <img src={item.img} className="w-16 h-16 rounded-2xl object-cover" alt="" />
          {isInCart && (
            <div className="absolute -top-1 -right-1 bg-emerald-500 text-white rounded-full p-1 shadow-md animate-in zoom-in">
              <Check size={10} strokeWidth={4} />
            </div>
          )}
        </div>
        <div>
          <h6 className={`text-sm font-bold mb-1 ${isInCart ? 'text-slate-400' : 'text-slate-900'}`}>
            {item.name || item.title}
          </h6>
          <span className={`text-[10px] font-bold uppercase tracking-tighter ${isInCart ? 'text-slate-300' : 'text-emerald-600'}`}>
            {isInCart ? 'Sélectionné' : 'Voir plus'}
          </span>
        </div>
      </div>

      <button
        onClick={handleQuickAdd}
        disabled={isInCart}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          isInCart
            ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
            : added
              ? 'bg-emerald-500 text-white'
              : 'bg-slate-50 text-slate-400 hover:bg-slate-950 hover:text-white shadow-sm'
        }`}
      >
        {isInCart || added ? <Check size={18} /> : <Plus size={18} />}
      </button>
    </div>
  );
};