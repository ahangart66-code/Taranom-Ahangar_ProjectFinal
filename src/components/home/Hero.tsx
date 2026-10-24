export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-brand/10">
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(40,167,69,0.18),_transparent_55%),linear-gradient(160deg,#f3faf5_0%,#ffffff_48%,#eef7f1_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-[#9fd4b0]/25 blur-3xl"
        aria-hidden
      />

      <div className="container-app relative grid min-h-[70vh] items-center gap-10 py-14 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:py-20">
        <div className="order-2 lg:order-1">
          <p className="mb-4 text-3xl font-black tracking-tight text-brand sm:text-4xl">
            Torino
          </p>
          <h1 className="max-w-xl text-2xl font-bold leading-relaxed text-ink sm:text-3xl lg:text-[2rem]">
            برگزارکننده تورهای داخلی و خارجی
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-8 text-ink-muted sm:text-base">
            از انتخاب مقصد تا رزرو نهایی، مسیر سفرت را با تورینو ساده و مطمئن برنامه‌ریزی
            کن.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#search" className="btn-primary min-w-[140px]">
              جست‌وجوی تور
            </a>
            <a
              href="#tours"
              className="inline-flex items-center justify-center rounded-xl border border-brand/30 px-4 py-2.5 text-sm font-medium text-brand transition hover:bg-brand-light"
            >
              مشاهده تورها
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-[2rem] bg-[#d8efe0] shadow-soft lg:max-w-none">
            <div
              className="absolute inset-0 bg-[linear-gradient(135deg,rgba(31,122,77,0.15),transparent_40%),radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.7),transparent_45%)]"
              aria-hidden
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
              <p className="text-xs font-medium text-brand-dark/80">تجربه سفر متفاوت</p>
              <p className="mt-2 max-w-xs text-lg font-bold text-ink sm:text-xl">
                تورهای منتخب داخلی و خارجی، با پشتیبانی واقعی
              </p>
            </div>
            <div
              className="absolute left-6 top-6 h-24 w-24 rounded-full border border-white/70 bg-white/40 backdrop-blur-sm"
              aria-hidden
            />
            <div
              className="absolute right-10 top-16 h-16 w-16 rounded-2xl border border-brand/20 bg-brand/20"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
