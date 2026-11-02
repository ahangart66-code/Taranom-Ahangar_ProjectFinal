import { TourSearch } from '@/components/home/TourSearch';
import type { TourFilters } from '@/types/tour';

type HeroProps = {
  initialFilters: TourFilters;
  onSearch: (filters: TourFilters) => void;
  isFetching?: boolean;
};

export function Hero({ initialFilters, onSearch, isFetching }: HeroProps) {
  return (
    <section>
      <img
        src="/images/hero-banner.jpg"
        alt=""
        className="block h-auto w-full"
      />
      <div className="container-app pb-4">
        <h1 className="mt-6 text-center text-xl font-medium leading-relaxed text-[#595959] sm:text-2xl lg:mt-[17px] lg:text-[28px] lg:leading-[43.5px]">
          <span className="text-brand">تورینو </span>
          برگزار کننده بهترین تور های داخلی و خارجی
        </h1>
        <TourSearch initialFilters={initialFilters} onSearch={onSearch} isFetching={isFetching} />
      </div>
    </section>
  );
}
