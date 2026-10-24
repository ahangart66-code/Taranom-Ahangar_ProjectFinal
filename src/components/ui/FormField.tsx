'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import type { FieldError } from 'react-hook-form';

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: FieldError | string;
  hint?: ReactNode;
};

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  function FormField({ label, error, hint, id, className = '', ...props }, ref) {
    const message = typeof error === 'string' ? error : error?.message;

    return (
      <label className="block space-y-2" htmlFor={id}>
        {label ? <span className="text-sm font-medium text-ink">{label}</span> : null}
        <input
          id={id}
          ref={ref}
          className={`input-field ${className}`}
          {...props}
        />
        {message ? <span className="block text-xs text-red-500">{message}</span> : null}
        {!message && hint ? (
          <span className="block text-xs text-ink-muted">{hint}</span>
        ) : null}
      </label>
    );
  },
);
