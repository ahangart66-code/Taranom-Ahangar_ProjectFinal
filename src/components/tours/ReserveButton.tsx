'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { LoginModal } from '@/components/auth/LoginModal';
import { useAuth } from '@/context/AuthContext';
import { apiErrorMessage } from '@/lib/apiError';
import { addToBasket } from '@/services/basket';

type ReserveButtonProps = {
  tourId: string;
  availableSeats?: number;
};

export function ReserveButton({ tourId, availableSeats }: ReserveButtonProps) {
  const router = useRouter();
  const { isAuthenticated, isHydrated } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const soldOut = availableSeats === 0;

  const placeInBasket = async () => {
    setBusy(true);
    try {
      const result = await addToBasket(tourId);
      toast.success(result.message || 'تور به سبد خرید اضافه شد');
      router.push('/checkout');
    } catch (error) {
      const status = (error as { response?: { status?: number } })?.response?.status;
      if (status === 401 || status === 403) {
        setLoginOpen(true);
        return;
      }
      toast.error(apiErrorMessage(error, 'افزودن تور به سبد خرید انجام نشد'));
    } finally {
      setBusy(false);
    }
  };

  const onReserve = () => {
    if (soldOut || busy) return;
    if (!isHydrated) return;
    if (!isAuthenticated) {
      setLoginOpen(true);
      return;
    }
    void placeInBasket();
  };

  return (
    <>
      <button
        type="button"
        onClick={onReserve}
        disabled={soldOut || busy}
        className="inline-flex h-11 min-w-[148px] items-center justify-center rounded-[10px] bg-brand px-6 text-[15px] font-medium text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {soldOut ? 'تکمیل ظرفیت' : busy ? 'در حال ثبت...' : 'رزرو و خرید'}
      </button>
      <LoginModal
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onAuthenticated={() => {
          void placeInBasket();
        }}
      />
    </>
  );
}
