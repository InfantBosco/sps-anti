"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";
import { Quote, Star, ArrowRight } from "lucide-react";

const vipFeedbacks = [
  {
    id: 1,
    name: "Dr. Arvind Kumar",
    designation: "Former Director, IIT",
    message: "The discipline and academic rigor at Senthil Public School are truly exemplary. It is heartening to see an institution focus so deeply on character building alongside modern education.",
    image: "/principal.png",
    accent: "bg-blue-500/5"
  },
  {
    id: 2,
    name: "Smt. Meenakshi Lekhi",
    designation: "Educational Consultant",
    message: "A perfect blend of tradition and technology. The students here show exceptional confidence and clarity of thought, which is a testament to the school's holistic approach.",
    image: "/principal.png",
    accent: "bg-purple-500/5"
  },
  {
    id: 3,
    name: "Dr. Rajeshwari Singh",
    designation: "Vice Chancellor, State University",
    message: "Visiting SPS was an enlightening experience. The infrastructure is world-class, but more importantly, the atmosphere of curiosity and respect is what stands out.",
    image: "/principal.png",
    accent: "bg-emerald-500/5"
  },
  {
    id: 4,
    name: "Shri. Venugopal Rao",
    designation: "CEO, Tech Innovations",
    message: "The way the school integrates innovation and digital literacy into their curriculum is outstanding. They are truly preparing students for the global challenges of tomorrow.",
    image: "/principal.png",
    accent: "bg-amber-500/5"
  },
  {
    id: 5,
    name: "Prof. S. Ramaswamy",
    designation: "Distinguished Scientist, ISRO",
    message: "Science and curiosity are alive here. The laboratories and the scientific temperament of the students are very impressive. A beacon of excellence in Dharmapuri.",
    image: "/principal.png",
    accent: "bg-red-500/5"
  }
];

function TiltCard({ feedback, index }: { feedback: any, index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative w-full"
    >
      <div className={`relative p-8 md:p-14 bg-white rounded-[3.5rem] border border-royal-brown/10 shadow-xl overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:border-luxury-gold/30 flex flex-col md:flex-row gap-12 items-center`}>
        
        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-luxury-gold/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Image Perspective */}
        <div 
          style={{ transform: "translateZ(50px)" }}
          className="relative w-48 h-48 md:w-72 md:h-72 shrink-0 rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-500 group-hover:scale-105"
        >
          <Image 
            src={feedback.image} 
            alt={feedback.name} 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-brown-dark/40 to-transparent" />
        </div>

        {/* Content Perspective */}
        <div 
          style={{ transform: "translateZ(30px)" }}
          className="flex-1 relative z-10"
        >
          <Quote className="text-luxury-gold mb-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500" size={64} />
          
          <p className="font-serif text-2xl md:text-3xl text-royal-brown leading-relaxed mb-10 italic font-medium">
            "{feedback.message}"
          </p>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-royal-brown/5 pt-8">
            <div>
              <h4 className="font-serif text-3xl font-bold text-royal-brown group-hover:text-luxury-gold transition-colors duration-500">{feedback.name}</h4>
              <p className="text-luxury-gold-dark font-bold uppercase tracking-[0.3em] text-[10px] mt-2 bg-luxury-gold/5 px-4 py-1.5 rounded-full w-fit">
                {feedback.designation}
              </p>
            </div>
            
            <div className="flex gap-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-luxury-gold text-luxury-gold" />
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Shadow */}
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-luxury-gold/5 rounded-full blur-[100px] group-hover:bg-luxury-gold/10 transition-all duration-700" />
      </div>
    </motion.div>
  );
}

export default function VipFeedbackPage() {
  return (
    <main className="min-h-screen bg-ivory">
            
      <div className="pt-40 pb-32">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="max-w-4xl mx-auto mb-24 text-center">
            <SectionHeading 
              title="Dignitaries' Perspectives" 
              subtitle="VIP Testimonials" 
              align="center"
            />
            <p className="text-royal-brown-light/70 mt-8 text-xl max-w-2xl mx-auto leading-relaxed">
              Discover why educational leaders and industry pioneers across the nation regard Senthil Public School as a benchmark of excellence.
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-20">
            {vipFeedbacks.map((feedback, i) => (
              <TiltCard key={feedback.id} feedback={feedback} index={i} />
            ))}
          </div>


        </div>
      </div>
    </main>
  );
}
