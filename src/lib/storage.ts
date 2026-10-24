import { STORAGE_KEYS } from '@/lib/constants';
import type { AuthUser } from '@/types/auth';

const isBrowser = () => typeof window !== 'undefined';

export function getAccessToken(): string | null {
  if (!isBrowser()) return null;
  return (
    localStorage.getItem(STORAGE_KEYS.accessToken) ||
    getCookie(STORAGE_KEYS.accessToken)
  );
}

export function getRefreshToken(): string | null {
  if (!isBrowser()) return null;
  return (
    localStorage.getItem(STORAGE_KEYS.refreshToken) ||
    getCookie(STORAGE_KEYS.refreshToken)
  );
}

export function getStoredUser(): AuthUser | null {
  if (!isBrowser()) return null;
  const raw = localStorage.getItem(STORAGE_KEYS.user);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function saveAuthSession(payload: {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}) {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.accessToken, payload.accessToken);
  localStorage.setItem(STORAGE_KEYS.refreshToken, payload.refreshToken);
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(payload.user));
  setCookie(STORAGE_KEYS.accessToken, payload.accessToken, 1);
  setCookie(STORAGE_KEYS.refreshToken, payload.refreshToken, 7);
}

export function clearAuthSession() {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEYS.accessToken);
  localStorage.removeItem(STORAGE_KEYS.refreshToken);
  localStorage.removeItem(STORAGE_KEYS.user);
  deleteCookie(STORAGE_KEYS.accessToken);
  deleteCookie(STORAGE_KEYS.refreshToken);
}

function setCookie(name: string, value: string, days: number) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}
