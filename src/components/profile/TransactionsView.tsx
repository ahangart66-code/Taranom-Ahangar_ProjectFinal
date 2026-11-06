'use client';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { LoginModal } from '@/components/auth/LoginModal';
import { useAuth } from '@/context/AuthContext';
import { formatDateTime } from '@/lib/dates';
import { getTransactions } from '@/services/user';
import { TransactionsSkeleton } from '@/components/ui/skeletons';

const TYPE_LABELS: Record<string, string> = {
  Purchase: 'خرید تور',
  purchase: 'خرید تور',
};

function transactionLabel(type: string) {
  return TYPE_LABELS[type] || type || 'تراکنش';
}

export function TransactionsView() {
  const { isAuthenticated, isHydrated } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  const transactionsQuery = useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
    enabled: isHydrated && isAuthenticated,
  });

  if (!isHydrated || (isAuthenticated && transactionsQuery.isLoading)) {
    return <TransactionsSkeleton />;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h1 className="mb-2 text-xl font-bold text-ink">تراکنش‌ها</h1>
        <p className="mb-4 text-sm text-ink-muted">برای دیدن تاریخچه پرداخت ابتدا وارد شوید.</p>
        <button type="button" className="btn-primary" onClick={() => setLoginOpen(true)}>
          ورود | ثبت نام
        </button>
        <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
      </div>
    );
  }

  if (transactionsQuery.isError) {
    return (
      <div>
        <h1 className="mb-2 text-xl font-bold text-ink">تراکنش‌ها</h1>
        <p className="mb-4 text-sm text-ink-muted">تاریخچه تراکنش‌ها الان در دسترس نیست.</p>
        <button
          type="button"
          className="btn-primary"
          onClick={() => void transactionsQuery.refetch()}
        >
          تلاش دوباره
        </button>
      </div>
    );
  }

  const transactions = [...(transactionsQuery.data || [])].sort(
    (left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
  );

  return (
    <div>
      <h1 className="text-xl font-bold text-ink">تراکنش‌ها</h1>
      <p className="mt-1 text-sm text-ink-muted">تاریخچه پرداخت‌های حساب شما.</p>

      {transactions.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-black/15 px-5 py-12 text-center">
          <p className="text-sm font-medium text-ink">تراکنشی ثبت نشده است</p>
        </div>
      ) : (
        <ul className="mt-6 divide-y divide-black/10 overflow-hidden rounded-2xl border border-black/10">
          {transactions.map((item) => (
            <li key={item.id} className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-ink">{transactionLabel(item.type)}</p>
                <p className="mt-1 text-xs text-ink-muted">{formatDateTime(item.createdAt)}</p>
              </div>
              <p className="text-sm text-black">
                <span className="ml-1 text-base font-medium text-[#009eca]">
                  {Number(item.amount || 0).toLocaleString('fa-IR')}
                </span>
                تومان
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
