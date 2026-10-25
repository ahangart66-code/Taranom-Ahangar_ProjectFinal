'use client';

import { TourCard } from '@/components/tours/TourCard';
import { useTours } from '@/hooks/useTours';
import type { TourFilters } from '@/types/tour';

type TourListSectionProps = {
  filters: TourFilters;
  onClear: () => void;
};

function TourSkeleton() {
  return <div className="h-[250px] animate-pulse rounded-[10px] border border-black/10 bg-gray-50" />;
}

export function TourListSection({ filters, onClear }: TourListSectionProps) {
  const { data, isLoading, isError, refetch } = useTours(filters);

  return (
    <section id="tours" className="container-app scroll-mt-24 pb-4 pt-2">
      <h2 className="mb-3 text-2xl font-normal text-black sm:text-[32px]">همه تور ها</h2>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <TourSkeleton key={item} />
          ))}
        </div>
      ) : null}

      {isError ? (
        <div className="rounded-[10px] border border-red-100 bg-red-50 px-5 py-8 text-center">
          <p className="text-sm font-medium text-red-600">دریافت تورها ناموفق بود.</p>
          <button type="button" className="btn-primary mt-4" onClick={() => refetch()}>
            تلاش دوباره
          </button>
        </div>
      ) : null}

      {!isLoading && !isError && data && data.length === 0 ? (
        <div className="rounded-[10px] border border-dashed border-black/15 px-5 py-12 text-center">
          <p className="text-sm font-medium text-ink">توری با این مشخصات پیدا نشد</p>
          <button type="button" className="btn-primary mt-5" onClick={onClear}>
            نمایش همه تورها
          </button>
        </div>
      ) : null}

      {!isLoading && !isError && data && data.length > 0 ? (
        <ul className="grid grid-cols-1 gap-x-[25px] gap-y-[30px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((tour) => (
            <li key={tour.id}>
              <TourCard tour={tour} />
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
