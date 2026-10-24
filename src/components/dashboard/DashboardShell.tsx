'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

const links = [
  { href: '/profile', label: 'پروفایل' },
  { href: '/profile/tours', label: 'تورهای من' },
  { href: '/profile/transactions', label: 'تراکنش‌ها' },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="container-app grid gap-6 py-8 lg:grid-cols-[240px_1fr]">
      <aside className="h-fit rounded-2xl border border-gray-100 bg-white p-4 shadow-soft">
        <p className="mb-4 text-sm font-bold text-ink">حساب کاربری</p>
        <nav className="flex flex-col gap-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3 py-2 text-sm transition ${
                  active
                    ? 'bg-brand-light font-medium text-brand'
                    : 'text-ink-muted hover:bg-gray-50 hover:text-ink'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <section className="min-h-[320px] rounded-2xl border border-gray-100 bg-white p-5 shadow-soft sm:p-6">
        {children}
      </section>
    </div>
  );
}
