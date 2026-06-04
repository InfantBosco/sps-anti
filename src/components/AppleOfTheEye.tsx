"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SectionHeading from "./ui/SectionHeading";
import { Heart, BookOpen, Dumbbell, Trophy, Palette, CheckCircle2 } from "lucide-react";

const features = [
  { 
    id: "01", 
    name: "Character Quality", 
    fullName: "Character Based Quality Education", 
    icon: <Heart size={24} />, 
    desc: "Instilling moral values and integrity as the foundation of every student's journey. We believe that true education starts with the heart.",
    highlights: ["Moral Integrity", "Values Integration", "Leadership Ethics", "Social Responsibility"]
  },
  { 
    id: "02", 
    name: "Montessori", 
    fullName: "Montessori Methodology", 
    icon: <BookOpen size={24} />, 
    desc: "A world-class approach to early childhood education focusing on natural development, curiosity, and independent learning.",
    highlights: ["Natural Development", "Hands-on Learning", "Independence", "Curiosity Driven"]
  },
  { 
    id: "03", 
    name: "Sports", 
    fullName: "Elite Sports Infrastructure", 
    icon: <Dumbbell size={24} />, 
    desc: "State-of-the-art facilities designed to nurture the next generation of athletes with professional coaching and international standards.",
    highlights: ["Olympic Standards", "Pro Coaching", "Indoor Stadium", "Physical Wellness"]
  },
  { 
    id: "05", 
    name: "Guidance", 
    fullName: "Specialized Career Guidance", 
    icon: <Trophy size={24} />, 
    desc: "Personalized mentorship helping students navigate their academic and professional future with clarity and strategic confidence.",
    highlights: ["Global Counseling", "University Prep", "Skill Assessment", "Alumni Network"]
  },
  { 
    id: "07", 
    name: "Arts", 
    fullName: "Co-Scholastic Excellence", 
    icon: <Palette size={24} />, 
    desc: "Encouraging creativity and self-expression through arts, music, and performance as a vital part of holistic personality development.",
    highlights: ["Visual Arts", "Performing Arts", "Music Academy", "Cultural Festivals"]
  },
];

export default function AppleOfTheEye() {
  const [activeId, setActiveId] = useState<string | null>("01");

  return (
    <section className="py-24 md:py-32 bg-royal-brown-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] flex items-center justify-center pointer-events-none scale-150">
        <div className="w-[1000px] h-[1000px] border border-luxury-gold rounded-full" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col h-full">
        <div className="mb-20">
          <SectionHeading 
            title="What makes SPS The Apple of The Eye?" 
            subtitle="The Pillars of Excellence" 
            light={true}
          />
        </div>

        <div className="flex w-full h-[600px] gap-4">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              onMouseEnter={() => setActiveId(feature.id)}
              animate={{ 
                flex: activeId === feature.id ? 5 : 1,
              }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className={`relative rounded-[2.5rem] overflow-hidden cursor-pointer border transition-all duration-500 ${activeId === feature.id ? 'bg-ivory/5 backdrop-blur-xl border-luxury-gold/40 shadow-[0_25px_60px_rgba(212,175,55,0.2)]' : 'border-luxury-gold/10 bg-transparent hover:border-luxury-gold/30 hover:shadow-lg hover:shadow-luxury-gold/10'}`}
            >
              <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-between">
                
                <div className="flex flex-col items-center md:items-start gap-6">
                  <span className={`font-serif text-2xl font-bold transition-colors duration-500 ${activeId === feature.id ? 'text-luxury-gold' : 'text-luxury-gold/30'}`}>
                    {feature.id}
                  </span>
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${activeId === feature.id ? 'bg-luxury-gold text-royal-brown-dark' : 'bg-luxury-gold/10 text-luxury-gold'}`}>
                    {feature.icon}
                  </div>
                </div>

                <AnimatePresence>
                  {activeId !== feature.id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <span className="[writing-mode:vertical-lr] font-serif text-sm font-bold uppercase tracking-[0.4em] text-ivory/40">
                        {feature.name}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div
                  animate={{ 
                    opacity: activeId === feature.id ? 1 : 0,
                    y: activeId === feature.id ? 0 : 20
                  }}
                  transition={{ duration: 0.15, delay: 0 }}
                  className="mt-auto pointer-events-none"
                >
                  <h3 className="font-serif text-4xl md:text-5xl font-bold text-ivory mb-6 leading-tight">
                    {feature.fullName}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <p className="text-ivory/60 text-lg leading-relaxed">
                      {feature.desc}
                    </p>
                    
                    {/* New Content Area: Highlights */}
                    <div className="grid grid-cols-2 gap-4 border-l border-luxury-gold/20 pl-8">
                      {feature.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle2 size={16} className="text-luxury-gold shrink-0" />
                          <span className="text-ivory/80 text-xs font-bold uppercase tracking-widest">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-10 flex items-center gap-4 text-luxury-gold font-bold text-xs uppercase tracking-widest">
                    Pillar Detail 
                    <div className="w-16 h-[1px] bg-luxury-gold" />
                  </div>
                </motion.div>
              </div>

              {activeId === feature.id && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-br from-luxury-gold/5 via-transparent to-transparent pointer-events-none"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
