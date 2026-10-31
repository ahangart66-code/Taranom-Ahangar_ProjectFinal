'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LoginModal } from '@/components/auth/LoginModal';
import { BirthDateField } from '@/components/ui/BirthDateField';
import { Field } from '@/components/ui/Field';
import { FormField } from '@/components/ui/FormField';
import { GenderSelect } from '@/components/ui/GenderSelect';
import { useAuth } from '@/context/AuthContext';
import { apiErrorMessage } from '@/lib/apiError';
import { profileSchema, type ProfileFormValues } from '@/schemas/profile';
import { getProfile, updateProfile } from '@/services/user';
import type { AuthUser } from '@/types/auth';
import type { UpdateProfilePayload, UserProfile } from '@/types/user';

const emptyProfile: ProfileFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  nationalCode: '',
  gender: '',
  birthDate: '',
  shaba: '',
  debitCard: '',
  accountIdentifier: '',
};

function toFormValues(profile: UserProfile): ProfileFormValues {
  const gender = profile.gender === 'male' || profile.gender === 'female' ? profile.gender : '';
  return {
    firstName: profile.firstName || profile.first_name || '',
    lastName: profile.lastName || profile.last_name || '',
    email: profile.email || '',
    nationalCode: profile.nationalCode != null ? String(profile.nationalCode) : '',
    gender,
    birthDate: profile.birthDate ? profile.birthDate.slice(0, 10) : '',
    shaba: profile.payment?.shaba_code || '',
    debitCard: profile.payment?.debitCard_code || '',
    accountIdentifier: profile.payment?.accountIdentifier || '',
  };
}

function toAuthUser(current: AuthUser | null, profile: UserProfile): AuthUser {
  return {
    id: profile.id ?? current?.id ?? '',
    mobile: profile.mobile || current?.mobile || '',
    email: profile.email,
    firstName: profile.firstName,
    lastName: profile.lastName,
    gender: profile.gender,
    birthDate: profile.birthDate,
    nationalCode: profile.nationalCode,
    payment: profile.payment,
  };
}

export function ProfileView() {
  const { user, isAuthenticated, isHydrated, updateUser } = useAuth();
  const queryClient = useQueryClient();
  const [loginOpen, setLoginOpen] = useState(false);

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: isHydrated && isAuthenticated,
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: yupResolver(profileSchema),
    defaultValues: emptyProfile,
  });

  useEffect(() => {
    if (profileQuery.data) {
      reset(toFormValues(profileQuery.data));
    }
  }, [profileQuery.data, reset]);

  const saveMutation = useMutation({
    mutationFn: (payload: UpdateProfilePayload) => updateProfile(payload),
    onSuccess: (result, payload) => {
      const nextProfile: UserProfile = result.user || {
        id: user?.id || '',
        mobile: payload.mobile,
        email: payload.email,
        firstName: payload.firstName,
        lastName: payload.lastName,
        gender: payload.gender,
        birthDate: payload.birthDate,
        nationalCode: payload.nationalCode,
        payment: payload.payment,
      };
      updateUser(toAuthUser(user, nextProfile));
      queryClient.setQueryData(['profile'], nextProfile);
      toast.success(result.message || 'تغییرات پروفایل با موفقیت ذخیره شد');
    },
    onError: (error) => {
      toast.error(apiErrorMessage(error, 'ذخیره پروفایل انجام نشد'));
    },
  });

  const onSubmit = handleSubmit((values) => {
    if (!user?.mobile) return;
    saveMutation.mutate({
      mobile: user.mobile,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender as UpdateProfilePayload['gender'],
      birthDate: values.birthDate,
      nationalCode: values.nationalCode,
      payment: {
        shaba_code: values.shaba,
        debitCard_code: values.debitCard,
        accountIdentifier: values.accountIdentifier,
      },
    });
  });

  if (!isHydrated || (isAuthenticated && profileQuery.isLoading)) {
    return <div className="h-64 animate-pulse rounded-xl bg-gray-100" />;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h1 className="mb-2 text-xl font-bold text-ink">پروفایل</h1>
        <p className="mb-4 text-sm text-ink-muted">برای مشاهده و ویرایش پروفایل ابتدا وارد شوید.</p>
        <button type="button" className="btn-primary" onClick={() => setLoginOpen(true)}>
          ورود | ثبت نام
        </button>
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      </div>
    );
  }

  if (profileQuery.isError) {
    return (
      <div>
        <h1 className="mb-2 text-xl font-bold text-ink">پروفایل</h1>
        <p className="mb-4 text-sm text-ink-muted">اطلاعات حساب الان در دسترس نیست.</p>
        <button type="button" className="btn-primary" onClick={() => void profileQuery.refetch()}>
          تلاش دوباره
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      <div>
        <h1 className="text-xl font-bold text-ink">اطلاعات حساب کاربری</h1>
        <p className="mt-1 text-sm text-ink-muted">اطلاعات شخصی و حساب بانکی را تکمیل کنید.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-ink">اطلاعات شخصی</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            id="firstName"
            label="نام"
            placeholder="نام"
            autoComplete="given-name"
            error={errors.firstName}
            {...register('firstName')}
          />
          <FormField
            id="lastName"
            label="نام خانوادگی"
            placeholder="نام خانوادگی"
            autoComplete="family-name"
            error={errors.lastName}
            {...register('lastName')}
          />
          <FormField
            id="mobile"
            label="شماره موبایل"
            value={user?.mobile || ''}
            dir="ltr"
            readOnly
            disabled
          />
          <FormField
            id="email"
            label="ایمیل"
            placeholder="example@email.com"
            dir="ltr"
            autoComplete="email"
            error={errors.email}
            {...register('email')}
          />
          <FormField
            id="profile-nationalCode"
            label="کد ملی"
            placeholder="کد ملی"
            inputMode="numeric"
            dir="ltr"
            autoComplete="off"
            error={errors.nationalCode}
            {...register('nationalCode')}
          />
          <Field label="جنسیت" htmlFor="profile-gender" error={errors.gender?.message}>
            <GenderSelect id="profile-gender" {...register('gender')} />
          </Field>
          <Field label="تاریخ تولد" htmlFor="profile-birthDate" error={errors.birthDate?.message}>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <BirthDateField
                  id="profile-birthDate"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </Field>
        </div>
      </section>

      <section className="space-y-4 border-t border-black/10 pt-6">
        <h2 className="text-base font-semibold text-ink">اطلاعات حساب بانکی</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <FormField
              id="shaba"
              label="شماره شبا"
              placeholder="IR و ۲۴ رقم"
              dir="ltr"
              autoComplete="off"
              error={errors.shaba}
              {...register('shaba')}
            />
          </div>
          <FormField
            id="debitCard"
            label="شماره کارت"
            placeholder="۱۶ رقم"
            inputMode="numeric"
            dir="ltr"
            autoComplete="off"
            error={errors.debitCard}
            {...register('debitCard')}
          />
          <FormField
            id="accountIdentifier"
            label="شماره حساب"
            placeholder="شماره حساب"
            inputMode="numeric"
            dir="ltr"
            autoComplete="off"
            error={errors.accountIdentifier}
            {...register('accountIdentifier')}
          />
        </div>
      </section>

      <button type="submit" className="btn-primary h-11 px-8" disabled={saveMutation.isPending}>
        {saveMutation.isPending ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
      </button>
    </form>
  );
}
