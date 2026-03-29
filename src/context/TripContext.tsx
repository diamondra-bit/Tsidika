"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const TripContext = createContext<any>(null);

export function TripProvider({ children }: { children: React.ReactNode }) {
  const [tripCart, setTripCart] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('tsidika-trip');
    if (saved) setTripCart(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('tsidika-trip', JSON.stringify(tripCart));
  }, [tripCart]);

  const addToTrip = (item: any) => {
    setTripCart((prev) => [...prev, item]);
  };

  const removeFromTrip = (id: string) => {
    setTripCart((prev) => prev.filter(item => item.id !== id));
  };

  return (
    <TripContext.Provider value={{ tripCart, addToTrip, removeFromTrip }}>
      {children}
    </TripContext.Provider>
  );
}

export const useTrip = () => useContext(TripContext);