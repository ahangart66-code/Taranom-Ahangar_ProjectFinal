import Link from 'next/link';

export function PhoneBanner() {
  return (
    <section className="container-app mt-16 lg:mt-[109px]">
      <div className="relative">
        <img
          src="/images/phone-banner.png"
          alt="خرید تلفنی از تورینو — به هرکجا که میخواهید"
          className="block h-auto w-full"
        />
        <a
          href="tel:0211840"
          aria-label="تماس با ۰۲۱-۱۸۴۰"
          className="absolute rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
          style={{ left: '6%', top: '28%', width: '16%', height: '20%' }}
        />
        <Link
          href="/contact"
          aria-label="اطلاعات بیشتر"
          className="absolute rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand"
          style={{ left: '5%', top: '54%', width: '18%', height: '22%' }}
        />
      </div>
    </section>
  );
}
