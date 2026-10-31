import type { ReactNode } from 'react';

type FieldProps = {
  label: string;
  htmlFor?: string;
  error?: string;
  children: ReactNode;
};

export function Field({ label, htmlFor, error, children }: FieldProps) {
  return (
    <div className="block space-y-2">
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error ? <span className="block text-xs text-red-500">{error}</span> : null}
    </div>
  );
}
