"use client";

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { TripItem } from '@/types/trip';

interface TripContextType {
  tripCart: TripItem[];
  addToTrip: (item: TripItem) => void;
  removeFromTrip: (uniqueKey: string) => void;
  updateTripDates: (uniqueKey: string, checkIn: string, checkOut: string) => void;
  clearTrip: () => void;
  isInitialized: boolean;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

const STORAGE_KEY = 'trip-cart-v2';

const sanitizeTripItem = (item: any): TripItem | null => {
  if (!item || !item.uniqueKey || !item.type) return null;

  return {
    id: item.id,
    uniqueKey: String(item.uniqueKey),
    cartId: item.cartId,

    destination_id: item.destination_id,

    name: item.name,
    title: item.title,

    price: item.price,
    totalPrice: Number(item.totalPrice) || 0,

    type: item.type,
    img: item.img,
    image_main: item.image_main,

    lat: item.lat,
    lng: item.lng,
    location: item.location,
    duration: item.duration,
    nights: Number(item.nights) || 0,

    checkIn: item.checkIn,
    checkOut: item.checkOut,

    description: item.description,
    preferred_moment: item.preferred_moment,
    meal_service: item.meal_service,
    category: item.category,
    intensity: item.intensity
  };
};

export const TripProvider = ({ children }: { children: React.ReactNode }) => {
  const [tripCart, setTripCart] = useState<TripItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const cleaned = parsed
            .map(sanitizeTripItem)
            .filter(Boolean) as TripItem[];
          setTripCart(cleaned);
        }
      }
    } catch (error) {
      console.error('Erreur lecture localStorage:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tripCart));
  }, [tripCart, isInitialized]);

  const addToTrip = (item: TripItem) => {
    setTripCart(prev => {
      const exists = prev.some(existing => existing.uniqueKey === item.uniqueKey);
      if (exists) return prev;
      return [...prev, item];
    });
  };

  const removeFromTrip = (uniqueKey: string) => {
    setTripCart(prev => prev.filter(item => item.uniqueKey !== uniqueKey));
  };

  const updateTripDates = (uniqueKey: string, checkIn: string, checkOut: string) => {
    setTripCart(prev =>
      prev.map(item => {
        if (item.uniqueKey !== uniqueKey) return item;
        if (item.type !== 'hébergement') return item;

        const start = new Date(checkIn);
        const end = new Date(checkOut);

        const invalidDates =
          !checkIn ||
          !checkOut ||
          isNaN(start.getTime()) ||
          isNaN(end.getTime());

        if (invalidDates) {
          return {
            ...item,
            checkIn,
            checkOut,
            nights: 0,
            totalPrice: 0
          };
        }

        const nights = Math.max(
          0,
          Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
        );

        const pricePerNight =
          typeof item.price === 'number'
            ? item.price
            : parseFloat(String(item.price || 0));

        return {
          ...item,
          checkIn,
          checkOut,
          nights,
          totalPrice: nights * pricePerNight
        };
      })
    );
  };

  const clearTrip = () => {
    setTripCart([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(
    () => ({
      tripCart,
      addToTrip,
      removeFromTrip,
      updateTripDates,
      clearTrip,
      isInitialized
    }),
    [tripCart, isInitialized]
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

export const useTrip = () => {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
};