const items = [
  {
    title: 'بصرفه بودن',
    text: 'قیمت‌های شفاف و رقابتی برای تورهای داخلی و خارجی.',
  },
  {
    title: 'پشتیبانی حرفه‌ای',
    text: 'همراهی از انتخاب تور تا لحظه بازگشت از سفر.',
  },
  {
    title: 'رضایت مسافران',
    text: 'تجربه واقعی کاربران تورینو در مسیرهای متنوع.',
  },
];

export function WhyTorino() {
  return (
    <section className="border-y border-gray-100 bg-[#f7fbf8]">
      <div className="container-app py-12 sm:py-16">
        <div className="mx-auto mb-8 max-w-2xl text-center">
          <h2 className="text-xl font-bold text-ink sm:text-2xl">چرا تورینو؟</h2>
          <p className="mt-2 text-sm text-ink-muted">
            سه دلیل ساده برای اینکه برنامه‌ریزی سفرت را به تورینو بسپاری.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {items.map((item, index) => (
            <article
              key={item.title}
              className="rounded-2xl border border-white bg-white p-5 shadow-soft"
            >
              <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-brand-light text-sm font-bold text-brand">
                {(index + 1).toLocaleString('fa-IR')}
              </span>
              <h3 className="text-base font-bold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-ink-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
