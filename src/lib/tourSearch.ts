import type { Tour, TourFilters } from '@/types/tour';

function firstParam(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  const text = raw?.trim();
  return text ? text : undefined;
}

function isIsoDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function filtersFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): TourFilters {
  const originId = firstParam(searchParams.originId);
  const destinationId = firstParam(searchParams.destinationId);
  const startDate = firstParam(searchParams.startDate);
  const endDate = firstParam(searchParams.endDate);
  const filters: TourFilters = {};

  if (originId) filters.originId = originId;
  if (destinationId) filters.destinationId = destinationId;
  if (startDate && isIsoDate(startDate)) filters.startDate = startDate;
  if (endDate && isIsoDate(endDate)) filters.endDate = endDate;

  return filters;
}

export function hasTourFilters(filters: TourFilters) {
  return Boolean(filters.originId || filters.destinationId || filters.startDate || filters.endDate);
}

export function sameTourFilters(left: TourFilters, right: TourFilters) {
  return (
    (left.originId || '') === (right.originId || '') &&
    (left.destinationId || '') === (right.destinationId || '') &&
    (left.startDate || '') === (right.startDate || '') &&
    (left.endDate || '') === (right.endDate || '')
  );
}

/** Same rules as GET /tour: origin, destination, and inclusive travel dates. */
export function filterTours(tours: Tour[], filters: TourFilters): Tour[] {
  if (!hasTourFilters(filters)) return tours;

  const start = filters.startDate ? new Date(filters.startDate) : null;
  const end = filters.endDate ? new Date(filters.endDate) : null;

  return tours.filter((tour) => {
    if (filters.originId && tour.origin?.id !== filters.originId) return false;
    if (filters.destinationId && tour.destination?.id !== filters.destinationId) return false;
    if (start && new Date(tour.startDate) < start) return false;
    if (end && new Date(tour.endDate) > end) return false;
    return true;
  });
}

export function toSearchQuery(filters: TourFilters) {
  const params = new URLSearchParams();
  if (filters.originId) params.set('originId', filters.originId);
  if (filters.destinationId) params.set('destinationId', filters.destinationId);
  if (filters.startDate) params.set('startDate', filters.startDate);
  if (filters.endDate) params.set('endDate', filters.endDate);
  const query = params.toString();
  return query ? `/?${query}` : '/';
}
