"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const TripContext = createContext<any>(null);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [tripCart, setTripCart] = useState<any[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Load the data during editing
  useEffect(() => {
    const saved = localStorage.getItem('tsidika-trip');
    if (saved) {
      try {
        setTripCart(JSON.parse(saved));
      } catch (e) {
        console.error("Erreur de lecture du carnet", e);
      }
    }
    setIsInitialized(true);
  }, []);

  // 2.Save only AFTER initialization
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('tsidika-trip', JSON.stringify(tripCart));
    }
  }, [tripCart, isInitialized]);

  const addToTrip = (item: any) => {
    setTripCart((prev) => [...prev, item]);
  };

  const removeFromTrip = (id: string | number) => {
    setTripCart((prev) => prev.filter(item => item.id !== id));
  };

  return (
    <TripContext.Provider value={{ tripCart, addToTrip, removeFromTrip, isInitialized }}>
      {children}
    </TripContext.Provider>
  );
}

export const useTrip = () => useContext(TripContext);