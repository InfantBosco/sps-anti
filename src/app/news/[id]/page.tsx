"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { useParams } from "next/navigation";

// Mock data mapping (in a real app this would come from a CMS or DB)
const newsContent: Record<string, any> = {
  "annual-sports-meet-2026": {
    title: "Annual Sports Meet 2026",
    category: "Events",
    date: "15 Oct 2026",
    highlights: [
      "Inter-house athletic competitions across all grade levels.",
      "Grand opening ceremony with march past and torch relay.",
      "Special guest appearance by renowned national athlete.",
      "Medal ceremony celebrating sportsmanship and excellence."
    ],
    videoCount: 2,
    imageCount: 6
  },
  "science-innovation-exhibition": {
    title: "Science & Innovation Exhibition",
    category: "Academics",
    date: "02 Nov 2026",
    highlights: [
      "Showcasing 100+ innovative projects by students.",
      "Focus on sustainable energy and robotics.",
      "Interactive workshops for visiting parents and guests.",
      "Judging by eminent professors from top engineering colleges."
    ],
    videoCount: 1,
    imageCount: 8
  },
  "parent-teacher-interaction": {
    title: "Parent-Teacher Interaction Session",
    category: "Notice",
    date: "20 Nov 2026",
    highlights: [
      "Individual performance review for Mid-Term exams.",
      "Discussion on holistic development and co-curricular progress.",
      "Feedback session for school infrastructure and services.",
      "Introduction of the new digital learning portal for parents."
    ],
    videoCount: 1,
    imageCount: 4
  }
};

export default function EventDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const content = newsContent[id] || newsContent["annual-sports-meet-2026"];

  return (
    <main className="min-h-screen bg-ivory">
            
      {/* Hero Section */}
      <section className="pt-40 pb-20 bg-royal-brown-dark text-ivory relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-luxury-gold font-bold uppercase tracking-[0.3em] text-sm mb-4 block">
              {content.category}
            </span>
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6 max-w-4xl leading-tight">
              {content.title}
            </h1>
            <div className="flex items-center gap-4 text-ivory/60">
              <span className="w-8 h-[1px] bg-luxury-gold" />
              <span className="font-medium tracking-widest uppercase text-sm">{content.date}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-4">
              <SectionHeading title="Event Highlights" subtitle="Key Moments" align="left" />
              <p className="text-royal-brown-light mt-6 leading-relaxed">
                A detailed look into the significance and core objectives of this event at Senthil Public School.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              {content.highlights.map((highlight: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-8 bg-white rounded-2xl border border-royal-brown/5 shadow-md hover:shadow-[0_20px_50px_rgba(212,175,55,0.1)] hover:border-luxury-gold/30 transition-all duration-500 relative overflow-hidden group"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-luxury-gold transform scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
                  <span className="text-luxury-gold font-serif text-4xl opacity-20 absolute top-4 right-6">0{i+1}</span>
                  <p className="text-royal-brown font-medium relative z-10">{highlight}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-ivory-dark/30">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <SectionHeading title="Visual Gallery" subtitle="Captured Moments" />
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: content.imageCount }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.1 }}
                whileHover={{ y: -10 }}
                className="aspect-square bg-royal-brown/5 rounded-2xl border-2 border-dashed border-royal-brown/10 flex items-center justify-center group relative overflow-hidden"
              >
                <div className="text-royal-brown/20 group-hover:text-luxury-gold transition-colors text-sm font-bold uppercase tracking-widest">
                  Image Box {i + 1}
                </div>
                <div className="absolute inset-0 bg-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <SectionHeading title="Video Coverage" subtitle="Live Action" />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {Array.from({ length: content.videoCount }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="aspect-video bg-royal-brown-dark/95 rounded-3xl overflow-hidden shadow-2xl flex flex-col items-center justify-center group cursor-pointer relative"
              >
                <div className="w-20 h-20 bg-luxury-gold rounded-full flex items-center justify-center text-ivory shadow-xl group-hover:scale-110 transition-transform">
                  <svg className="w-8 h-8 fill-current translate-x-1" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="mt-6 text-ivory/50 font-bold uppercase tracking-[0.2em] text-xs">YouTube Video Placeholder</span>
                <div className="absolute inset-0 border-2 border-luxury-gold/30 rounded-3xl m-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

          </main>
  );
}
