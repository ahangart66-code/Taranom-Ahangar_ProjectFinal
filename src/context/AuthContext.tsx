'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { checkOtp, sendOtp } from '@/services/auth';
import {
  clearAuthSession,
  getAccessToken,
  getRefreshToken,
  getStoredUser,
  saveAuthSession,
} from '@/lib/storage';
import type { AuthUser } from '@/types/auth';

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isHydrated: boolean;
  loginWithOtp: (mobile: string, code: string) => Promise<void>;
  requestOtp: (mobile: string) => Promise<{ message: string; code?: string }>;
  logout: () => void;
  updateUser: (user: AuthUser) => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const token = getAccessToken();
    const storedUser = getStoredUser();
    if (token && storedUser) {
      setUser(storedUser);
    }
    setIsHydrated(true);
  }, []);

  const requestOtp = useCallback(async (mobile: string) => {
    return sendOtp(mobile);
  }, []);

  const loginWithOtp = useCallback(async (mobile: string, code: string) => {
    const data = await checkOtp(mobile, code);
    saveAuthSession({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      user: data.user,
    });
    setUser(data.user);
  }, []);

  const logout = useCallback(() => {
    clearAuthSession();
    setUser(null);
  }, []);

  const updateUser = useCallback((next: AuthUser) => {
    setUser(next);
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    if (!accessToken || !refreshToken) return;
    saveAuthSession({ accessToken, refreshToken, user: next });
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isHydrated,
      loginWithOtp,
      requestOtp,
      logout,
      updateUser,
    }),
    [user, isHydrated, loginWithOtp, requestOtp, logout, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
