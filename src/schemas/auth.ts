import * as yup from 'yup';
import { normalizeMobile, toEnglishDigits } from '@/lib/digits';

export const mobileSchema = yup.object({
  mobile: yup
    .string()
    .transform((value) => (typeof value === 'string' ? normalizeMobile(value) : value))
    .required('شماره موبایل الزامی است')
    .matches(/^09\d{9}$/, 'شماره موبایل معتبر نیست (مثال: 09123456789)'),
});

export type MobileFormValues = yup.InferType<typeof mobileSchema>;

export const otpSchema = yup.object({
  code: yup
    .string()
    .transform((value) => (typeof value === 'string' ? toEnglishDigits(value) : value))
    .required('کد تأیید الزامی است')
    .matches(/^\d{5,6}$/, 'کد تأیید باید ۵ یا ۶ رقم باشد'),
});

export type OtpFormValues = yup.InferType<typeof otpSchema>;
