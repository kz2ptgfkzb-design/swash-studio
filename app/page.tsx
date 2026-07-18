import { Hero } from '@/components/Hero';
import { VelocityMarquee } from '@/components/VelocityMarquee';
import { ValueProps } from '@/components/ValueProps';
import { StudioLab } from '@/components/StudioLab';
import { ServicesOverview } from '@/components/ServicesOverview';
import { EditionsCarousel } from '@/components/EditionsCarousel';
import { ProcessScrubber } from '@/components/ProcessScrubber';
import { EverySiteShipsWith } from '@/components/EverySiteShipsWith';
import { IndustriesGrid } from '@/components/IndustriesGrid';
import { PricingPhilosophy } from '@/components/PricingPhilosophy';
import { FaqTeaser } from '@/components/FaqTeaser';
import { BriefCtaSection } from '@/components/BriefCtaSection';
import { ChapterNav } from '@/components/ChapterNav';

export default function HomePage() {
  return (
    <>
      <ChapterNav />
      <Hero />
      <VelocityMarquee />
      <ValueProps />
      <StudioLab />
      <ServicesOverview />
      <EditionsCarousel />
      <ProcessScrubber />
      <EverySiteShipsWith />
      <IndustriesGrid />
      <PricingPhilosophy />
      <FaqTeaser />
      <BriefCtaSection />
    </>
  );
}
