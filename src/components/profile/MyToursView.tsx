'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { LoginModal } from '@/components/auth/LoginModal';
import { useAuth } from '@/context/AuthContext';
import { cityLabel, fleetLabel } from '@/lib/cities';
import { formatTourDate, tourStayLabel } from '@/lib/dates';
import { tourImageSrc } from '@/lib/media';
import { getUserTours } from '@/services/user';
import { MyToursSkeleton } from '@/components/ui/skeletons';
import type { Tour } from '@/types/tour';

function isFinished(tour: Tour) {
  const end = new Date(tour.endDate);
  if (Number.isNaN(end.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return end < today;
}

export function MyToursView() {
  const { isAuthenticated, isHydrated } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  const toursQuery = useQuery({
    queryKey: ['user-tours'],
    queryFn: getUserTours,
    enabled: isHydrated && isAuthenticated,
  });

  if (!isHydrated || (isAuthenticated && toursQuery.isLoading)) {
    return <MyToursSkeleton />;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h1 className="mb-2 text-xl font-bold text-ink">تورهای من</h1>
        <p className="mb-4 text-sm text-ink-muted">برای دیدن تورهای خریداری‌شده ابتدا وارد شوید.</p>
        <button type="button" className="btn-primary" onClick={() => setLoginOpen(true)}>
          ورود | ثبت نام
        </button>
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      </div>
    );
  }

  if (toursQuery.isError) {
    return (
      <div>
        <h1 className="mb-2 text-xl font-bold text-ink">تورهای من</h1>
        <p className="mb-4 text-sm text-ink-muted">لیست تورها الان در دسترس نیست.</p>
        <button type="button" className="btn-primary" onClick={() => void toursQuery.refetch()}>
          تلاش دوباره
        </button>
      </div>
    );
  }

  const tours = toursQuery.data || [];

  return (
    <div>
      <h1 className="text-xl font-bold text-ink">تورهای من</h1>
      <p className="mt-1 text-sm text-ink-muted">تورهایی که خریده‌اید.</p>

      {tours.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-black/15 px-5 py-12 text-center">
          <p className="text-sm font-medium text-ink">هنوز توری نخریده‌اید</p>
          <Link href="/#tours" className="btn-primary mt-5">
            مشاهده تورها
          </Link>
        </div>
      ) : (
        <ul className="mt-6 flex flex-col gap-4">
          {tours.map((tour) => {
            const finished = isFinished(tour);
            const image = tourImageSrc(tour.image);
            return (
              <li
                key={tour.id}
                className="overflow-hidden rounded-2xl border border-black/10 bg-white"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="h-40 bg-[#e7f2ec] sm:h-auto sm:w-40 sm:shrink-0">
                    {image ? (
                      <img src={image} alt={tour.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full min-h-40 items-center justify-center text-sm text-brand">
                        تورینو
                      </div>
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col gap-3 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h2 className="text-lg font-medium text-ink">{tour.title}</h2>
                      <span
                        className={`rounded-full px-3 py-1 text-xs ${
                          finished ? 'bg-gray-100 text-ink-muted' : 'bg-brand-light text-brand'
                        }`}
                      >
                        {finished ? 'به اتمام رسیده' : 'در حال برگزاری'}
                      </span>
                    </div>
                    <p className="text-sm text-ink-muted">
                      {cityLabel(tour.origin?.name)} به {cityLabel(tour.destination?.name)}
                    </p>
                    <p className="text-sm text-ink-muted">
                      {formatTourDate(tour.startDate)} تا {formatTourDate(tour.endDate)} ·{' '}
                      {tourStayLabel(tour.startDate, tour.endDate)} · {fleetLabel(tour.fleetVehicle)}
                    </p>
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-1">
                      <p className="text-sm text-black">
                        <span className="ml-1 text-base font-medium text-[#009eca]">
                          {tour.price.toLocaleString('fa-IR')}
                        </span>
                        تومان
                      </p>
                      <Link
                        href={`/tours/${tour.id}`}
                        className="inline-flex h-9 items-center justify-center rounded-lg bg-brand px-4 text-sm text-white hover:bg-brand-dark"
                      >
                        مشاهده تور
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
