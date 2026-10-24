export function PhoneBanner() {
  return (
    <section className="container-app py-10 sm:py-14">
      <div className="overflow-hidden rounded-[1.75rem] bg-gradient-to-l from-brand-dark to-brand px-6 py-8 text-white sm:px-10 sm:py-10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-lg font-bold sm:text-xl">خرید تلفنی از تورینو</p>
            <p className="mt-2 max-w-md text-sm leading-7 text-white/85">
              اگر ترجیح می‌دهی حضوری یا تلفنی رزرو کنی، کارشناسان ما آماده‌اند.
            </p>
          </div>
          <a
            href="tel:02135784"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand transition hover:bg-brand-light"
            dir="ltr"
          >
            021-35784
          </a>
        </div>
      </div>
    </section>
  );
}
