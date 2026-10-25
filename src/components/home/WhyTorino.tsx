import { WhySlider } from '@/components/home/WhySlider';

export function WhyTorino() {
  return (
    <section id="why-torino" className="container-app scroll-mt-24 mt-16 lg:mt-[102px]">
      <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between">
        <article className="w-full max-w-[517px] lg:pt-6">
          <div className="mb-6 flex items-center gap-4">
            <span className="inline-flex h-[68px] w-[59px] shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#28A745] to-[#10411B]">
              <img src="/images/why-icon.png" alt="" className="h-7 w-4" />
            </span>
            <h2 className="text-3xl font-extrabold text-ink sm:text-[40px]">
              چرا <span className="text-brand">تورینو</span> ؟
            </h2>
          </div>
          <h3 className="mb-4 text-xl font-medium text-ink sm:text-2xl">تور طبیعت گردی و تاریخی</h3>
          <p className="text-justify text-base font-light leading-[2.2] text-ink sm:text-xl">
            اگر دوست داشته باشید که یک جاذبه طبیعی را از نزدیک ببینید و در دل طبیعت چادر بزنید یا در
            یک اقامتگاه بوم گردی اتاق بگیرید، باید تورهای طبیعت‌گردی را خریداری کنید. اما اگر بخواهید
            از جاذبه‌های گردشگری و آثار تاریخی یک مقصد خاص بازدید کنید، می‌توانید تورهای فرهنگی و
            تاریخی را خریداری کنید.
          </p>
        </article>
        <WhySlider />
      </div>
    </section>
  );
}
