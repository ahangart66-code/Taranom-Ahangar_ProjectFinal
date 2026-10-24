'use client';

import { useState, type FormEvent } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { CITY_OPTIONS } from '@/lib/cities';
import { toApiDate } from '@/lib/dates';
import type { TourFilters } from '@/types/tour';

type TourSearchProps = {
  onSearch: (filters: TourFilters) => void;
  isFetching?: boolean;
};

export function TourSearch({ onSearch, isFetching }: TourSearchProps) {
  const [originId, setOriginId] = useState('');
  const [destinationId, setDestinationId] = useState('');
  const [dates, setDates] = useState<DateObject[]>([]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const filters: TourFilters = {};
    if (originId) filters.originId = originId;
    if (destinationId) filters.destinationId = destinationId;

    if (dates[0]) {
      filters.startDate = toApiDate(dates[0].toDate());
    }
    if (dates[1]) {
      filters.endDate = toApiDate(dates[1].toDate());
    }

    onSearch(filters);
  };

  const handleReset = () => {
    setOriginId('');
    setDestinationId('');
    setDates([]);
    onSearch({});
  };

  return (
    <section id="search" className="container-app -mt-6 sm:-mt-8">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-gray-100 bg-white p-4 shadow-soft sm:p-5"
      >
        <div className="mb-4">
          <h2 className="text-base font-bold text-ink sm:text-lg">جست‌وجوی تور</h2>
          <p className="mt-1 text-xs text-ink-muted sm:text-sm">
            مبدأ، مقصد و بازه تاریخ را انتخاب کنید. تاریخ‌ها مطابق قرارداد API به صورت
            میلادی ISO ارسال می‌شوند.
          </p>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <label className="block space-y-2">
            <span className="text-xs font-medium text-ink">مبدأ</span>
            <select
              className="input-field"
              value={originId}
              onChange={(event) => setOriginId(event.target.value)}
            >
              <option value="">همه مبدأها</option>
              {CITY_OPTIONS.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-xs font-medium text-ink">مقصد</span>
            <select
              className="input-field"
              value={destinationId}
              onChange={(event) => setDestinationId(event.target.value)}
            >
              <option value="">همه مقصدها</option>
              {CITY_OPTIONS.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-2 md:col-span-2 lg:col-span-1">
            <span className="text-xs font-medium text-ink">بازه تاریخ سفر</span>
            <DatePicker
              value={dates}
              onChange={(value) => {
                if (!value) {
                  setDates([]);
                  return;
                }
                setDates(Array.isArray(value) ? value : [value]);
              }}
              range
              rangeHover
              calendar={persian}
              locale={persian_fa}
              calendarPosition="bottom-center"
              inputClass="input-field text-center"
              containerClassName="w-full"
              placeholder="انتخاب تاریخ"
            />
          </label>

          <div className="flex items-end gap-2">
            <button type="submit" className="btn-primary w-full" disabled={isFetching}>
              {isFetching ? 'در حال جست‌وجو...' : 'جست‌وجو'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex shrink-0 items-center justify-center rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-ink-muted transition hover:bg-gray-50"
            >
              پاک کردن
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
