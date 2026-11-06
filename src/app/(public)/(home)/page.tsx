import { HomeView } from '@/components/home/HomeView';
import { filtersFromSearchParams, hasTourFilters } from '@/lib/tourSearch';
import { fetchTours } from '@/services/tours';
import type { Tour, TourFilters } from '@/types/tour';

export const dynamic = 'force-dynamic';

type HomePageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

async function loadTours(filters: TourFilters) {
  try {
    const tours = await fetchTours(filters);
    return { tours, error: false as const };
  } catch {
    return { tours: [] as Tour[], error: true as const };
  }
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const serverFilters = filtersFromSearchParams(searchParams);
  const filtered = hasTourFilters(serverFilters);

  const [catalogResult, filteredResult] = await Promise.all([
    loadTours({}),
    filtered ? loadTours(serverFilters) : Promise.resolve(null),
  ]);

  const filteredFailed = Boolean(filteredResult?.error);
  const serverTours = filtered
    ? filteredFailed
      ? null
      : filteredResult!.tours
    : catalogResult.error
      ? null
      : catalogResult.tours;

  return (
    <HomeView
      catalog={catalogResult.tours}
      serverTours={serverTours}
      serverFilters={serverFilters}
      serverError={catalogResult.error && serverTours === null}
    />
  );
}
