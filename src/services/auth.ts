import { http } from '@/services/http';
import type { CheckOtpResponse, SendOtpResponse } from '@/types/auth';

export async function sendOtp(mobile: string) {
  const { data } = await http.post<SendOtpResponse>('/auth/send-otp', { mobile });
  return data;
}

export async function checkOtp(mobile: string, code: string) {
  const { data } = await http.post<CheckOtpResponse>('/auth/check-otp', {
    mobile,
    code,
  });
  return data;
}
