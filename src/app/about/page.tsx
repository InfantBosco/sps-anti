"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Target, Users, Zap, Heart, Star } from "lucide-react";

const coreValues = [
  { 
    title: "Integrity", 
    desc: "Upholding the highest moral and ethical standards in every action and decision.",
    icon: <Shield className="text-luxury-gold" />
  },
  { 
    title: "Excellence", 
    desc: "Striving for the highest quality in academics, sports, and character development.",
    icon: <Target className="text-luxury-gold" />
  },
  { 
    title: "Innovation", 
    desc: "Embracing new technologies and creative methodologies to enhance learning.",
    icon: <Zap className="text-luxury-gold" />
  },
  { 
    title: "Empathy", 
    desc: "Fostering a compassionate community that respects and values every individual.",
    icon: <Heart className="text-luxury-gold" />
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-ivory">
            
      {/* Header */}
      <section className="relative pt-40 pb-20 bg-royal-brown-dark text-ivory overflow-hidden min-h-[40vh] flex flex-col justify-center">
        <div className="absolute inset-0 opacity-20">
          <Image src="/about-bg.png" alt="About Senthil" fill className="object-cover" />
          {/* Gradient Overlay - Ivory to transparent */}
          <div className="absolute inset-0 bg-gradient-to-b from-ivory/15 via-transparent to-transparent" />
          {/* Primary overlay */}
          <div className="absolute inset-0 bg-royal-brown-dark/80 mix-blend-multiply"></div>
        </div>
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <SectionHeading title="Our Legacy" subtitle="About Us" light={true} />
        </div>
      </section>

      {/* History Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-royal-brown mb-6">A Decade of Excellence</h3>
              <p className="text-royal-brown-light/80 leading-relaxed mb-6 text-lg">
                Founded in 2016, Senthil Public School began with a singular vision: to provide a holistic, world-class education that empowers students to become compassionate leaders and global citizens. 
              </p>
              <p className="text-royal-brown-light/80 leading-relaxed text-lg">
                Over the years, we have grown from a modest institution into one of the most prestigious educational establishments in Dharmapuri, known for our rigorous academic standards, exceptional infrastructure, and unwavering commitment to character development. Our journey is defined by the trust of parents and the success of our students.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image src="/principal.png" alt="Founders" fill className="object-cover" />
              {/* Gradient Overlay - Ivory to transparent top, dark bottom */}
              <div className="absolute inset-0 bg-gradient-to-b from-ivory/10 via-transparent to-black/60" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chairman's Message */}
      <section className="py-24 bg-ivory-light border-y border-royal-brown/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-4xl mx-auto text-center italic">
            <div className="flex justify-center mb-8">
              <Star className="text-luxury-gold fill-luxury-gold" size={32} />
            </div>
            <p className="text-2xl md:text-3xl text-royal-brown font-serif leading-relaxed mb-10">
              "We believe that every child is a unique spark of potential. Our mission is to ignite that spark with the light of knowledge and the warmth of ethical values, creating leaders who will illuminate the future."
            </p>
            <div className="w-16 h-1 bg-luxury-gold mx-auto mb-6" />
            <p className="font-serif text-xl font-bold text-royal-brown">Shri. Senthil C. Kandasamy</p>
            <p className="text-sm font-bold uppercase tracking-widest text-luxury-gold-dark mt-2">Chairman, Senthil Group of Schools</p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-royal-brown-dark text-ivory relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxury-gold/5 rounded-full blur-[100px] -ml-48 -mb-48" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-ivory/5 p-10 md:p-14 rounded-3xl border border-luxury-gold/20 backdrop-blur-sm group hover:border-luxury-gold transition-colors duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mb-10 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-luxury-gold mb-8">Our Vision</h3>
              <p className="text-ivory/80 leading-relaxed text-lg italic">
                "To be a premier global educational institution that fosters a culture of innovation, excellence, and ethical values, nurturing minds that will positively impact the world."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-ivory/5 p-10 md:p-14 rounded-3xl border border-luxury-gold/20 backdrop-blur-sm group hover:border-luxury-gold transition-colors duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mb-10 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-luxury-gold mb-8">Our Mission</h3>
              <p className="text-ivory/80 leading-relaxed text-lg">
                To provide a stimulating learning environment with a technological orientation, maximizing individual potential and ensuring students of all abilities are well-equipped to meet the challenges of global competition while remaining rooted in Indian culture.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeading title="Our Core Values" subtitle="The DNA of SPS" align="center" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {coreValues.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 bg-white rounded-3xl border border-royal-brown/5 shadow-sm hover:shadow-xl transition-all duration-500 text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-luxury-gold/10 flex items-center justify-center mx-auto mb-8 group-hover:bg-luxury-gold group-hover:text-ivory transition-colors">
                  {value.icon}
                </div>
                <h4 className="font-serif text-2xl font-bold text-royal-brown mb-4">{value.title}</h4>
                <p className="text-royal-brown-light/70 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Holistic Development */}
      <section className="py-24 bg-ivory-light">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <SectionHeading title="Holistic Development" subtitle="Beyond Books" />
              <div className="space-y-6 mt-10">
                <div className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                    <CheckCircle />
                  </div>
                  <div>
                    <h5 className="font-serif text-xl font-bold text-royal-brown mb-2">Academic Rigor</h5>
                    <p className="text-royal-brown-light/70">Our curriculum is designed to challenge minds and inspire a lifelong love for learning.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                    <CheckCircle />
                  </div>
                  <div>
                    <h5 className="font-serif text-xl font-bold text-royal-brown mb-2">Character Building</h5>
                    <p className="text-royal-brown-light/70">Ethics and values are woven into every aspect of our student experience.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                    <CheckCircle />
                  </div>
                  <div>
                    <h5 className="font-serif text-xl font-bold text-royal-brown mb-2">Global Exposure</h5>
                    <p className="text-royal-brown-light/70">We prepare students for a borderless world with diverse cultural and academic programs.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
                  <Image src="/royal-sports.png" alt="Sports" fill className="object-cover" />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-ivory/10 to-black/40" />
                </div>
                <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg">
                  <Image src="/royal-library.png" alt="Library" fill className="object-cover" />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-ivory/10 to-black/40" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative h-48 rounded-3xl overflow-hidden shadow-lg">
                  <Image src="/royal-auditorium.png" alt="Auditorium" fill className="object-cover" />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-ivory/10 to-black/40" />
                </div>
                <div className="relative h-64 rounded-3xl overflow-hidden shadow-lg">
                  <Image src="/royal-students.png" alt="Students" fill className="object-cover" />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-ivory/10 to-black/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function CheckCircle() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
