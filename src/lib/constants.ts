export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:6500';

export const STORAGE_KEYS = {
  accessToken: 'torino_access_token',
  refreshToken: 'torino_refresh_token',
  user: 'torino_user',
} as const;
