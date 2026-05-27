"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import SectionHeading from "./ui/SectionHeading";
import { School, Users, Award, GraduationCap } from "lucide-react";

const stats = [
  { label: "Number of Branches", value: 6, suffix: "+", icon: <School size={40} className="text-luxury-gold" /> },
  { label: "Staff", value: 1200, suffix: "+", icon: <Users size={40} className="text-luxury-gold" /> },
  { label: "Years of Experience", value: 22, suffix: "+", icon: <Award size={40} className="text-luxury-gold" /> },
  { label: "Number of Students", value: 17000, suffix: "+", icon: <GraduationCap size={40} className="text-luxury-gold" /> },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function StatsSection() {
  return (
    <section className="py-24 bg-royal-brown-dark relative overflow-hidden">
      {/* Background Decorative Crest */}
      <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[800px] border border-luxury-gold rounded-full" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading 
          title="Senthil Group of Schools - At a Glance" 
          subtitle="Our Impact" 
          light={true}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="group relative p-10 bg-ivory/5 backdrop-blur-md border border-luxury-gold/10 rounded-[2.5rem] text-center hover:border-luxury-gold/40 transition-all duration-500"
            >
              <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-500">{stat.icon}</div>
              <div className="font-serif text-5xl md:text-6xl font-bold text-luxury-gold mb-4">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-ivory/60 text-sm font-bold uppercase tracking-[0.2em]">
                {stat.label}
              </div>
              
              {/* Decorative Corner */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-luxury-gold/20 rounded-tr-xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
