import Intro from "@/components/intro/Intro";
import HeroSection from "@/components/hero/HeroSection";
import WorkSection from "@/components/work/WorkSection";
import IndexSection from "@/components/work/IndexSection";
import AboutSection from "@/components/about/AboutSection";
import StackSection from "@/components/stack/StackSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Intro />
      <main id="main" className="relative bg-bg">
        <HeroSection />
        <WorkSection />
        <IndexSection />
        <AboutSection />
        <StackSection />
      </main>
      <Footer />
    </>
  );
}
