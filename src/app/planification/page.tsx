"use client";

import { useState } from 'react';
import { useTrip } from '@/context/TripContext';
import Navbar from '@/app/components/Navbar';
import { SummaryView } from '../components/planification/SummaryView';
import { DetailedView } from '../components/planification/DetailedView';
import { TripItem } from '@/types/trip';

export default function PlanificationPage() {
  // Access global trip state from context
  const { tripCart, removeFromTrip, isInitialized } = useTrip();
  
  // Navigation state between Summary and Detailed itinerary views
  const [step, setStep] = useState<'summary' | 'detailed'>('summary');

  // Prevent hydration mismatch or empty renders before context is ready
  if (!isInitialized) return null;

  /**BUDGET CALCULATION LOGIC*/
  const totalBudget = tripCart.reduce((acc: number, item: TripItem) => {
    const rawPrice = item.price;
    let numericPrice = 0;

    if (typeof rawPrice === 'string') {
      // Remove non-numeric characters except for the decimal point
      numericPrice = parseFloat(rawPrice.replace(/[^0-9.]/g, ''));
    } else if (typeof rawPrice === 'number') {
      numericPrice = rawPrice;
    }
    
    return acc + (isNaN(numericPrice) ? 0 : numericPrice);
  }, 0);

  // Default duration - could be dynamic based on user selection in the future
  const tripDuration = 10;

  return (
    <div className="bg-[#FDFCFB] min-h-screen font-lato">
      <Navbar />
      
      <main className="max-w-7xl mx-auto pt-32 pb-20 px-6">
        {tripCart.length === 0 ? (
          /* EMPTY STATE: Shown when no items are added to the cart */
          <div className="text-center py-32 bg-white rounded-[4rem] border-2 border-dashed border-slate-100 animate-in fade-in zoom-in duration-500">
            <h2 className="text-4xl font-serif italic text-slate-300">
              Your travel journal is empty
            </h2>
            <p className="text-slate-400 mt-4 font-light">
              Start adding destinations and experiences to plan your journey.
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* STEP 1: SUMMARY VIEW - Reviewing the selected items */}
            {step === 'summary' ? (
              <SummaryView 
                items={tripCart} 
                budget={totalBudget} 
                duration={tripDuration} 
                onRemove={removeFromTrip} 
                onGenerate={() => {
                  setStep('detailed');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
              />
            ) : (
              /* STEP 2: DETAILED VIEW - The generated day-by-day itinerary */
              <DetailedView 
                items={tripCart} 
                budget={totalBudget} 
                onBack={() => {
                  setStep('summary');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}