import { http } from '@/services/http';
import type { Tour, TourFilters } from '@/types/tour';

export async function fetchTours(filters: TourFilters = {}): Promise<Tour[]> {
  const params: Record<string, string> = {};
  if (filters.originId) params.originId = filters.originId;
  if (filters.destinationId) params.destinationId = filters.destinationId;
  if (filters.startDate) params.startDate = filters.startDate;
  if (filters.endDate) params.endDate = filters.endDate;

  const { data } = await http.get<Tour[]>('/tour', { params });
  return data;
}

export async function fetchTourById(tourId: string): Promise<Tour> {
  const { data } = await http.get<Tour>(`/tour/${tourId}`);
  return data;
}
