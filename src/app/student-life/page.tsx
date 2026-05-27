"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";
import { motion } from "framer-motion";

export default function StudentLifePage() {
  const categories = [
    {
      title: "Sports & Athletics",
      desc: "Our premium sports complex features an Olympic-sized swimming pool, indoor basketball courts, and a professional-grade cricket ground. We believe physical fitness is crucial for mental acuity.",
      img: "/infra-bg.png"
    },
    {
      title: "Arts & Culture",
      desc: "From classical dance and music to modern theater and digital arts, our dedicated performing arts center allows students to explore their creative passions under expert guidance.",
      img: "/about-bg.png"
    },
    {
      title: "Clubs & Societies",
      desc: "With over 20 active student-run clubs including Robotics, Debate, Model UN, and Eco-Warriors, students have ample opportunities to develop leadership skills and pursue niche interests.",
      img: "/principal.png"
    }
  ];

  return (
    <main className="min-h-screen bg-ivory">
            
      {/* Header */}
      <section className="relative pt-40 pb-20 bg-royal-brown-dark text-ivory overflow-hidden min-h-[40vh] flex flex-col justify-center">
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <SectionHeading title="Holistic Development" subtitle="Student Life" light={true} />
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="space-y-24">
            {categories.map((cat, idx) => (
              <div key={idx} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className={`order-2 ${idx % 2 !== 0 ? 'lg:order-1' : 'lg:order-2'}`}
                >
                  <h3 className="font-serif text-3xl font-bold text-royal-brown mb-6">{cat.title}</h3>
                  <p className="text-royal-brown-light/80 leading-relaxed text-lg">{cat.desc}</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`order-1 ${idx % 2 !== 0 ? 'lg:order-2' : 'lg:order-1'} relative h-[400px] rounded-2xl overflow-hidden shadow-xl`}
                >
                  <div className="absolute inset-0 bg-luxury-gold/10 mix-blend-overlay z-10" />
                  <Image src={cat.img} alt={cat.title} fill className="object-cover transition-transform duration-1000 hover:scale-105" />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      </main>
  );
}

