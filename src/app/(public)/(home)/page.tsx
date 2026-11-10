import { HomeView } from '@/components/home/HomeView';
import { filtersFromSearchParams } from '@/lib/tourSearch';
import { fetchTours } from '@/services/tours';
import type { Tour } from '@/types/tour';

export const dynamic = 'force-dynamic';

type HomePageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const filters = filtersFromSearchParams(searchParams);

  let tours: Tour[] = [];
  let error = false;

  try {
    tours = await fetchTours(filters);
  } catch {
    error = true;
  }

  return <HomeView tours={tours} filters={filters} error={error} />;
}
