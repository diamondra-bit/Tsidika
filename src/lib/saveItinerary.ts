import { supabase } from '@/lib/supabase';
import { DailyPlan, TripItem } from '@/types/trip';

interface SaveItineraryInput {
  title: string;
  items: TripItem[];
  days: DailyPlan[];
  totalBudget: number;
  totalNights: number;
}

export async function saveItinerary({
  title,
  items,
  days,
  totalBudget,
  totalNights
}: SaveItineraryInput) {
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('Utilisateur non connecté');
  }

  const startsOn =
    items
      .filter(i => i.checkIn)
      .map(i => i.checkIn!)
      .sort()[0] || null;

  const endsOn =
    items
      .filter(i => i.checkOut)
      .map(i => i.checkOut!)
      .sort()
      .slice(-1)[0] || null;

  const { data: itinerary, error: itineraryError } = await supabase
    .from('itineraries')
    .insert({
      user_id: user.id,
      title,
      total_budget: totalBudget,
      total_nights: totalNights,
      starts_on: startsOn,
      ends_on: endsOn
    })
    .select()
    .single();

  if (itineraryError) throw itineraryError;

  const itineraryItems = items.map(item => ({
    itinerary_id: itinerary.id,
    user_id: user.id,
    item_type: item.type,
    source_item_id: typeof item.id === 'number' ? item.id : null,
    unique_key: item.uniqueKey,
    destination_id: item.destination_id || null,
    title: item.name || item.title || null,
    description: item.description || null,
    img: item.img || null,
    price: Number(item.price) || 0,
    total_price: Number(item.totalPrice) || 0,
    duration: item.duration || null,
    preferred_moment: item.preferred_moment || null,
    meal_service: item.meal_service || null,
    category: item.category || null,
    intensity: item.intensity || null,
    check_in: item.checkIn || null,
    check_out: item.checkOut || null,
    nights: Number(item.nights) || 0,
    raw_data: item
  }));

  if (itineraryItems.length > 0) {
    const { error: itemsError } = await supabase
      .from('itinerary_items')
      .insert(itineraryItems);

    if (itemsError) throw itemsError;
  }

  const itineraryDays = days.map(day => ({
    itinerary_id: itinerary.id,
    user_id: user.id,
    day_number: day.day,
    date_value: day.date || null,
    destination_id: day.hotel?.destination_id || null,
    hotel_title: day.hotel?.name || null,
    slots: day.activities
  }));

  if (itineraryDays.length > 0) {
    const { error: daysError } = await supabase
      .from('itinerary_days')
      .insert(itineraryDays);

    if (daysError) throw daysError;
  }

  return itinerary;
}