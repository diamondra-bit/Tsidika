"use client";

import { useState } from 'react';
import { useTrip } from '@/context/TripContext';
import Navbar from '@/app/components/Navbar';
import { SummaryView } from '../components/planification/SummaryView';
import { DetailedView } from '../components/planification/DetailedView';
import { TripItem } from '@/types/trip';
import { QuickStartForm } from '../components/planification/QuickStartForm';

export default function PlanificationPage() {
  const {
    tripCart,
    removeFromTrip,
    updateTripDates,
    clearTrip,
    isInitialized,
    addToTrip
  } = useTrip();

  const [step, setStep] = useState<'summary' | 'detailed'>('summary');
  const [isDoneSelecting, setIsDoneSelecting] = useState(false);
  const [resetSelectionKey, setResetSelectionKey] = useState(0);

  if (!isInitialized) return null;

  const totalBudget = tripCart.reduce((acc: number, item: TripItem) => {
    return acc + (Number(item.totalPrice) || 0);
  }, 0);

  const totalDuration = tripCart.reduce((acc: number, item: TripItem) => {
    if (item.type === 'hébergement') {
      return acc + (Number(item.nights) || 0);
    }
    return acc;
  }, 0);

  const handleSavedItinerary = () => {
    clearTrip();
    setStep('summary');
    setIsDoneSelecting(false);
    setResetSelectionKey((prev) => prev + 1);
  };

  return (
    <div className="bg-[#FDFCFB] min-h-screen font-lato">
      <Navbar />
      <main>
        {!isDoneSelecting ? (
          <div className="mt-[72px]">
            <QuickStartForm
              key={resetSelectionKey}
              onAdd={addToTrip}
              tripCart={tripCart}
              onFinish={() => setIsDoneSelecting(true)}
            />
          </div>
        ) : (
          <div className="relative animate-in fade-in duration-500">
            {step === 'summary' ? (
              <SummaryView
                items={tripCart}
                budget={totalBudget}
                duration={totalDuration}
                onRemove={removeFromTrip}
                onGenerate={() => setStep('detailed')}
                onUpdateDates={updateTripDates}
              />
            ) : (
              <DetailedView
                items={tripCart}
                onBack={() => setStep('summary')}
                budget={totalBudget}
                onSaved={handleSavedItinerary}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}