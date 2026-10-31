import * as yup from 'yup';
import { parseIsoDate } from '@/lib/dates';
import { toEnglishDigits } from '@/lib/digits';

function digitsOnly(value: unknown) {
  return toEnglishDigits(String(value ?? '')).replace(/\D/g, '');
}

export const checkoutSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required('نام و نام خانوادگی الزامی است')
    .min(3, 'نام و نام خانوادگی را کامل وارد کنید'),
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
});

export type CheckoutFormValues = yup.InferType<typeof checkoutSchema>;
