'use client';

import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import { parseIsoDate, toApiDate } from '@/lib/dates';

const WEEK_DAYS = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

type BirthDateFieldProps = {
  id?: string;
  value: string;
  onChange: (iso: string) => void;
};

export function BirthDateField({ id, value, onChange }: BirthDateFieldProps) {
  const parsed = parseIsoDate(value);
  const selected = parsed
    ? new DateObject({ date: parsed, calendar: persian, locale: persian_fa })
    : undefined;

  return (
    <DatePicker
      value={selected}
      onChange={(next) => {
        const picked = Array.isArray(next) ? next[0] : next;
        if (!picked || typeof picked === 'string') {
          onChange('');
          return;
        }
        onChange(toApiDate(picked.toDate()));
      }}
      calendar={persian}
      locale={persian_fa}
      weekDays={WEEK_DAYS}
      format="YYYY/MM/DD"
      calendarPosition="bottom-right"
      arrow={false}
      editable={false}
      zIndex={80}
      className="torino-date"
      containerClassName="block w-full"
      maxDate={new Date()}
      render={(displayValue, openCalendar) => (
        <button
          id={id}
          type="button"
          onClick={openCalendar}
          className={`input-field text-right ${displayValue ? 'text-ink' : 'text-gray-400'}`}
        >
          {displayValue || 'تاریخ تولد'}
        </button>
      )}
    />
  );
}
