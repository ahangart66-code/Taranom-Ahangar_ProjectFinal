import * as yup from 'yup';
import { parseIsoDate } from '@/lib/dates';
import { toEnglishDigits } from '@/lib/digits';

function digitsOnly(value: unknown) {
  return toEnglishDigits(String(value ?? '')).replace(/\D/g, '');
}

function normalizeShaba(value: unknown) {
  const raw = toEnglishDigits(String(value ?? ''))
    .replace(/\s/g, '')
    .toUpperCase();
  if (/^\d{24}$/.test(raw)) return `IR${raw}`;
  return raw;
}

export const profileSchema = yup.object({
  firstName: yup.string().trim().required('نام الزامی است').min(2, 'نام را کامل وارد کنید'),
  lastName: yup
    .string()
    .trim()
    .required('نام خانوادگی الزامی است')
    .min(2, 'نام خانوادگی را کامل وارد کنید'),
  email: yup.string().trim().required('ایمیل الزامی است').email('ایمیل معتبر نیست'),
  nationalCode: yup
    .string()
    .transform((value) => digitsOnly(value))
    .required('کد ملی الزامی است')
    .matches(/^\d{10}$/, 'کد ملی باید ۱۰ رقم باشد'),
  gender: yup
    .string()
    .required('جنسیت را انتخاب کنید')
    .test('gender', 'جنسیت را انتخاب کنید', (value) => value === 'male' || value === 'female'),
  birthDate: yup
    .string()
    .required('تاریخ تولد الزامی است')
    .test('past-date', 'تاریخ تولد معتبر نیست', (value) => {
      const date = parseIsoDate(value);
      return Boolean(date) && date!.getTime() <= Date.now();
    }),
  shaba: yup
    .string()
    .transform((value) => normalizeShaba(value))
    .required('شماره شبا الزامی است')
    .matches(/^IR\d{24}$/, 'شماره شبا باید با IR و ۲۴ رقم باشد'),
  debitCard: yup
    .string()
    .transform((value) => digitsOnly(value))
    .required('شماره کارت الزامی است')
    .matches(/^\d{16}$/, 'شماره کارت باید ۱۶ رقم باشد'),
  accountIdentifier: yup
    .string()
    .transform((value) => digitsOnly(value))
    .required('شماره حساب الزامی است')
    .matches(/^\d{6,20}$/, 'شماره حساب معتبر نیست'),
});

export type ProfileFormValues = yup.InferType<typeof profileSchema>;
