'use client';

import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

const WEEK_DAYS = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];

type DateRangeFieldProps = {
  value: DateObject[];
  onChange: (dates: DateObject[]) => void;
};

export function DateRangeField({ value, onChange }: DateRangeFieldProps) {
  return (
    <DatePicker
      value={value}
      onChange={(next) => {
        if (!next) {
          onChange([]);
          return;
        }
        onChange(Array.isArray(next) ? next : [next]);
      }}
      range
      rangeHover
      calendar={persian}
      locale={persian_fa}
      weekDays={WEEK_DAYS}
      format="YYYY/MM/DD"
      dateSeparator=" - "
      monthYearSeparator=" "
      calendarPosition="bottom-left"
      arrow={false}
      zIndex={80}
      className="torino-date"
      containerClassName="search-date w-full"
      render={(displayValue, openCalendar) => (
        <button
          type="button"
          onClick={openCalendar}
          className={`w-full truncate bg-transparent text-right outline-none ${
            displayValue ? 'text-[13px] text-ink' : 'text-base text-ink'
          }`}
        >
          {displayValue || 'تاریخ'}
        </button>
      )}
    />
  );
}
