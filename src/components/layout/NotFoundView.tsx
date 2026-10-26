import Link from 'next/link';

export function NotFoundView() {
  return (
    <div className="flex min-h-[calc(100vh-440px)] flex-col-reverse items-center justify-center gap-8 px-4 py-10 lg:flex-row lg:gap-28 xl:gap-40">
      <div className="flex flex-col items-center">
        <h1 className="mb-6 text-center text-[22px] font-bold text-ink sm:text-[28px]">
          صفحه مورد نظر یافت نشد!
        </h1>
        <Link
          href="/"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-[#d8f3dc] px-8 text-base font-medium text-brand transition hover:bg-[#c8ebcf]"
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
      <img
        src="/images/404.png"
        alt=""
        width={555}
        height={555}
        className="h-auto w-[240px] sm:w-[300px] lg:w-[322px]"
      />
    </div>
  );
}
