"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import PremiumCard from "@/components/ui/PremiumCard";
import { BookOpen, MonitorPlay, Users, Target } from "lucide-react";

export default function AcademicsPage() {
  const subjects = [
    { title: "Sciences", desc: "Advanced Physics, Chemistry, and Biology labs with cutting-edge equipment." },
    { title: "Mathematics", desc: "Rigorous analytical training promoting complex problem-solving skills." },
    { title: "Humanities", desc: "Comprehensive studies in History, Geography, and Political Science." },
    { title: "Languages", desc: "Fluency programs in English, Tamil, Hindi, and French." },
  ];

  return (
    <main className="min-h-screen bg-ivory">
            
      {/* Header */}
      <section className="relative pt-40 pb-20 bg-royal-brown-dark text-ivory overflow-hidden min-h-[40vh] flex flex-col justify-center">
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <SectionHeading title="Educational Philosophy" subtitle="Academics" light={true} />
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h3 className="font-serif text-3xl font-bold text-royal-brown mb-6">The CBSE Advantage</h3>
            <p className="text-royal-brown-light/80 text-lg leading-relaxed">
              We follow the Central Board of Secondary Education (CBSE) curriculum, recognized globally for its rigorous, comprehensive, and student-friendly approach. Our pedagogy integrates traditional wisdom with modern technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <PremiumCard title="Experiential Learning" description="Learning through reflection on doing, ensuring deeper understanding." icon={<BookOpen size={28} />} delay={0.1} />
            <PremiumCard title="Tech-Integrated" description="Smart classrooms and AI-assisted learning tools for modern education." icon={<MonitorPlay size={28} />} delay={0.2} />
            <PremiumCard title="Collaborative" description="Group projects and peer-learning to build essential teamwork skills." icon={<Users size={28} />} delay={0.3} />
            <PremiumCard title="Goal-Oriented" description="Personalized learning paths tailored to each student's career aspirations." icon={<Target size={28} />} delay={0.4} />
          </div>
        </div>
      </section>

      {/* Curriculum Areas */}
      <section className="py-24 bg-ivory-light border-y border-royal-brown/5">
        <div className="container mx-auto px-6 md:px-12">
          <h3 className="font-serif text-3xl font-bold text-royal-brown mb-12 text-center">Core Academic Disciplines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {subjects.map((sub, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-royal-brown/10 shadow-sm hover:border-luxury-gold transition-colors">
                <h4 className="font-serif text-xl font-bold text-royal-brown mb-3">{sub.title}</h4>
                <p className="text-royal-brown-light/80">{sub.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      </main>
  );
}

