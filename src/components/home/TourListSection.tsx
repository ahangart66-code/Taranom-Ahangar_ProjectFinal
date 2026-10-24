'use client';

import { useState } from 'react';
import { TourCard } from '@/components/tours/TourCard';
import { TourSearch } from '@/components/home/TourSearch';
import { useTours } from '@/hooks/useTours';
import type { TourFilters } from '@/types/tour';

function TourSkeleton() {
  return (
    <div className="h-[340px] animate-pulse rounded-2xl border border-gray-100 bg-gray-50" />
  );
}

export function TourListSection() {
  const [filters, setFilters] = useState<TourFilters>({});
  const { data, isLoading, isFetching, isError, refetch } = useTours(filters);

  return (
    <>
      <TourSearch onSearch={setFilters} isFetching={isFetching && !isLoading} />

      <section id="tours" className="container-app py-10 sm:py-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-ink sm:text-2xl">همه تورها</h2>
            <p className="mt-1 text-sm text-ink-muted">
              لیست تورها بر اساس فیلترهای انتخابی به‌روز می‌شود.
            </p>
          </div>
          {data ? (
            <p className="text-sm text-ink-muted">
              {data.length.toLocaleString('fa-IR')} تور پیدا شد
            </p>
          ) : null}
        </div>

        {isLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <TourSkeleton key={item} />
            ))}
          </div>
        ) : null}

        {isError ? (
          <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-8 text-center">
            <p className="text-sm font-medium text-red-600">دریافت تورها ناموفق بود.</p>
            <button
              type="button"
              className="btn-primary mt-4"
              onClick={() => refetch()}
            >
              تلاش دوباره
            </button>
          </div>
        ) : null}

        {!isLoading && !isError && data && data.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-5 py-12 text-center">
            <p className="text-sm font-medium text-ink">توری با این مشخصات پیدا نشد</p>
            <p className="mt-2 text-xs text-ink-muted">
              فیلترها را تغییر دهید یا همه تورها را دوباره ببینید.
            </p>
            <button
              type="button"
              className="btn-primary mt-5"
              onClick={() => setFilters({})}
            >
              نمایش همه تورها
            </button>
          </div>
        ) : null}

        {!isLoading && !isError && data && data.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : null}
      </section>
    </>
  );
}
