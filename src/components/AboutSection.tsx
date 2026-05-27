"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./ui/SectionHeading";
import MagneticButton from "./ui/MagneticButton";
import ParallaxImage from "./ui/ParallaxImage";

export default function AboutSection() {
  return (
    <section className="py-24 md:py-32 bg-ivory relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full border-[1px] border-royal-brown/5"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full border-[1px] border-luxury-gold/10"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Image Content */}
          <div className="relative h-[600px] z-20">
            <ParallaxImage 
              src="/royal-library.png" 
              alt="Premium School Library" 
              className="w-full h-full" 
            />
            
            {/* Floating Stats Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute bottom-8 right-8 z-20 bg-ivory/95 backdrop-blur-md p-6 rounded-xl border border-royal-brown/10 shadow-xl max-w-[200px]"
            >
              <div className="font-serif text-4xl font-bold text-luxury-gold mb-1">10+</div>
              <div className="text-sm font-medium text-royal-brown leading-tight">Years of Academic Excellence</div>
            </motion.div>
          </div>

          {/* Text Content */}
          <div>
            <SectionHeading 
              title="A Legacy of Excellence & Discipline" 
              subtitle="Our Philosophy" 
              align="left" 
            />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 text-royal-brown-light/90 text-lg leading-relaxed mb-10"
            >
              <p>
                At Senthil Public School, we believe that education extends far beyond the four walls of a classroom. Our philosophy is rooted in the holistic development of every child, nurturing not just their intellect but their character, discipline, and moral compass.
              </p>
              <p>
                With state-of-the-art infrastructure, world-class faculty, and a curriculum designed to foster critical thinking, we prepare our students to become global citizens who lead with integrity and purpose.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-6"
            >
              <MagneticButton>Read Our Full Story</MagneticButton>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
