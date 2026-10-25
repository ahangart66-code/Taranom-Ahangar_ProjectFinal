'use client';

import { useState } from 'react';
import { Attributes } from '@/components/home/Attributes';
import { Hero } from '@/components/home/Hero';
import { PhoneBanner } from '@/components/home/PhoneBanner';
import { TourListSection } from '@/components/home/TourListSection';
import { WhyTorino } from '@/components/home/WhyTorino';
import { useTours } from '@/hooks/useTours';
import type { TourFilters } from '@/types/tour';

export function HomeView() {
  const [filters, setFilters] = useState<TourFilters>({});
  const { isFetching, isLoading } = useTours(filters);

  return (
    <div>
      <Hero onSearch={setFilters} isFetching={isFetching && !isLoading} />
      <TourListSection filters={filters} onClear={() => setFilters({})} />
      <PhoneBanner />
      <WhyTorino />
      <Attributes />
    </div>
  );
}
