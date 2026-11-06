'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Attributes } from '@/components/home/Attributes';
import { Hero } from '@/components/home/Hero';
import { PhoneBanner } from '@/components/home/PhoneBanner';
import { TourListSection } from '@/components/home/TourListSection';
import { WhyTorino } from '@/components/home/WhyTorino';
import { useTours } from '@/hooks/useTours';
import { filterTours, sameTourFilters, toSearchQuery } from '@/lib/tourSearch';
import type { Tour, TourFilters } from '@/types/tour';

type HomeViewProps = {
  catalog: Tour[];
  serverTours: Tour[] | null;
  serverFilters: TourFilters;
  serverError: boolean;
};

function filterKey(filters: TourFilters) {
  return [filters.originId || '', filters.destinationId || '', filters.startDate || '', filters.endDate || ''].join('|');
}

export function HomeView({ catalog, serverTours, serverFilters, serverError }: HomeViewProps) {
  const router = useRouter();
  const serverKey = filterKey(serverFilters);
  const [filters, setFilters] = useState<TourFilters>(serverFilters);
  const [syncedKey, setSyncedKey] = useState(serverKey);

  if (serverKey !== syncedKey) {
    setFilters(serverFilters);
    setSyncedKey(serverKey);
  }

  const filtersMatchServer = sameTourFilters(filters, serverFilters);
  const canFilterLocally = catalog.length > 0;
  const hasServerList = filtersMatchServer && serverTours !== null;
  const needsClientFetch = !canFilterLocally && !hasServerList;
  const clientQuery = useTours(filters, needsClientFetch);

  const tours = useMemo(() => {
    if (hasServerList) return serverTours;
    if (canFilterLocally) return filterTours(catalog, filters);
    return clientQuery.data;
  }, [canFilterLocally, catalog, clientQuery.data, filters, hasServerList, serverTours]);

  const isLoading = needsClientFetch && clientQuery.isLoading;
  const isError = needsClientFetch ? clientQuery.isError || serverError : false;
  const isFetching = needsClientFetch && clientQuery.isFetching && !clientQuery.isLoading;

  const handleSearch = (next: TourFilters) => {
    setFilters(next);
    router.replace(toSearchQuery(next));
  };

  const handleClear = () => {
    handleSearch({});
  };

  const handleRetry = () => {
    if (needsClientFetch) {
      void clientQuery.refetch();
      return;
    }
    router.refresh();
  };

  return (
    <div>
      <Hero initialFilters={serverFilters} onSearch={handleSearch} isFetching={isFetching} />
      <TourListSection
        tours={tours}
        isLoading={isLoading || isFetching}
        isError={isError}
        onClear={handleClear}
        onRetry={handleRetry}
      />
      <PhoneBanner />
      <WhyTorino />
      <Attributes />
    </div>
  );
}
