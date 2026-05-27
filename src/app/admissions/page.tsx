"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import MultiStepForm from "@/components/ui/MultiStepForm";
import FaqAccordion from "@/components/ui/FaqAccordion";
import ThreeBackground from "@/components/ThreeBackground";
import { Download } from "lucide-react";

export default function AdmissionsPage() {
  return (
    <main className="min-h-screen bg-ivory">
            
      {/* Header */}
      <section className="relative pt-40 pb-20 bg-royal-brown-dark text-ivory overflow-hidden min-h-[50vh] flex flex-col justify-center">
        <ThreeBackground />
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <SectionHeading 
            title="Admissions 2026-27" 
            subtitle="Join Our Legacy" 
            light={true} 
          />
          <p className="text-ivory/80 max-w-2xl mx-auto text-lg mt-4">
            We seek students who are curious, motivated, and eager to contribute to our vibrant community. Begin your journey with us.
          </p>
        </div>
      </section>

      {/* Interactive Form Section */}
      <section className="py-24 -mt-16 relative z-20">
        <div className="container mx-auto px-6 md:px-12">
          <MultiStepForm />
        </div>
      </section>

      {/* Resources & Downloads */}
      <section className="py-16 bg-ivory-light border-y border-royal-brown/5">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h3 className="font-serif text-2xl font-bold text-royal-brown mb-10">Important Resources</h3>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="#" className="flex items-center justify-center gap-3 bg-white px-8 py-4 rounded-xl border border-royal-brown/10 text-royal-brown hover:border-luxury-gold hover:text-luxury-gold transition-colors shadow-sm">
              <Download size={20} />
              <span className="font-medium">School Prospectus</span>
            </a>
            <a href="#" className="flex items-center justify-center gap-3 bg-white px-8 py-4 rounded-xl border border-royal-brown/10 text-royal-brown hover:border-luxury-gold hover:text-luxury-gold transition-colors shadow-sm">
              <Download size={20} />
              <span className="font-medium">Fee Structure 2026</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-ivory">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeading title="Frequently Asked Questions" subtitle="Admissions FAQ" />
          <div className="mt-16">
            <FaqAccordion />
          </div>
        </div>
      </section>

      </main>
  );
}

