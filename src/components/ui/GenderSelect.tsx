import { forwardRef, type SelectHTMLAttributes } from 'react';

type GenderSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export const GenderSelect = forwardRef<HTMLSelectElement, GenderSelectProps>(
  function GenderSelect({ className = '', ...props }, ref) {
    return (
      <select ref={ref} className={`input-field ${className}`} {...props}>
        <option value="">انتخاب کنید</option>
        <option value="male">مرد</option>
        <option value="female">زن</option>
      </select>
    );
  },
);
