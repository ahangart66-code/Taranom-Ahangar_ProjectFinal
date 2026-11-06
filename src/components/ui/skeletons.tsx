function Bone({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-lg bg-gray-200 ${className}`} />;
}

export function TourCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[10px] border border-black/[0.12] bg-white" aria-hidden>
      <Bone className="h-[159px] rounded-none" />
      <div className="space-y-2 border-b border-black/[0.12] px-2 py-3">
        <Bone className="h-6 w-3/4" />
        <Bone className="h-4 w-1/2" />
      </div>
      <div className="flex items-center justify-between px-2 py-3">
        <Bone className="h-[25px] w-16" />
        <Bone className="h-5 w-24" />
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
      <section className="container-app pt-6">
        <Bone className="h-40 w-full rounded-2xl sm:h-56" />
        <Bone className="mx-auto mt-6 h-8 w-2/3 max-w-md" />
        <Bone className="mx-auto mt-4 h-[71px] w-full max-w-[874px] rounded-[20px]" />
      </section>
      <section className="container-app pb-4 pt-8">
        <Bone className="mb-4 h-8 w-40" />
        <TourListSkeleton />
      </section>
    </div>
  );
}

export function TourDetailsSkeleton() {
  return (
    <div className="bg-[#f5f5f5] py-6 sm:py-8" aria-busy="true" aria-label="در حال دریافت جزئیات تور">
      <div className="container-app flex flex-col gap-4">
        <section className="rounded-2xl bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-5 lg:flex-row">
            <Bone className="h-[210px] rounded-xl sm:h-[230px] lg:h-[240px] lg:w-[397px] lg:shrink-0" />
            <div className="flex flex-1 flex-col gap-3">
              <Bone className="h-8 w-48" />
              <Bone className="h-5 w-32" />
              <div className="mt-4 flex flex-wrap gap-3">
                <Bone className="h-5 w-28" />
                <Bone className="h-5 w-24" />
                <Bone className="h-5 w-28" />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Bone className="h-7 w-24 rounded-full" />
                <Bone className="h-7 w-32 rounded-full" />
                <Bone className="h-7 w-28 rounded-full" />
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Bone className="h-7 w-32" />
                <Bone className="h-11 w-[148px] rounded-[10px]" />
              </div>
            </div>
          </div>
        </section>
        <section className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="flex flex-col items-center gap-2 px-2 py-5">
              <Bone className="h-4 w-16" />
              <Bone className="h-4 w-20" />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export function CheckoutSkeleton() {
  return (
    <div className="bg-[#f5f5f5] py-6 sm:py-8" aria-busy="true" aria-label="در حال دریافت سبد خرید">
      <div className="container-app flex flex-col gap-4">
        <section className="rounded-2xl bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Bone className="h-[160px] rounded-xl sm:h-[140px] sm:w-[220px] sm:shrink-0" />
            <div className="flex flex-1 flex-col gap-2">
              <Bone className="h-7 w-40" />
              <Bone className="h-4 w-28" />
              <Bone className="h-4 w-48" />
            </div>
          </div>
        </section>
        <section className="rounded-2xl bg-white p-4 sm:p-5">
          <Bone className="h-6 w-32" />
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="space-y-2">
                <Bone className="h-4 w-24" />
                <Bone className="h-12 w-full rounded-xl" />
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t border-black/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <Bone className="h-7 w-32" />
            <Bone className="h-11 w-[168px] rounded-[10px]" />
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
        <Bone className="h-7 w-48" />
        <Bone className="h-4 w-64" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="space-y-2">
            <Bone className="h-4 w-24" />
            <Bone className="h-12 w-full rounded-xl" />
          </div>
        ))}
      </div>
      <div className="space-y-4 border-t border-black/10 pt-6">
        <Bone className="h-6 w-40" />
        <Bone className="h-12 w-full rounded-xl" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Bone className="h-12 w-full rounded-xl" />
          <Bone className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export function MyToursSkeleton() {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="در حال دریافت تورهای من">
      <div className="space-y-2">
        <Bone className="h-7 w-32" />
        <Bone className="h-4 w-40" />
      </div>
      {Array.from({ length: 2 }, (_, index) => (
        <div key={index} className="overflow-hidden rounded-2xl border border-black/10 bg-white sm:flex">
          <Bone className="h-40 rounded-none sm:h-auto sm:w-40 sm:shrink-0" />
          <div className="flex flex-1 flex-col gap-3 p-4">
            <Bone className="h-6 w-40" />
            <Bone className="h-4 w-48" />
            <Bone className="h-4 w-56" />
            <div className="mt-auto flex items-center justify-between pt-2">
              <Bone className="h-5 w-24" />
              <Bone className="h-9 w-28 rounded-lg" />
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
        <Bone className="h-7 w-28" />
        <Bone className="h-4 w-48" />
      </div>
      <div className="divide-y divide-black/10 overflow-hidden rounded-2xl border border-black/10">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex items-center justify-between px-4 py-4">
            <div className="space-y-2">
              <Bone className="h-4 w-24" />
              <Bone className="h-3 w-32" />
            </div>
            <Bone className="h-5 w-24" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function AccountChipSkeleton() {
  return (
    <div className="flex h-11 w-[166px] items-center gap-2" aria-hidden>
      <Bone className="h-6 w-6 rounded-full" />
      <Bone className="h-4 w-24" />
    </div>
  );
}

export function LoginStepSkeleton({ step }: { step: 'mobile' | 'otp' }) {
  if (step === 'otp') {
    return (
      <div className="space-y-5" aria-busy="true" aria-label="در حال بررسی کد">
        <Bone className="mx-auto h-4 w-48" />
        <div className="flex justify-center gap-2" dir="ltr">
          {Array.from({ length: 6 }, (_, index) => (
            <Bone key={index} className="h-11 w-10 rounded-xl" />
          ))}
        </div>
        <Bone className="h-11 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-4" aria-busy="true" aria-label="در حال ارسال کد">
      <div className="space-y-2">
        <Bone className="h-4 w-24" />
        <Bone className="h-12 w-full rounded-xl" />
      </div>
      <Bone className="h-11 w-full rounded-xl" />
    </div>
  );
}
