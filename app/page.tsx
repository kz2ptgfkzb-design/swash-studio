import { Hero } from '@/components/Hero';
import { VelocityMarquee } from '@/components/VelocityMarquee';
import { ValueProps } from '@/components/ValueProps';
import { StudioLab } from '@/components/StudioLab';
import { ServicesOverview } from '@/components/ServicesOverview';
import { EditionsCarousel } from '@/components/EditionsCarousel';
import { WorkPreview } from '@/components/WorkPreview';
import { ProcessScrubber } from '@/components/ProcessScrubber';
import { EverySiteShipsWith } from '@/components/EverySiteShipsWith';
import { ProofMetrics } from '@/components/ProofMetrics';
import { IndustriesGrid } from '@/components/IndustriesGrid';
import { PricingPhilosophy } from '@/components/PricingPhilosophy';
import { Testimonials } from '@/components/Testimonials';
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
      <WorkPreview />
      <ProcessScrubber />
      <EverySiteShipsWith />
      <ProofMetrics />
      <IndustriesGrid />
      <PricingPhilosophy />
      <Testimonials />
      <FaqTeaser />
      <BriefCtaSection />
    </>
  );
}
