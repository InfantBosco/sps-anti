"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "./ui/SectionHeading";

const timelineData = [
  { year: "2010", title: "The Foundation", desc: "Senthil Public School was established with a vision to provide world-class education in Dharmapuri.", icon: "🏛️" },
  { year: "2013", title: "CBSE Affiliation", desc: "Received formal affiliation from CBSE, marking a milestone in our academic excellence.", icon: "📜" },
  { year: "2015", title: "Infrastructure Expansion", desc: "Inauguration of our state-of-the-art sports complex and advanced science labs.", icon: "🏗️" },
  { year: "2018", title: "Global Recognition", desc: "Awarded as the 'Best School in the Region' for innovative teaching methodologies.", icon: "🏆" },
  { year: "2021", title: "Digital Transformation", desc: "Complete integration of smart classrooms and digital learning platforms across all grades.", icon: "💻" },
  { year: "2024", title: "Future Ready", desc: "Launching international exchange programs and advanced AI-integrated curriculum.", icon: "🚀" },
];

export default function HistoryTimeline() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-royal-brown-dark">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 mb-12">
          <SectionHeading title="Our Journey of Excellence" subtitle="Timeline" light={true} align="left" />
        </div>
        
        <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24">
          {timelineData.map((item, i) => (
            <div 
              key={i} 
              className="min-w-[350px] md:min-w-[450px] bg-ivory/5 backdrop-blur-md border border-luxury-gold/20 p-10 rounded-[2.5rem] relative group hover:border-luxury-gold transition-colors"
            >
              <div className="text-6xl mb-6">{item.icon}</div>
              <span className="font-serif text-5xl font-bold text-luxury-gold mb-4 block">{item.year}</span>
              <h3 className="font-serif text-2xl font-bold text-ivory mb-4">{item.title}</h3>
              <p className="text-ivory/60 leading-relaxed text-lg">{item.desc}</p>
              
              <div className="absolute top-10 right-10 w-12 h-12 rounded-full border border-luxury-gold/20 flex items-center justify-center text-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </div>
            </div>
          ))}
        </motion.div>

        {/* Progress bar at bottom */}
        <div className="absolute bottom-20 left-12 right-12 h-px bg-luxury-gold/10">
          <motion.div 
            style={{ scaleX: scrollYProgress }} 
            className="h-full bg-luxury-gold origin-left" 
          />
        </div>
      </div>
    </section>
  );
}
