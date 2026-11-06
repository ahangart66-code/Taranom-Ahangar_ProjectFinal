import Link from 'next/link';

const points = [
  {
    title: 'تور طبیعت‌گردی و تاریخی',
    text: 'از جاذبه‌های طبیعی و اقامتگاه‌های بوم‌گردی تا بازدید از آثار تاریخی، تور مناسب مسیرتان را انتخاب می‌کنید.',
  },
  {
    title: 'قیمت شفاف',
    text: 'قیمت هر تور، ظرفیت، بیمه و خدمات همراه قبل از رزرو مشخص است.',
  },
  {
    title: 'پشتیبانی در طول سفر',
    text: 'از انتخاب تور تا پایان سفر، پشتیبانی تورینو همراه شماست.',
  },
];

export default function AboutPage() {
  return (
    <div className="container-app py-10">
      <h1 className="text-2xl font-bold text-ink sm:text-3xl">درباره ما</h1>
      <p className="mt-4 max-w-3xl text-justify text-base font-light leading-8 text-ink">
        تورینو آژانس مسافرتی برای رزرو تورهای داخلی و خارجی است. مبدأ، مقصد و تاریخ سفر را انتخاب
        می‌کنید، جزئیات تور را می‌بینید و همان‌جا رزرو را نهایی می‌کنید.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {points.map((point) => (
          <li key={point.title} className="rounded-2xl border border-black/10 bg-white p-5">
            <h2 className="text-base font-semibold text-ink">{point.title}</h2>
            <p className="mt-2 text-sm leading-7 text-ink-muted">{point.text}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/#tours" className="btn-primary">
          مشاهده تورها
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-xl border border-brand px-4 py-2.5 text-sm font-medium text-brand"
        >
          تماس با ما
        </Link>
      </div>
    </div>
  );
}
