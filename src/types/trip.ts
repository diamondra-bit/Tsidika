export type TripItemType = 'hébergement' | 'gastronomie' | 'découverte';

export type PreferredMoment = 'morning' | 'afternoon' | 'evening' | 'flex';
export type MealService = 'lunch' | 'dinner' | 'both';
export type IntensityLevel = 'low' | 'medium' | 'high';

export interface TripItem {
  id: string | number;
  uniqueKey: string;
  cartId?: string;

  destination_id?: number;

  name?: string;
  title?: string;

  price?: number | string;
  totalPrice?: number;

  type: TripItemType;
  img?: string;
  image_main?: string;

  lat?: number;
  lng?: number;
  location?: string;
  duration?: string;
  nights?: number;

  checkIn?: string;
  checkOut?: string;

  description?: string;
  preferred_moment?: PreferredMoment;
  meal_service?: MealService;
  category?: string;
  intensity?: IntensityLevel;
}

export interface PlannedSlot {
  time: string;
  title: string;
  type: TripItemType | 'info';
  img?: string;
  item?: TripItem | null;
  label?: string;
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
  onRemove: (uniqueKey: string) => void;
  onGenerate: () => void;
  onUpdateDates: (uniqueKey: string, checkIn: string, checkOut: string) => void;
}

export interface DailyPlan {
  day: number;
  hotel: TripItem | null;
  date?: string;
  activities: PlannedSlot[];
}

export interface DetailedViewProps {
  items: TripItem[];
  onBack: () => void;
  onSaved?: () => void;
  budget: number;
}

export interface ScheduleRowProps {
  time: string;
  title: string;
  type: TripItemType | 'info';
  img?: string;
  icon: React.ReactNode;
  label?: string;
}

export interface PointFort {
  name: string;
  description: string;
}

export interface Accommodation {
  id: number;
  destination_id: number;
  name: string;
  price: number;
  stars: number;
  img: string;
}

export interface Restaurant {
  id: number;
  destination_id: number;
  name: string;
  specialite: string;
  budget_min: number;
  budget_max: number;
  img: string;
  stars: number;
  meal_service?: MealService;
}

export interface Activity {
  id: number;
  destination_id: number;
  title: string;
  duration: string;
  type: string;
  img: string;
  price?: number;
  description?: string;
  preferred_moment?: PreferredMoment;
  category?: string;
  intensity?: IntensityLevel;
}

export interface Destination {
  id: number;
  slug: string;
  name: string;
  parent_region: string;
  zone: 'Nord' | 'Sud' | 'Est' | 'Ouest' | 'Centre';
  description: string;
  image_main: string;
  hero_image: string;
  best_time: string;
  access: string;
  climat: string;
  bon_plan: string;
  lat: number;
  lng: number;

  hebergements?: Accommodation[];
  gastronomie?: Restaurant[];
  activites?: Activity[];
}

export interface RegionCardProps {
  title: string;
  image: string;
  priceOrBudget: string;
  stars?: number;
  subtitle?: string;
  type: 'hotel' | 'resto' | 'activity';
}