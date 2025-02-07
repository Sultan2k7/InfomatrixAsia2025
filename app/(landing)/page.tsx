import { Header } from '@/components/shared';
import { Hero } from '@/components/shared/hero';
import { Features } from '@/components/shared/features';
import { HowItWorks } from '@/components/shared/how-it-works';
import { AboutUs } from '@/components/shared/about-us';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <HowItWorks />
        <AboutUs />
      </main>
    </div>
  );
}
