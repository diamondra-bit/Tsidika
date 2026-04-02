export type TripItemType = 'hébergement' | 'gastronomie' | 'découverte';

export interface TripItem {
  id: string | number;
  name?: string;
  title?: string;
  price?: number | string;
  type: TripItemType;
  img?: string;
  lat?: number;
  lng?: number;
  location?: string;
}


export interface ActivityCardProps {
  title: string;
  image?: string; 
  duration: string;
  type: TripItemType;
  index: number;
}


export interface SummaryProps {
  items: TripItem[];
  budget: number;
  duration: number;
  onRemove: (id: string | number) => void;
  onGenerate: () => void;
}
export interface DailyPlan {
  day: number;
  hotel: TripItem | null;
  activities: TripItem[];
}

export interface DetailedViewProps {
  items: TripItem[];
  onBack: () => void;
  budget: number;
}

export interface ScheduleRowProps {
  time: string;
  title: string;
  type: TripItemType;
  img?: string;
  icon: React.ReactNode;
}