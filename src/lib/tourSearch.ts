import type { TourFilters } from '@/types/tour';

type SearchParams = Record<string, string | string[] | undefined>;

function getParam(searchParams: SearchParams, name: string) {
  const value = searchParams[name];
  if (typeof value === 'string' && value.trim() !== '') {
    return value.trim();
  }
  return undefined;
}

export function filtersFromSearchParams(searchParams: SearchParams): TourFilters {
  return {
    originId: getParam(searchParams, 'originId'),
    destinationId: getParam(searchParams, 'destinationId'),
    startDate: getParam(searchParams, 'startDate'),
    endDate: getParam(searchParams, 'endDate'),
  };
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
