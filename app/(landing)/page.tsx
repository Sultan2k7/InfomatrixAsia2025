import { Header } from '@/components/shared';
import { Hero } from '@/components/shared/hero';
import { Features } from '@/components/shared/features';
import { HowItWorks } from '@/components/shared/how-it-works';
import { AboutUs } from '@/components/shared/about-us';

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <HowItWorks />
      <AboutUs />
    </div>
  );
}
