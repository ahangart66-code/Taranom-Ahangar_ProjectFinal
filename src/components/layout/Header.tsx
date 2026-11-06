'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { LoginModal } from '@/components/auth/LoginModal';
import { useAuth } from '@/context/AuthContext';
import { toPersianDigits } from '@/lib/digits';
import { AccountChipSkeleton } from '@/components/ui/skeletons';
import { getUserDisplayName } from '@/types/auth';

const navItems = [
  { href: '/', label: 'صفحه اصلی' },
  { href: '/#tours', label: 'خدمات گردشگری' },
  { href: '/about', label: 'درباره ما' },
  { href: '/contact', label: 'تماس با ما' },
];

const accountLinks = [
  { href: '/profile', label: 'پروفایل' },
  { href: '/profile/tours', label: 'تورهای من' },
  { href: '/profile/transactions', label: 'تراکنش‌ها' },
];

export function Header() {
  const pathname = usePathname();
  const { user, isHydrated, logout, isAuthenticated } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const accountButtonRef = useRef<HTMLButtonElement>(null);
  const accountMenuId = useId();

  const displayName = getUserDisplayName(user);

  useEffect(() => {
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!accountOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!accountRef.current?.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAccountOpen(false);
        accountButtonRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [accountOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
        <div className="container-app flex items-center justify-between py-[15px]">
          <div className="flex items-center">
            <button
              type="button"
              className="me-3 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 lg:hidden"
              onClick={() => {
                setAccountOpen(false);
                setMenuOpen((prev) => !prev);
              }}
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
              <AccountChipSkeleton />
            ) : isAuthenticated ? (
              <div className="flex h-11 items-center gap-3" dir="ltr">
                <div className="relative flex" ref={accountRef}>
                  <button
                    ref={accountButtonRef}
                    type="button"
                    className="inline-flex h-6 w-6 items-center justify-center"
                    aria-label={displayName ? `منوی ${displayName}` : 'حساب کاربری'}
                    aria-haspopup="menu"
                    aria-expanded={accountOpen}
                    aria-controls={accountMenuId}
                    onClick={() => {
                      setMenuOpen(false);
                      setAccountOpen((prev) => !prev);
                    }}
                  >
                    <img src="/images/menu-icon.png" alt="" className="h-6 w-6" />
                  </button>

                  {accountOpen ? (
                    <div
                      id={accountMenuId}
                      role="menu"
                      dir="rtl"
                      aria-label="حساب کاربری"
                      className="absolute left-0 top-[calc(100%+8px)] z-50 w-52 overflow-hidden rounded-xl border border-black/5 bg-white py-1 text-start shadow-[0_8px_24px_rgba(40,40,40,0.12)]"
                    >
                    {accountLinks.map((item) => {
                      const active = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          className={`block px-4 py-2.5 text-sm transition hover:bg-brand-light hover:text-brand ${
                            active ? 'bg-brand-light font-medium text-brand' : 'text-ink'
                          }`}
                          onClick={() => setAccountOpen(false)}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                    <button
                      type="button"
                      role="menuitem"
                      className="block w-full border-t border-black/5 px-4 py-2.5 text-start text-sm text-ink transition hover:bg-red-50 hover:text-red-600"
                      onClick={() => {
                        setAccountOpen(false);
                        logout();
                      }}
                    >
                      خروج
                    </button>
                    </div>
                  ) : null}
                </div>
                <span dir="ltr" className="text-base text-brand">
                  {toPersianDigits(user?.mobile || displayName)}
                </span>
                <img src="/images/user.png" alt="" className="h-6 w-6" />
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
          <nav className="border-t border-black/5 lg:hidden">
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
              {isAuthenticated
                ? accountLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-lg px-2 py-2.5 text-sm text-ink hover:bg-[#f4f4f4] hover:text-brand"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))
                : null}
            </div>
          </nav>
        ) : null}
      </header>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
