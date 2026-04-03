"use client";

import { useState } from 'react';
import { Save, Check, Loader2 } from 'lucide-react';
import { DailyPlan, TripItem } from '@/types/trip';
import { saveItinerary } from '@/lib/saveItinerary';
import { supabase } from '@/lib/supabase';

interface SaveItineraryButtonProps {
  items: TripItem[];
  days: DailyPlan[];
  totalBudget: number;
  totalNights: number;
  onSaved?: () => void;
}

export function SaveItineraryButton({
  items,
  days,
  totalBudget,
  totalNights,
  onSaved
}: SaveItineraryButtonProps) {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    try {
      setLoading(true);

      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        window.location.href = '/login';
        return;
      }

      const now = new Date();
      const title = `Itinéraire ${now.toLocaleDateString()} ${now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })}`;

      await saveItinerary({
        title,
        items,
        days,
        totalBudget,
        totalNights
      });

      setSaved(true);

      setTimeout(() => {
        onSaved?.();
      }, 800);
    } catch (error) {
      console.error('Erreur sauvegarde itinéraire:', error);
      alert("Impossible d'enregistrer l'itinéraire.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={loading || saved}
      className={`px-8 py-4 rounded-full border transition-all flex items-center gap-3
        ${
          saved
            ? 'bg-emerald-600 text-white border-emerald-600'
            : 'border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white'
        }`}
    >
      {loading ? (
        <>
          <Loader2 size={16} className="animate-spin" />
          Enregistrement...
        </>
      ) : saved ? (
        <>
          <Check size={16} />
          Itinéraire enregistré
        </>
      ) : (
        <>
          <Save size={16} />
          Enregistrer l’itinéraire
        </>
      )}
    </button>
  );
}