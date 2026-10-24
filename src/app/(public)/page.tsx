import { Hero } from '@/components/home/Hero';
import { PhoneBanner } from '@/components/home/PhoneBanner';
import { TourListSection } from '@/components/home/TourListSection';
import { WhyTorino } from '@/components/home/WhyTorino';

export default function HomePage() {
  return (
    <div>
      <Hero />
      <TourListSection />
      <WhyTorino />
      <PhoneBanner />
    </div>
  );
}
