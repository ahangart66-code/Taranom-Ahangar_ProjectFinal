'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { DateObject } from 'react-multi-date-picker';
import { DateRangeField } from '@/components/home/DateRangeField';
import { CITY_OPTIONS } from '@/lib/cities';
import { parseIsoDate, toApiDate } from '@/lib/dates';
import type { TourFilters } from '@/types/tour';

type TourSearchProps = {
  initialFilters: TourFilters;
  onSearch: (filters: TourFilters) => void;
  isFetching?: boolean;
};

function datesFromFilters(filters: TourFilters) {
  const dates: DateObject[] = [];
  const start = parseIsoDate(filters.startDate);
  const end = parseIsoDate(filters.endDate);
  if (start) dates.push(new DateObject(start));
  if (end) dates.push(new DateObject(end));
  return dates;
}

const fieldClass =
  'flex h-[50px] items-center gap-2 rounded-xl border border-black/15 px-3 lg:h-auto lg:flex-1 lg:rounded-none lg:border-0 lg:border-l lg:border-black/20 lg:px-2';

export function TourSearch({ initialFilters, onSearch, isFetching }: TourSearchProps) {
  const [originId, setOriginId] = useState(initialFilters.originId ?? '');
  const [destinationId, setDestinationId] = useState(initialFilters.destinationId ?? '');
  const [dates, setDates] = useState<DateObject[]>(() => datesFromFilters(initialFilters));

  useEffect(() => {
    setOriginId(initialFilters.originId ?? '');
    setDestinationId(initialFilters.destinationId ?? '');
    setDates(datesFromFilters(initialFilters));
  }, [initialFilters.originId, initialFilters.destinationId, initialFilters.startDate, initialFilters.endDate]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const filters: TourFilters = {};
    if (originId) filters.originId = originId;
    if (destinationId) filters.destinationId = destinationId;
    if (dates[0]) filters.startDate = toApiDate(dates[0].toDate());
    if (dates[1]) filters.endDate = toApiDate(dates[1].toDate());

    onSearch(filters);
    document.getElementById('tours')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <form
      id="search"
      method="get"
      action="/"
      onSubmit={handleSubmit}
      className="mx-auto mb-12 mt-6 flex w-full max-w-[874px] flex-col gap-3 lg:mb-[84px] lg:mt-7 lg:h-[71px] lg:flex-row lg:items-center lg:gap-0 lg:rounded-[20px] lg:border lg:border-black/15 lg:p-[7.5px] lg:px-2.5"
    >
      <ul className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap lg:w-[77%] lg:flex-nowrap lg:gap-0">
        <li className={`${fieldClass} sm:w-[calc(50%-6px)] lg:w-auto`}>
          <img src="/images/location.png" alt="" className="h-5 w-5 shrink-0" />
          <select
            name="originId"
            aria-label="مبدأ"
            className="w-full appearance-none bg-transparent text-base text-ink outline-none"
            value={originId}
            onChange={(event) => setOriginId(event.target.value)}
          >
            <option value="">مبدأ</option>
            {CITY_OPTIONS.map((city) => (
              <option key={city.id} value={city.id}>
                {city.label}
              </option>
            ))}
          </select>
        </li>

        <li className={`${fieldClass} sm:w-[calc(50%-6px)] lg:w-auto`}>
          <img src="/images/destination.png" alt="" className="h-5 w-5 shrink-0" />
          <select
            name="destinationId"
            aria-label="مقصد"
            className="w-full appearance-none bg-transparent text-base text-ink outline-none"
            value={destinationId}
            onChange={(event) => setDestinationId(event.target.value)}
          >
            <option value="">مقصد</option>
            {CITY_OPTIONS.map((city) => (
              <option key={city.id} value={city.id}>
                {city.label}
              </option>
            ))}
          </select>
        </li>

        <li className={`${fieldClass} sm:w-full lg:w-auto`}>
          <img src="/images/calendar.png" alt="" className="h-5 w-5 shrink-0" />
          <DateRangeField value={dates} onChange={setDates} />
          <input type="hidden" name="startDate" value={dates[0] ? toApiDate(dates[0].toDate()) : ''} />
          <input type="hidden" name="endDate" value={dates[1] ? toApiDate(dates[1].toDate()) : ''} />
        </li>
      </ul>

      <button
        type="submit"
        disabled={isFetching}
        className="h-12 w-full rounded-2xl bg-brand text-xl text-white transition hover:bg-brand-dark disabled:opacity-60 lg:mr-1.5 lg:h-[51px] lg:w-[190px] lg:shrink-0 lg:text-2xl"
      >
        جستجو
      </button>
    </form>
  );
}
