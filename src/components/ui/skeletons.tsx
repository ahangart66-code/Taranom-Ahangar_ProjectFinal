function Bone({
  className,
  tone = 'text',
}: {
  className: string;
  tone?: 'text' | 'media' | 'action' | 'field';
}) {
  return <div className={`torino-bone torino-bone-${tone} ${className}`} />;
}

export function TourCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-[10px] border border-black/[0.12] bg-white shadow-[0_0_2px_rgba(0,0,0,0.25)]"
      aria-hidden
    >
      <Bone tone="media" className="h-[159px] rounded-none" />
      <div className="space-y-2 border-b border-black/[0.12] px-2 py-3">
        <Bone className="h-6 w-3/4 rounded-md" />
        <Bone className="h-4 w-1/2 rounded-md" />
      </div>
      <div className="flex items-center justify-between px-2 py-3">
        <Bone tone="action" className="h-[25px] w-16 rounded" />
        <Bone className="h-5 w-24 rounded-md" />
      </div>
    </div>
  );
}

export function TourListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-x-[25px] gap-y-[30px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-busy="true"
      aria-label="در حال دریافت تورها"
    >
      {Array.from({ length: count }, (_, index) => (
        <TourCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div aria-busy="true" aria-label="در حال بارگذاری صفحه اصلی">
      <Bone tone="media" className="h-44 w-full rounded-none sm:h-64 lg:h-80" />
      <section className="container-app pb-4">
        <div className="mx-auto mt-6 flex max-w-xl flex-col items-center gap-2">
          <Bone className="h-4 w-24 rounded-md" />
          <Bone className="h-6 w-full max-w-md rounded-md" />
        </div>
        <div className="mx-auto mt-6 flex w-full max-w-[874px] flex-col gap-3 rounded-[20px] border border-black/15 bg-white p-3 lg:h-[71px] lg:flex-row lg:items-center lg:p-2">
          <Bone tone="field" className="h-12 flex-1 rounded-xl lg:rounded-none lg:border-0 lg:border-l" />
          <Bone tone="field" className="h-12 flex-1 rounded-xl lg:rounded-none lg:border-0 lg:border-l" />
          <Bone tone="field" className="h-12 flex-1 rounded-xl lg:rounded-none lg:border-0" />
          <Bone tone="action" className="h-12 w-full rounded-2xl lg:h-[51px] lg:w-[190px]" />
        </div>
      </section>
      <section className="container-app pb-4 pt-2">
        <Bone className="mb-3 h-8 w-36 rounded-md" />
        <TourListSkeleton />
      </section>
    </div>
  );
}

export function TourDetailsSkeleton() {
  return (
    <div className="bg-[#f5f5f5] py-6 sm:py-8" aria-busy="true" aria-label="در حال دریافت جزئیات تور">
      <div className="container-app flex flex-col gap-4">
        <section className="rounded-2xl bg-white p-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)] sm:p-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
            <Bone
              tone="media"
              className="h-[210px] rounded-xl sm:h-[230px] lg:h-[240px] lg:w-[397px] lg:shrink-0"
            />
            <div className="flex min-w-0 flex-1 flex-col">
              <Bone className="h-8 w-48 rounded-md" />
              <Bone className="mt-2 h-5 w-32 rounded-md" />
              <div className="mt-6 flex flex-wrap gap-3">
                <Bone className="h-5 w-28 rounded-md" />
                <Bone className="h-5 w-24 rounded-md" />
                <Bone className="h-5 w-28 rounded-md" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <Bone tone="media" className="h-7 w-24 rounded-full" />
                <Bone tone="media" className="h-7 w-32 rounded-full" />
                <Bone tone="media" className="h-7 w-28 rounded-full" />
              </div>
              <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Bone className="h-7 w-32 rounded-md" />
                <Bone tone="action" className="h-11 w-[148px] rounded-[10px]" />
              </div>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-2 overflow-hidden rounded-2xl bg-white sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-2 border-black/10 px-2 py-5 lg:border-l lg:last:border-l-0"
            >
              <Bone className="h-4 w-16 rounded-md" />
              <Bone className="h-4 w-20 rounded-md" />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export function CheckoutSkeleton() {
  return (
    <div className="bg-[#f5f5f5] py-6 sm:py-8" aria-busy="true" aria-label="در حال باز کردن سبد خرید">
      <div className="container-app flex flex-col gap-4">
        <p className="text-sm text-ink-muted">در حال باز کردن سبد خرید</p>
        <section className="rounded-2xl bg-white p-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)] sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Bone tone="media" className="h-[160px] rounded-xl sm:h-[140px] sm:w-[220px] sm:shrink-0" />
            <div className="flex flex-1 flex-col gap-2">
              <Bone className="h-7 w-40 rounded-md" />
              <Bone className="h-4 w-28 rounded-md" />
              <Bone className="h-4 w-56 rounded-md" />
              <Bone tone="field" className="mt-2 h-11 w-40 rounded-[10px] border-brand/40" />
            </div>
          </div>
        </section>
        <section className="rounded-2xl bg-white p-4 shadow-[0_1px_6px_rgba(0,0,0,0.06)] sm:p-5">
          <Bone className="h-6 w-32 rounded-md" />
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="space-y-2">
                <Bone className="h-4 w-24 rounded-md" />
                <Bone tone="field" className="h-12 w-full rounded-xl" />
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t border-black/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <Bone className="h-7 w-32 rounded-md" />
            <Bone tone="action" className="h-11 w-full rounded-[10px] sm:w-[168px]" />
          </div>
        </section>
      </div>
    </div>
  );
}

export function ProfileFormSkeleton() {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="در حال دریافت پروفایل">
      <div className="space-y-2">
        <Bone className="h-7 w-48 rounded-md" />
        <Bone className="h-4 w-64 rounded-md" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="space-y-2">
            <Bone className="h-4 w-24 rounded-md" />
            <Bone tone="field" className="h-12 w-full rounded-xl" />
          </div>
        ))}
      </div>
      <div className="space-y-4 border-t border-black/10 pt-6">
        <Bone className="h-6 w-40 rounded-md" />
        <Bone tone="field" className="h-12 w-full rounded-xl" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Bone tone="field" className="h-12 w-full rounded-xl" />
          <Bone tone="field" className="h-12 w-full rounded-xl" />
        </div>
      </div>
      <Bone tone="action" className="h-11 w-36 rounded-xl" />
    </div>
  );
}

export function MyToursSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="در حال دریافت تورهای من">
      <div className="space-y-2">
        <Bone className="h-7 w-32 rounded-md" />
        <Bone className="h-4 w-40 rounded-md" />
      </div>
      {Array.from({ length: 2 }, (_, index) => (
        <div key={index} className="overflow-hidden rounded-2xl border border-black/10 bg-white sm:flex">
          <Bone tone="media" className="h-40 rounded-none sm:h-auto sm:w-40 sm:shrink-0" />
          <div className="flex flex-1 flex-col gap-3 p-4">
            <div className="flex items-start justify-between gap-3">
              <Bone className="h-6 w-40 rounded-md" />
              <Bone tone="media" className="h-6 w-24 rounded-full" />
            </div>
            <Bone className="h-4 w-48 rounded-md" />
            <Bone className="h-4 w-56 rounded-md" />
            <div className="mt-auto flex items-center justify-between pt-2">
              <Bone className="h-5 w-24 rounded-md" />
              <Bone tone="action" className="h-9 w-28 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TransactionsSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="در حال دریافت تراکنش‌ها">
      <div className="space-y-2">
        <Bone className="h-7 w-28 rounded-md" />
        <Bone className="h-4 w-48 rounded-md" />
      </div>
      <div className="divide-y divide-black/10 overflow-hidden rounded-2xl border border-black/10 bg-white">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex items-center justify-between gap-3 px-4 py-4">
            <div className="space-y-2">
              <Bone className="h-4 w-24 rounded-md" />
              <Bone className="h-3 w-32 rounded-md" />
            </div>
            <Bone className="h-5 w-24 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AccountChipSkeleton() {
  return (
    <div className="flex h-11 items-center gap-2" aria-hidden>
      <Bone tone="media" className="h-6 w-6 rounded-full" />
      <Bone className="h-4 w-24 rounded-md" />
    </div>
  );
}

export function LoginStepSkeleton({ step }: { step: 'mobile' | 'otp' }) {
  if (step === 'otp') {
    return (
      <div className="space-y-5" aria-busy="true" aria-label="در حال بررسی کد">
        <Bone className="mx-auto h-4 w-48 rounded-md" />
        <div className="flex justify-center gap-2" dir="ltr">
          {Array.from({ length: 6 }, (_, index) => (
            <Bone key={index} tone="field" className="h-11 w-10 rounded-xl" />
          ))}
        </div>
        <Bone tone="action" className="h-11 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-4" aria-busy="true" aria-label="در حال ارسال کد">
      <div className="space-y-2">
        <Bone className="h-4 w-24 rounded-md" />
        <Bone tone="field" className="h-12 w-full rounded-xl" />
      </div>
      <Bone tone="action" className="h-11 w-full rounded-xl" />
    </div>
  );
}
