export interface TripItem {
  id: string | number;
  item_id: string;
  name: string;
  image: string;
  type: 'hotel' | 'resto' | 'activity';
 
  startDate?: string; 
  endDate?: string;
  price?: number;    
  budgetMin?: number;
  budgetMax?: number;
  location: string;   
}