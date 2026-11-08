import { ReserveButton } from '@/components/tours/ReserveButton';
import { cityLabel, fleetLabel } from '@/lib/cities';
import { formatTourDate, tourStayLabel } from '@/lib/dates';
import { tourImageSrc } from '@/lib/media';
import type { Tour } from '@/types/tour';

const highlights = [
  { title: 'تورلیدر از مبدا', icon: 'guide' },
  { title: 'برنامه سفر', icon: 'plan' },
  { title: 'تضمین کیفیت', icon: 'quality' },
] as const;

function capacityLabel(tour: Tour) {
  const count = tour.capacity ?? tour.availableSeats;
  if (count == null) return '—';
  return `حداکثر ${count.toLocaleString('fa-IR')} نفر`;
}

function insuranceLabel(value: Tour['insurance']) {
  if (value === true || value === 'true') return 'دارد';
  if (value === false || value === 'false' || value == null || value === '') return 'ندارد';
  return String(value);
}

function Icon({ name }: { name: string }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className: 'h-4 w-4 shrink-0',
    'aria-hidden': true,
  };

  switch (name) {
    case 'guide':
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3" />
          <path d="M6 19c1.2-2.6 3.3-4 6-4s4.8 1.4 6 4" />
        </svg>
      );
    case 'plan':
      return (
        <svg {...common}>
          <path d="M8 6h11M8 12h11M8 18h11" />
          <path d="M5 6h.01M5 12h.01M5 18h.01" />
        </svg>
      );
    case 'quality':
      return (
        <svg {...common}>
          <path d="M12 3 5 6v6c0 4.2 2.8 7.2 7 8 4.2-.8 7-3.8 7-8V6l-7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'origin':
      return (
        <svg {...common}>
          <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" />
          <circle cx="12" cy="11" r="2" />
        </svg>
      );
    case 'date':
      return (
        <svg {...common}>
          <rect x="4" y="5" width="16" height="15" rx="2" />
          <path d="M8 3v4M16 3v4M4 10h16" />
        </svg>
      );
    case 'fleet':
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="9" rx="2" />
          <path d="M3 12h18M7 16v2M17 16v2" />
        </svg>
      );
    case 'seats':
      return (
        <svg {...common}>
          <circle cx="9" cy="9" r="2.2" />
          <circle cx="16" cy="10" r="1.8" />
          <path d="M4.5 18c.8-2.2 2.4-3.3 4.5-3.3S13 15.8 13.8 18M14 18c.4-1.5 1.4-2.3 2.8-2.3 1.3 0 2.2.7 2.7 2.3" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M12 3 5 6v6c0 4.2 2.8 7.2 7 8 4.2-.8 7-3.8 7-8V6l-7-3Z" />
        </svg>
      );
  }
}

export function TourDetails({ tour }: { tour: Tour }) {
  const facts = [
    { label: 'مبدا', value: cityLabel(tour.origin?.name), icon: 'origin' },
    { label: 'تاریخ رفت', value: formatTourDate(tour.startDate), icon: 'date' },
    { label: 'تاریخ برگشت', value: formatTourDate(tour.endDate), icon: 'date' },
    { label: 'حمل و نقل', value: fleetLabel(tour.fleetVehicle), icon: 'fleet' },
    { label: 'ظرفیت', value: capacityLabel(tour), icon: 'seats' },
    { label: 'بیمه', value: insuranceLabel(tour.insurance), icon: 'quality' },
  ];

  return (
    <div className="bg-[#f5f5f5] py-6 sm:py-8">
      <div className="container-app flex flex-col gap-4">
        <section className="rounded-2xl bg-white p-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)] sm:p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
            <div className="h-[210px] overflow-hidden rounded-xl bg-[#e7f2ec] sm:h-[230px] lg:h-[240px] lg:w-[397px] lg:shrink-0">
              {tour.image ? (
                <img src={tourImageSrc(tour.image)} alt={tour.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-brand">تورینو</div>
              )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <h1 className="text-2xl font-bold text-black sm:text-[28px]">{tour.title}</h1>
              <p className="mt-2 text-base text-ink">{tourStayLabel(tour.startDate, tour.endDate)}</p>

              <ul className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#595959]">
                {highlights.map((item) => (
                  <li key={item.title} className="flex items-center gap-1.5">
                    <Icon name={item.icon} />
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>

              {tour.options && tour.options.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {tour.options.map((option) => (
                    <li
                      key={option}
                      className="rounded-full bg-[#e7f2ec] px-3 py-1 text-sm text-brand"
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-black">
                  <span className="ml-1 text-[22px] font-medium text-[#009eca]">
                    {tour.price.toLocaleString('fa-IR')}
                  </span>
                  تومان
                </p>
                <ReserveButton tour={tour} tourId={tour.id} availableSeats={tour.availableSeats} />
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-wrap rounded-2xl bg-white">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex w-1/2 flex-col items-center px-2 py-4 text-center sm:w-1/3 lg:w-auto lg:flex-1 lg:border-l lg:border-black/10 lg:py-5 lg:last:border-l-0"
            >
              <p className="flex items-center gap-1 whitespace-nowrap text-[13px] text-[#595959]">
                <Icon name={fact.icon} />
                {fact.label}
              </p>
              <p className="mt-2 whitespace-nowrap text-sm text-ink">{fact.value}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
