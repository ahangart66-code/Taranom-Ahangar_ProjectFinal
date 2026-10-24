'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchTours } from '@/services/tours';
import type { TourFilters } from '@/types/tour';

export function useTours(filters: TourFilters) {
  return useQuery({
    queryKey: ['tours', filters],
    queryFn: () => fetchTours(filters),
  });
}
