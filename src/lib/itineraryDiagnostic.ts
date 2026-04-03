import { TripItem } from '@/types/trip';

export function getItineraryDiagnostics(items: TripItem[]) {
  const hotelDestinationIds = new Set(
    items
      .filter(i => i.type === 'hébergement' && i.destination_id)
      .map(i => i.destination_id)
  );

  const orphanItems = items.filter(
    i =>
      i.type !== 'hébergement' &&
      i.destination_id &&
      !hotelDestinationIds.has(i.destination_id)
  );

  const selectedDestinationIds = [...new Set(items.map(i => i.destination_id).filter(Boolean))];

  return {
    hasMultipleDestinations: selectedDestinationIds.length > 1,
    orphanItems,
    selectedDestinationIds
  };
}