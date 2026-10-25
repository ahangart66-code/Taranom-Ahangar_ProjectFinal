'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LoginModal } from '@/components/auth/LoginModal';
import { useAuth } from '@/context/AuthContext';
import { getUserDisplayName } from '@/types/auth';

const navItems = [
  { href: '/', label: 'صفحه اصلی' },
  { href: '/#tours', label: 'خدمات گردشگری' },
  { href: '/about', label: 'درباره ما' },
  { href: '/contact', label: 'تماس با ما' },
];

export function Header() {
  const pathname = usePathname();
  const { user, isHydrated, logout, isAuthenticated } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const displayName = getUserDisplayName(user);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
        <div className="container-app flex items-center justify-between py-[15px]">
          <div className="flex items-center">
            <button
              type="button"
              className="me-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 lg:hidden"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="منو"
            >
              <span className="flex flex-col gap-1">
                <span className="block h-0.5 w-4 bg-ink" />
                <span className="block h-0.5 w-4 bg-ink" />
                <span className="block h-0.5 w-4 bg-ink" />
              </span>
            </button>

            <Link href="/" className="shrink-0">
              <img src="/images/logo.png" alt="تورینو" className="h-11 w-auto" />
            </Link>

            <nav className="mr-6 hidden items-center gap-6 lg:flex xl:mr-[84px] xl:w-[499px] xl:justify-between xl:gap-0">
              {navItems.map((item) => {
                const active = item.href === '/' ? pathname === '/' : pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-base transition hover:text-brand ${
                      active ? 'text-brand' : 'text-ink'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {!isHydrated ? (
              <div className="h-11 w-[166px] animate-pulse rounded-lg bg-gray-100" />
            ) : isAuthenticated ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="inline-flex h-11 items-center justify-center gap-1 rounded-lg border-2 border-brand bg-white px-3 text-base font-medium text-brand"
                >
                  <img src="/images/user.png" alt="" className="h-6 w-6" />
                  <span className="max-w-[9rem] truncate">{displayName}</span>
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="hidden text-sm text-ink-muted hover:text-red-600 sm:inline"
                >
                  خروج
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setLoginOpen(true)}
                  className="hidden h-11 w-[166px] items-center justify-center gap-1 rounded-lg border-2 border-brand bg-white text-lg font-medium text-brand sm:inline-flex"
                >
                  <img src="/images/user.png" alt="" className="h-6 w-6" />
                  <span>ورود | ثبت نام</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLoginOpen(true)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-brand sm:hidden"
                  aria-label="ورود | ثبت نام"
                >
                  <img src="/images/user.png" alt="" className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>

        {menuOpen ? (
          <nav className="border-t border-black/5 md:hidden">
            <div className="container-app flex flex-col py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-2 py-2.5 text-sm text-ink hover:bg-[#f4f4f4] hover:text-brand"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </header>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
