'use client';

import { useState } from 'react';

const slides = [
  { src: '/images/why-1.png', alt: 'اقامتگاه سنتی' },
  { src: '/images/why-2.png', alt: 'سفر گروهی کنار دریا' },
  { src: '/images/why-3.png', alt: 'سفر زمینی' },
  { src: '/images/why-4.png', alt: 'سفر هوایی' },
];

export function WhySlider() {
  const [index, setIndex] = useState(0);
  const ordered = [...slides.slice(index), ...slides.slice(0, index)];

  return (
    <div className="w-full max-w-[520px]">
      <div className="relative mx-auto h-[320px] w-full overflow-hidden sm:h-[460px]">
        {ordered.slice(0, 3).map((slide, position) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={position === 0 ? slide.alt : ''}
            className="absolute bottom-0 right-0 h-auto w-[250px] max-w-[70%] object-contain sm:w-[300px]"
            style={{
              transform: `translateX(${-position * 108}px) scale(${1 - position * 0.06})`,
              transformOrigin: 'right bottom',
              zIndex: 3 - position,
            }}
          />
        ))}
      </div>

      <div className="mt-2 flex items-center justify-center gap-4" dir="ltr">
        <button
          type="button"
          aria-label="اسلاید قبلی"
          disabled={index === 0}
          onClick={() => setIndex((current) => Math.max(0, current - 1))}
          className="disabled:opacity-35"
        >
          <img src="/images/arrow-left.png" alt="" className="h-9 w-9" />
        </button>
        <p className="min-w-[3.5rem] text-center text-lg text-ink">
          {(index + 1).toLocaleString('fa-IR')}/{slides.length.toLocaleString('fa-IR')}
        </p>
        <button
          type="button"
          aria-label="اسلاید بعدی"
          disabled={index === slides.length - 1}
          onClick={() => setIndex((current) => Math.min(slides.length - 1, current + 1))}
          className="disabled:opacity-35"
        >
          <img src="/images/arrow-right.png" alt="" className="h-9 w-9" />
        </button>
      </div>
    </div>
  );
}
