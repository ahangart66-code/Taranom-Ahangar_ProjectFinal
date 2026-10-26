'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import OtpInput from 'react18-input-otp';
import toast from 'react-hot-toast';
import { FormField } from '@/components/ui/FormField';
import { useAuth } from '@/context/AuthContext';
import { normalizeMobile, toEnglishDigits } from '@/lib/digits';
import { mobileSchema, type MobileFormValues } from '@/schemas/auth';

type LoginModalProps = {
  open: boolean;
  onClose: () => void;
  onAuthenticated?: () => void;
};

type Step = 'mobile' | 'otp';

export function LoginModal({ open, onClose, onAuthenticated }: LoginModalProps) {
  const { requestOtp, loginWithOtp } = useAuth();
  const [step, setStep] = useState<Step>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MobileFormValues>({
    resolver: yupResolver(mobileSchema),
    defaultValues: { mobile: '' },
  });

  useEffect(() => {
    if (!open) {
      setStep('mobile');
      setMobile('');
      setOtp('');
      setIsSubmitting(false);
      reset({ mobile: '' });
    }
  }, [open, reset]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const onSendOtp = handleSubmit(async (values) => {
    const normalized = normalizeMobile(values.mobile);
    try {
      setIsSubmitting(true);
      const res = await requestOtp(normalized);
      setMobile(normalized);
      setStep('otp');
      toast.success(res.message || 'کد تأیید ارسال شد');
      if (res.code) {
        toast(`کد تست: ${res.code}`, { icon: '🔑' });
      }
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || 'ارسال کد ناموفق بود';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  });

  const onVerifyOtp = async () => {
    const normalizedOtp = toEnglishDigits(otp).replace(/\D/g, '');
    if (!/^\d{5,6}$/.test(normalizedOtp)) {
      toast.error('کد تأیید باید ۵ یا ۶ رقم باشد');
      return;
    }

    try {
      setIsSubmitting(true);
      await loginWithOtp(mobile, normalizedOtp);
      toast.success('ورود با موفقیت انجام شد');
      onAuthenticated?.();
      onClose();
    } catch (error: unknown) {
      const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || 'کد وارد شده معتبر نیست';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-soft sm:p-6"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 id="login-modal-title" className="text-lg font-bold text-ink">
            {step === 'mobile' ? 'ورود به تورینو' : 'کد تأیید را وارد کنید'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-2 py-1 text-ink-muted hover:bg-gray-100"
            aria-label="بستن"
          >
            ✕
          </button>
        </div>

        {step === 'mobile' ? (
          <form onSubmit={onSendOtp} className="space-y-4">
            <FormField
              id="mobile"
              label="شماره موبایل"
              placeholder="09123456789"
              inputMode="numeric"
              autoComplete="tel"
              error={errors.mobile}
              {...register('mobile', {
                setValueAs: (value: string) => normalizeMobile(value ?? ''),
              })}
            />
            <button type="submit" className="btn-primary w-full" disabled={isSubmitting}>
              {isSubmitting ? 'در حال ارسال...' : 'ارسال کد تأیید'}
            </button>
          </form>
        ) : (
          <div className="space-y-5">
            <p className="text-sm text-ink-muted">
              کد ارسال‌شده به <span className="font-medium text-ink">{mobile}</span> را
              وارد کنید.
            </p>
            <div className="flex justify-center" dir="ltr">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                isInputNum
                shouldAutoFocus
                inputStyle={{
                  width: '2.5rem',
                  height: '2.75rem',
                  margin: '0 0.25rem',
                  fontSize: '1.1rem',
                  borderRadius: '0.75rem',
                  border: '1px solid #e5e7eb',
                }}
                focusStyle={{
                  border: '1px solid #28A745',
                  outline: 'none',
                }}
              />
            </div>
            <button
              type="button"
              className="btn-primary w-full"
              onClick={onVerifyOtp}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'در حال بررسی...' : 'تأیید و ورود'}
            </button>
            <button
              type="button"
              className="w-full text-sm text-brand hover:underline"
              onClick={() => {
                setStep('mobile');
                setOtp('');
              }}
            >
              ویرایش شماره موبایل
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
