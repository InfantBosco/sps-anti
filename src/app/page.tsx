import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PrincipalMessage from "@/components/PrincipalMessage";
import AcademicsSection from "@/components/AcademicsSection";
import AppleOfTheEye from "@/components/AppleOfTheEye";
import StudentLifeCarousel from "@/components/StudentLifeCarousel";
import StatsSection from "@/components/StatsSection";
import InfrastructureSection from "@/components/InfrastructureSection";
import Testimonials from "@/components/Testimonials";
import NewsAndEvents from "@/components/NewsAndEvents";
import AdmissionPopup from "@/components/AdmissionPopup";

export default function Home() {
  return (
    <main className="min-h-screen">
            <HeroSection />
      <AboutSection />
      <PrincipalMessage />
      <AppleOfTheEye />
      <AcademicsSection />
      <StatsSection />
      <StudentLifeCarousel />
      <InfrastructureSection />
      <Testimonials />
      <NewsAndEvents />
      <AdmissionPopup />
    </main>
  );
}

