import HeroSection from "@/components/hero/HeroSection";
import WorkSection from "@/components/work/WorkSection";
import AboutSection from "@/components/about/AboutSection";
import StackSection from "@/components/stack/StackSection";
import CTASection from "@/components/cta/CTASection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <StackSection />
      <CTASection />
      <Footer />
    </main>
  );
}
