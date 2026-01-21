import { Hero } from "./Hero";
import { Features } from "./Features";
import { Steps } from "./Steps";
import { SampleTabs } from "./SampleTabs";
import { FAQ } from "./FAQ";
import { CTASection } from "./CTASection";
import { Footer } from "./Footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-amber-50/30">
      <Hero />
      <Features />
      <Steps />
      <SampleTabs />
      <FAQ />
      <CTASection />
      <Footer />
    </div>
  );
}

export {
  Hero,
  Features,
  Steps,
  SampleTabs,
  FAQ,
  CTASection,
  Footer,
};
