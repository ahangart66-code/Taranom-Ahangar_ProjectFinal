import Link from 'next/link';

const torinoLinks = [
  { href: '/about', label: 'درباره ما' },
  { href: '/contact', label: 'تماس با ما' },
  { href: '/#why-torino', label: 'چرا تورینو' },
  { href: '/#why-torino', label: 'بیمه مسافرتی' },
];

const customerLinks = [
  { href: '/contact', label: 'پشتیبانی آنلاین' },
  { href: '/#tours', label: 'راهنمای خرید' },
  { href: '/#tours', label: 'راهنمای استرداد' },
  { href: '/contact', label: 'پرسش و پاسخ' },
];

const badges = [
  { src: '/images/footer-airline.png', alt: 'سازمان هواپیمایی کشوری', width: 78 },
  { src: '/images/footer-passenger.png', alt: 'حقوق مسافر', width: 71 },
  { src: '/images/footer-qr.png', alt: 'نماد اعتماد', width: 68 },
  { src: '/images/footer-samandehi.png', alt: 'ساماندهی', width: 67 },
  { src: '/images/footer-fare.png', alt: 'سامانه نرخ بلیت', width: 68 },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-white">
      <div className="container-app border-t border-black/20">
        <div className="flex flex-col gap-10 py-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex shrink-0 justify-between gap-12 sm:justify-start sm:gap-28">
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-ink">تورینو</h3>
              <ul className="space-y-2 text-lg font-light text-ink">
                {torinoLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="whitespace-nowrap hover:text-brand">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-ink">خدمات مشتریان</h3>
              <ul className="space-y-2 text-lg font-light text-ink">
                {customerLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="whitespace-nowrap hover:text-brand">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex shrink-0 flex-col items-end justify-between gap-6">
            <div className="self-end">
              <img src="/images/logo.png" alt="تورینو" className="h-11 w-auto" />
              <p className="mt-3 text-[15px] text-black" dir="ltr">
                <span className="font-medium">021-8574</span>
                <span> : </span>
                <span>تلفن پشتیبانی</span>
              </p>
            </div>
            <ul className="flex flex-wrap items-center justify-end gap-6 sm:gap-8">
              {badges.map((badge) => (
                <li key={badge.src}>
                  <img
                    src={badge.src}
                    alt={badge.alt}
                    width={badge.width}
                    height={74}
                    className="h-[74px] w-auto"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-black/20 py-3 pb-10 text-center text-[15px] text-black">
        کلیه حقوق این وب سایت متعلق به تورینو می باشد.
      </div>
    </footer>
  );
}
