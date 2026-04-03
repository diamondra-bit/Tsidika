import { DailyPlan, PlannedSlot, PreferredMoment, TripItem, MealService } from '@/types/trip';

const normalize = (value?: string) =>
  (value || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

const addDays = (dateStr: string, offset: number): string => {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + offset);
  return date.toISOString().split('T')[0];
};

const getPreferredMoment = (item: TripItem): PreferredMoment => {
  if (
    item.preferred_moment === 'morning' ||
    item.preferred_moment === 'afternoon' ||
    item.preferred_moment === 'evening' ||
    item.preferred_moment === 'flex'
  ) {
    return item.preferred_moment;
  }

  const text = `${normalize(item.title)} ${normalize(item.name)} ${normalize(item.type)} ${normalize(item.description)}`;

  if (text.includes('coucher de soleil') || text.includes('sunset') || text.includes('fenetre')) {
    return 'evening';
  }

  if (
    text.includes('plongee') ||
    text.includes('randonnee') ||
    text.includes('trek') ||
    text.includes('safari') ||
    text.includes('quad') ||
    text.includes('baleine') ||
    text.includes('sortie')
  ) {
    return 'morning';
  }

  if (
    text.includes('detente') ||
    text.includes('piscine') ||
    text.includes('pirogue') ||
    text.includes('histoire') ||
    text.includes('culture') ||
    text.includes('photo')
  ) {
    return 'afternoon';
  }

  return 'flex';
};

const getMealService = (item: TripItem): MealService => {
  return item.meal_service || 'both';
};

const parseDuration = (dur?: string): number => {
  if (!dur) return 120;

  const value = normalize(dur);

  if (value.includes('journee')) return 420;
  if (value.includes('demi-journee')) return 180;

  const hours = value.match(/(\d+)\s*h/);
  const mins = value.match(/(\d+)\s*min/);

  let total = 0;
  if (hours) total += parseInt(hours[1], 10) * 60;
  if (mins) total += parseInt(mins[1], 10);

  return total || 120;
};

const canFitMoment = (item: TripItem, moment: PreferredMoment): boolean => {
  const duration = parseDuration(item.duration);

  if (moment === 'morning') return duration <= 210;
  if (moment === 'afternoon') return duration <= 210;
  if (moment === 'evening') return duration <= 120;
  return true;
};

const removeByUniqueKey = (pool: TripItem[], uniqueKey: string) => {
  const index = pool.findIndex(item => item.uniqueKey === uniqueKey);
  if (index >= 0) pool.splice(index, 1);
};

const isCompatibleMoment = (
  itemMoment: PreferredMoment,
  targetMoment: PreferredMoment
): boolean => {
  if (itemMoment === 'flex') return true;
  return itemMoment === targetMoment;
};

const pickBestActivity = (
  pool: TripItem[],
  destinationId: number | undefined,
  targetMoment: PreferredMoment
): TripItem | null => {
  // 1. priorité absolue : même destination + même moment
  const exactSameDestination = pool.find(
    item =>
      item.destination_id === destinationId &&
      getPreferredMoment(item) === targetMoment &&
      canFitMoment(item, targetMoment)
  );
  if (exactSameDestination) {
    removeByUniqueKey(pool, exactSameDestination.uniqueKey);
    return exactSameDestination;
  }

  // 2. même destination + flex
  const flexSameDestination = pool.find(
    item =>
      item.destination_id === destinationId &&
      getPreferredMoment(item) === 'flex' &&
      canFitMoment(item, targetMoment)
  );
  if (flexSameDestination) {
    removeByUniqueKey(pool, flexSameDestination.uniqueKey);
    return flexSameDestination;
  }

  // 3. autre destination + même moment
  const exactOtherDestination = pool.find(
    item =>
      getPreferredMoment(item) === targetMoment &&
      canFitMoment(item, targetMoment)
  );
  if (exactOtherDestination) {
    removeByUniqueKey(pool, exactOtherDestination.uniqueKey);
    return exactOtherDestination;
  }

  // 4. autre destination + flex
  const flexOtherDestination = pool.find(
    item =>
      getPreferredMoment(item) === 'flex' &&
      canFitMoment(item, targetMoment)
  );
  if (flexOtherDestination) {
    removeByUniqueKey(pool, flexOtherDestination.uniqueKey);
    return flexOtherDestination;
  }

  // 5. IMPORTANT : on n'autorise PAS evening -> morning ni morning -> evening
  return null;
};

const pickBestRestaurant = (
  pool: TripItem[],
  destinationId: number | undefined,
  meal: 'lunch' | 'dinner'
): TripItem | null => {
  const exactSameDestination = pool.find(
    item =>
      item.destination_id === destinationId &&
      (getMealService(item) === meal || getMealService(item) === 'both')
  );
  if (exactSameDestination) {
    removeByUniqueKey(pool, exactSameDestination.uniqueKey);
    return exactSameDestination;
  }

  const fallback = pool.find(
    item => getMealService(item) === meal || getMealService(item) === 'both'
  );
  if (fallback) {
    removeByUniqueKey(pool, fallback.uniqueKey);
    return fallback;
  }

  return null;
};

export function buildDetailedPlan(items: TripItem[]): DailyPlan[] {
  const hotels = items
    .filter(item => item.type === 'hébergement' && item.checkIn && item.checkOut)
    .sort((a, b) => new Date(a.checkIn!).getTime() - new Date(b.checkIn!).getTime());

  const activitiesPool = items
    .filter(item => item.type === 'découverte')
    .map(item => ({ ...item }));

  const restaurantsPool = items
    .filter(item => item.type === 'gastronomie')
    .map(item => ({ ...item }));

  const plan: DailyPlan[] = [];
  let currentDay = 1;

  for (const hotel of hotels) {
    const nights = Math.max(1, Number(hotel.nights) || 1);

    for (let i = 0; i < nights; i++) {
      const destinationId = hotel.destination_id;
      const currentDate = hotel.checkIn ? addDays(hotel.checkIn, i) : undefined;
      const slots: PlannedSlot[] = [];

      slots.push({
        time: '08:00',
        title: `Réveil & petit-déjeuner à ${hotel.name || 'l’hébergement'}`,
        type: 'hébergement',
        img: hotel.img,
        item: hotel,
        label: 'Petit-déjeuner inclus'
      });

      const morningActivity = pickBestActivity(activitiesPool, destinationId, 'morning');
      if (morningActivity) {
        slots.push({
          time: '09:30',
          title: morningActivity.name || morningActivity.title || 'Activité',
          type: 'découverte',
          img: morningActivity.img,
          item: morningActivity,
          label: 'Activité du matin'
        });
      } else {
        slots.push({
          time: '09:30',
          title: 'Temps libre / exploration personnelle',
          type: 'info',
          img: hotel.img,
          item: null,
          label: 'Matinée libre'
        });
      }

      const lunch = pickBestRestaurant(restaurantsPool, destinationId, 'lunch');
      if (lunch) {
        slots.push({
          time: '12:30',
          title: lunch.name || lunch.title || 'Déjeuner',
          type: 'gastronomie',
          img: lunch.img,
          item: lunch,
          label: 'Déjeuner'
        });
      } else {
        slots.push({
          time: '12:30',
          title: 'Déjeuner libre',
          type: 'info',
          img: hotel.img,
          item: null,
          label: 'Pause repas'
        });
      }

      const afternoonActivity = pickBestActivity(activitiesPool, destinationId, 'afternoon');
      if (afternoonActivity) {
        slots.push({
          time: '14:30',
          title: afternoonActivity.name || afternoonActivity.title || 'Activité',
          type: 'découverte',
          img: afternoonActivity.img,
          item: afternoonActivity,
          label: 'Activité de l’après-midi'
        });
      } else {
        slots.push({
          time: '15:00',
          title: 'Repos / balade / détente',
          type: 'info',
          img: hotel.img,
          item: null,
          label: 'Temps calme'
        });
      }

      const eveningActivity = pickBestActivity(activitiesPool, destinationId, 'evening');
      if (eveningActivity) {
        slots.push({
          time: '17:30',
          title: eveningActivity.name || eveningActivity.title || 'Activité',
          type: 'découverte',
          img: eveningActivity.img,
          item: eveningActivity,
          label: 'Moment de fin de journée'
        });
      }

      const dinner = pickBestRestaurant(restaurantsPool, destinationId, 'dinner');
      if (dinner) {
        slots.push({
          time: '19:30',
          title: dinner.name || dinner.title || 'Dîner',
          type: 'gastronomie',
          img: dinner.img,
          item: dinner,
          label: 'Dîner'
        });
      } else {
        slots.push({
          time: '19:30',
          title: 'Dîner libre',
          type: 'info',
          img: hotel.img,
          item: null,
          label: 'Soirée libre'
        });
      }

      slots.push({
        time: '21:30',
        title: `Nuit à ${hotel.name || 'l’hébergement'}`,
        type: 'hébergement',
        img: hotel.img,
        item: hotel,
        label: currentDate ? `Nuit du ${currentDate}` : 'Hébergement'
      });

      plan.push({
        day: currentDay++,
        hotel,
        date: currentDate,
        activities: slots
      });
    }
  }

  if (plan.length === 0) {
    plan.push({
      day: 1,
      hotel: null,
      activities: [
        {
          time: '09:00',
          title: 'Aucun hébergement sélectionné',
          type: 'info',
          label: 'Ajoute un hébergement pour générer un vrai itinéraire'
        }
      ]
    });
  }

  return plan;
}