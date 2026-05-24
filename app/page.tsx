import { Hero } from '@/components/Hero';
import { VelocityMarquee } from '@/components/VelocityMarquee';
import { ValueProps } from '@/components/ValueProps';
import { ServicesOverview } from '@/components/ServicesOverview';
import { WorkPreview } from '@/components/WorkPreview';
import { HowItWorks } from '@/components/HowItWorks';
import { ProofMetrics } from '@/components/ProofMetrics';
import { IndustriesGrid } from '@/components/IndustriesGrid';
import { PricingPhilosophy } from '@/components/PricingPhilosophy';
import { Testimonials } from '@/components/Testimonials';
import { FaqTeaser } from '@/components/FaqTeaser';
import { BriefCtaSection } from '@/components/BriefCtaSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <VelocityMarquee />
      <ValueProps />
      <ServicesOverview />
      <WorkPreview />
      <HowItWorks />
      <ProofMetrics />
      <IndustriesGrid />
      <PricingPhilosophy />
      <Testimonials />
      <FaqTeaser />
      <BriefCtaSection />
    </>
  );
}
