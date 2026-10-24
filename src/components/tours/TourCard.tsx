import Link from 'next/link';
import { cityLabel, fleetLabel } from '@/lib/cities';
import { formatTourDate } from '@/lib/dates';
import type { Tour } from '@/types/tour';

type TourCardProps = {
  tour: Tour;
};

export function TourCard({ tour }: TourCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:border-brand/20 hover:shadow-md">
      <div className="relative h-44 overflow-hidden bg-[#dcefe2]">
        {tour.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={tour.image}
            alt={tour.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium text-brand">
            Torino Tour
          </div>
        )}
        <span className="absolute bottom-3 right-3 rounded-lg bg-white/90 px-2.5 py-1 text-xs font-medium text-ink backdrop-blur">
          {fleetLabel(tour.fleetVehicle)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="line-clamp-1 text-base font-bold text-ink">{tour.title}</h3>
          <p className="mt-1 text-xs text-ink-muted">
            {cityLabel(tour.origin?.name)} به {cityLabel(tour.destination?.name)}
          </p>
        </div>

        <p className="text-xs text-ink-muted">
          {formatTourDate(tour.startDate)} — {formatTourDate(tour.endDate)}
        </p>

        {typeof tour.availableSeats === 'number' ? (
          <p className="text-xs text-ink-muted">
            ظرفیت باقی‌مانده:{' '}
            <span className="font-medium text-ink">
              {tour.availableSeats.toLocaleString('fa-IR')} نفر
            </span>
          </p>
        ) : null}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-gray-50 pt-3">
          <div>
            <p className="text-[11px] text-ink-muted">شروع از</p>
            <p className="text-sm font-bold text-brand">
              {tour.price.toLocaleString('fa-IR')} تومان
            </p>
          </div>
          <Link href={`/tours/${tour.id}`} className="btn-primary px-3 py-2 text-xs">
            رزرو و جزئیات
          </Link>
        </div>
      </div>
    </article>
  );
}
