'use client';

import { useAuth } from '@/context/AuthContext';
import { getUserDisplayName } from '@/types/auth';

export default function ProfilePage() {
  const { user, isHydrated, isAuthenticated } = useAuth();

  if (!isHydrated) {
    return <div className="h-40 animate-pulse rounded-xl bg-gray-100" />;
  }

  if (!isAuthenticated) {
    return (
      <div>
        <h1 className="mb-2 text-xl font-bold text-ink">پروفایل</h1>
        <p className="text-sm text-ink-muted">برای مشاهده پروفایل ابتدا وارد شوید.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-ink">پروفایل</h1>
      <dl className="space-y-3 text-sm">
        <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
          <dt className="text-ink-muted">نام</dt>
          <dd className="font-medium text-ink">{getUserDisplayName(user)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-b border-gray-100 pb-3">
          <dt className="text-ink-muted">موبایل</dt>
          <dd className="font-medium text-ink" dir="ltr">
            {user?.mobile}
          </dd>
        </div>
      </dl>
    </div>
  );
}
