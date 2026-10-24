'use client';

import Link from 'next/link';
import { useState } from 'react';
import { LoginModal } from '@/components/auth/LoginModal';
import { useAuth } from '@/context/AuthContext';
import { getUserDisplayName } from '@/types/auth';

const navItems = [
  { href: '/', label: 'صفحه اصلی' },
  { href: '/#tours', label: 'تورهای گردشگری' },
  { href: '/about', label: 'درباره ما' },
  { href: '/contact', label: 'تماس با ما' },
];

export function Header() {
  const { user, isHydrated, logout, isAuthenticated } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const displayName = getUserDisplayName(user);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="container-app flex h-16 items-center justify-between gap-4">
          <Link href="/" className="text-xl font-bold text-brand">
            Torin<span className="text-ink">o</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-ink-muted transition hover:text-brand"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {!isHydrated ? (
              <div className="h-10 w-24 animate-pulse rounded-xl bg-gray-100" />
            ) : isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="rounded-xl border border-brand/30 px-3 py-2 text-sm font-medium text-brand"
                >
                  {displayName}
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="hidden rounded-xl px-3 py-2 text-sm text-ink-muted hover:bg-gray-50 sm:inline-flex"
                >
                  خروج
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn-primary"
                onClick={() => setLoginOpen(true)}
              >
                ورود
              </button>
            )}

            <button
              type="button"
              className="rounded-lg p-2 text-ink md:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="منو"
            >
              ☰
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-gray-100 md:hidden">
            <nav className="container-app flex flex-col gap-2 py-3">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-2 py-2 text-sm text-ink-muted hover:bg-brand-light hover:text-brand"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </header>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
