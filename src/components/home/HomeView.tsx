'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Attributes } from '@/components/home/Attributes';
import { Hero } from '@/components/home/Hero';
import { PhoneBanner } from '@/components/home/PhoneBanner';
import { TourListSection } from '@/components/home/TourListSection';
import { WhyTorino } from '@/components/home/WhyTorino';
import { toSearchQuery } from '@/lib/tourSearch';
import type { Tour, TourFilters } from '@/types/tour';

type HomeViewProps = {
  tours: Tour[];
  filters: TourFilters;
  error: boolean;
};

export function HomeView({ tours, filters, error }: HomeViewProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (newFilters: TourFilters) => {
    startTransition(() => {
      router.replace(toSearchQuery(newFilters));
    });
  };

  const handleRetry = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div>
      <Hero initialFilters={filters} onSearch={handleSearch} isFetching={isPending} />
      <TourListSection
        tours={tours}
        isLoading={isPending}
        isError={error}
        onClear={() => handleSearch({})}
        onRetry={handleRetry}
      />
      <PhoneBanner />
      <WhyTorino />
      <Attributes />
    </div>
  );
}
