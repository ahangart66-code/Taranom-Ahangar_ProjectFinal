import axios from 'axios';
import { API_URL, STORAGE_KEYS } from '@/lib/constants';
import {
  clearAuthSession,
  getAccessToken,
  getRefreshToken,
  saveAuthSession,
  getStoredUser,
} from '@/lib/storage';
import type { RefreshTokenResponse } from '@/types/auth';

export const http = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const { data } = await axios.post<RefreshTokenResponse>(
      `${API_URL}/auth/refresh-token`,
      { refreshToken },
    );
    const user = getStoredUser();
    if (user) {
      saveAuthSession({
        accessToken: data.accessToken,
        refreshToken,
        user,
      });
    } else if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.accessToken, data.accessToken);
    }
    return data.accessToken;
  } catch {
    clearAuthSession();
    return null;
  }
}

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    if (!original || original._retry) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 || error.response?.status === 403) {
      original._retry = true;
      refreshPromise = refreshPromise ?? refreshAccessToken();
      const newToken = await refreshPromise;
      refreshPromise = null;

      if (newToken) {
        original.headers.Authorization = `Bearer ${newToken}`;
        return http(original);
      }
    }

    return Promise.reject(error);
  },
);
