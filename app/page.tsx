import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { IntroSection } from '@/components/IntroSection';
import { CategoryShowcase } from '@/components/CategoryShowcase';
import { SpotlightSection } from '@/components/SpotlightSection';
import { PrinciplesSection } from '@/components/PrinciplesSection';
import { CtaSection } from '@/components/CtaSection';
import { SideNav } from '@/components/SideNav';

const SECTIONS = [
  { id: 'overview', label: '00 / Overview' },
  { id: 'introduction', label: '01 / The Drop' },
  { id: 'categories', label: '02 / Map' },
  { id: 'spotlight', label: '03 / Headliner' },
  { id: 'principles', label: '04 / Notes' },
  { id: 'ship', label: '05 / Ship' },
];

export default function HomePage() {
  return (
    <>
      <SideNav sections={SECTIONS} />
      <Hero />
      <Marquee />
      <IntroSection />
      <CategoryShowcase />
      <SpotlightSection />
      <PrinciplesSection />
      <CtaSection />
    </>
  );
}
