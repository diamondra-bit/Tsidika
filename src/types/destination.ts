// types/trip.ts

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
}

export interface Activity {
  id: number;
  destination_id: number;
  title: string;
  duration: string;
  type: string;
  img: string;
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
  points_forts: PointFort[];
  coords: { lat: number; lng: number };
  
  hotels?: Accommodation[];
  restaurants?: Restaurant[];
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