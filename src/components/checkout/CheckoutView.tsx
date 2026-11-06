'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LoginModal } from '@/components/auth/LoginModal';
import { BirthDateField } from '@/components/ui/BirthDateField';
import { Field } from '@/components/ui/Field';
import { FormField } from '@/components/ui/FormField';
import { GenderSelect } from '@/components/ui/GenderSelect';
import { useAuth } from '@/context/AuthContext';
import { apiErrorMessage } from '@/lib/apiError';
import { cityLabel, fleetLabel } from '@/lib/cities';
import { formatTourDate, tourStayLabel } from '@/lib/dates';
import { tourImageSrc } from '@/lib/media';
import { CheckoutSkeleton } from '@/components/ui/skeletons';
import { checkoutSchema, type CheckoutFormValues } from '@/schemas/checkout';
import { getBasket } from '@/services/basket';
import { createOrder } from '@/services/order';
import type { OrderPayload } from '@/types/user';

export function CheckoutView() {
  const { isAuthenticated, isHydrated } = useAuth();
  const queryClient = useQueryClient();
  const [loginOpen, setLoginOpen] = useState(false);
  const [purchased, setPurchased] = useState(false);

  const basketQuery = useQuery({
    queryKey: ['basket'],
    queryFn: getBasket,
    enabled: isHydrated && isAuthenticated,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: yupResolver(checkoutSchema),
    defaultValues: {
      fullName: '',
      nationalCode: '',
      gender: '',
      birthDate: '',
    },
  });

  const orderMutation = useMutation({
    mutationFn: (payload: OrderPayload) => createOrder(payload),
    onSuccess: (result) => {
      setPurchased(true);
      toast.success(result.message || 'تور با موفقیت خریداری شد');
      void queryClient.invalidateQueries({ queryKey: ['basket'] });
      void queryClient.invalidateQueries({ queryKey: ['user-tours'] });
      void queryClient.invalidateQueries({ queryKey: ['transactions'] });
    },
    onError: (error) => {
      toast.error(apiErrorMessage(error, 'ثبت سفارش انجام نشد'));
    },
  });

  const onSubmit = handleSubmit((values) => {
    orderMutation.mutate({
      fullName: values.fullName,
      nationalCode: values.nationalCode,
      gender: values.gender as OrderPayload['gender'],
      birthDate: values.birthDate,
    });
  });

  if (!isHydrated || (isAuthenticated && basketQuery.isLoading)) {
    return <CheckoutSkeleton />;
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-[#f5f5f5] py-16">
        <div className="container-app text-center">
          <h1 className="mb-2 text-xl font-bold text-ink">تکمیل خرید</h1>
          <p className="mb-6 text-sm text-ink-muted">برای ادامه، ابتدا وارد حساب کاربری شوید.</p>
          <button type="button" className="btn-primary" onClick={() => setLoginOpen(true)}>
            ورود | ثبت نام
          </button>
          <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
        </div>
      </div>
    );
  }

  if (basketQuery.isError) {
    return (
      <div className="bg-[#f5f5f5] py-16">
        <div className="container-app text-center">
          <h1 className="mb-2 text-xl font-bold text-ink">اتصال به سرور برقرار نشد</h1>
          <p className="mb-6 text-sm text-ink-muted">سبد خرید الان در دسترس نیست.</p>
          <button type="button" className="btn-primary" onClick={() => void basketQuery.refetch()}>
            تلاش دوباره
          </button>
        </div>
      </div>
    );
  }

  if (purchased) {
    return (
      <div className="bg-[#f5f5f5] py-16">
        <div className="container-app text-center">
          <section className="mx-auto max-w-lg rounded-2xl bg-white px-6 py-10 shadow-[0_1px_6px_rgba(0,0,0,0.06)]">
            <h1 className="text-xl font-bold text-ink">تور با موفقیت خریداری شد</h1>
            <p className="mt-2 text-sm text-ink-muted">سفارش شما ثبت شد.</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link href="/profile/tours" className="btn-primary">
                تورهای من
              </Link>
              <Link href="/" className="text-sm text-brand">
                بازگشت به صفحه اصلی
              </Link>
            </div>
          </section>
        </div>
      </div>
    );
  }

  const tour = basketQuery.data;

  if (!tour) {
    return (
      <div className="bg-[#f5f5f5] py-16">
        <div className="container-app text-center">
          <h1 className="mb-2 text-xl font-bold text-ink">سبد خرید شما خالی است</h1>
          <p className="mb-6 text-sm text-ink-muted">برای خرید، ابتدا یک تور را رزرو کنید.</p>
          <Link href="/#tours" className="btn-primary">
            مشاهده تورها
          </Link>
        </div>
      </div>
    );
  }

  const soldOut = tour.availableSeats === 0;
  const image = tourImageSrc(tour.image);

  return (
    <div className="bg-[#f5f5f5] py-6 sm:py-8">
      <div className="container-app flex flex-col gap-4">
        <section className="rounded-2xl bg-white p-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)] sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="h-[160px] overflow-hidden rounded-xl bg-[#e7f2ec] sm:h-[140px] sm:w-[220px] sm:shrink-0">
              {image ? (
                <img src={image} alt={tour.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-brand">تورینو</div>
              )}
            </div>
            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-black">{tour.title}</h1>
              <p className="mt-1 text-sm text-ink">{tourStayLabel(tour.startDate, tour.endDate)}</p>
              <p className="mt-3 text-sm text-[#595959]">
                {cityLabel(tour.origin?.name)} به {cityLabel(tour.destination?.name)}
              </p>
              <p className="mt-1 text-sm text-[#595959]">
                {formatTourDate(tour.startDate)} تا {formatTourDate(tour.endDate)} ·{' '}
                {fleetLabel(tour.fleetVehicle)}
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)] sm:p-5">
          <h2 className="text-lg font-bold text-ink">مشخصات مسافر</h2>
          <form className="mt-5" onSubmit={onSubmit}>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <FormField
                id="fullName"
                label="نام و نام خانوادگی"
                placeholder="نام و نام خانوادگی"
                autoComplete="name"
                error={errors.fullName}
                {...register('fullName')}
              />
              <FormField
                id="nationalCode"
                label="کد ملی"
                placeholder="کد ملی"
                inputMode="numeric"
                dir="ltr"
                autoComplete="off"
                error={errors.nationalCode}
                {...register('nationalCode')}
              />
              <Field label="جنسیت" htmlFor="gender" error={errors.gender?.message}>
                <GenderSelect id="gender" {...register('gender')} />
              </Field>
              <Field label="تاریخ تولد" htmlFor="birthDate" error={errors.birthDate?.message}>
                <Controller
                  name="birthDate"
                  control={control}
                  render={({ field }) => (
                    <BirthDateField id="birthDate" value={field.value} onChange={field.onChange} />
                  )}
                />
              </Field>
            </div>

            <div className="mt-8 flex flex-col gap-4 border-t border-black/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-black">
                <span className="ml-1 text-[22px] font-medium text-[#009eca]">
                  {tour.price.toLocaleString('fa-IR')}
                </span>
                تومان
              </p>
              <button
                type="submit"
                disabled={soldOut || orderMutation.isPending}
                className="inline-flex h-11 min-w-[168px] items-center justify-center rounded-[10px] bg-brand px-6 text-[15px] font-medium text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {soldOut ? 'تکمیل ظرفیت' : orderMutation.isPending ? 'در حال ثبت...' : 'ثبت و خرید نهایی'}
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
