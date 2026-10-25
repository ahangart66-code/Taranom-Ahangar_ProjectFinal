import Link from 'next/link';
import { fleetLabel } from '@/lib/cities';
import { tourCardMeta } from '@/lib/dates';
import type { Tour } from '@/types/tour';

type TourCardProps = {
  tour: Tour;
};

export function TourCard({ tour }: TourCardProps) {
  const meta = tourCardMeta(tour.startDate, tour.endDate, fleetLabel(tour.fleetVehicle));

  return (
    <article className="overflow-hidden rounded-[10px] border border-black/[0.12] bg-white shadow-[0_0_2px_rgba(0,0,0,0.25)]">
      <div className="h-[159px] bg-[#e7f2ec]">
        {tour.image ? (
          <img src={tour.image} alt={tour.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-brand">تورینو</div>
        )}
      </div>

      <div className="border-b border-black/[0.12] px-2 pb-1.5 pt-2">
        <h3 className="mb-1.5 truncate text-[22px] font-light leading-[34px] text-black">
          {tour.title}
        </h3>
        <p className="mb-1.5 truncate text-[15px] font-light text-[#282828]/70">{meta}</p>
      </div>

      <div className="flex items-center justify-between px-2 py-2">
        <Link
          href={`/tours/${tour.id}`}
          className="inline-flex h-[25px] w-16 items-center justify-center rounded bg-brand text-[15px] font-light tracking-wide text-white"
        >
          رزرو
        </Link>
        <p className="text-xs font-normal text-black">
          <span className="ml-1 text-base text-[#009eca]">
            {tour.price.toLocaleString('fa-IR')}
          </span>
          تومان
        </p>
      </div>
    </article>
  );
}
