export type AuthUser = {
  id: string | number;
  mobile: string;
  firstName?: string;
  lastName?: string;
  first_name?: string;
  last_name?: string;
};

export type SendOtpResponse = {
  message: string;
  code?: string;
};

export type CheckOtpResponse = {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
};

export type RefreshTokenResponse = {
  accessToken: string;
};

export function getUserDisplayName(user: AuthUser | null | undefined): string {
  if (!user) return '';
  const first = user.firstName || user.first_name || '';
  const last = user.lastName || user.last_name || '';
  const full = `${first} ${last}`.trim();
  return full || user.mobile;
}
