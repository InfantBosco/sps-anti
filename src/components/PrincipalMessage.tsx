"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./ui/SectionHeading";
import ImageReveal from "./ui/ImageReveal";
import ScrollReveal from "./ui/ScrollReveal";

export default function PrincipalMessage() {
  return (
    <section className="py-24 bg-ivory relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          <div className="lg:col-span-5 relative">
            <ImageReveal>
              <div className="relative h-[550px] w-full max-w-md mx-auto lg:mx-0 shadow-2xl">
                <Image 
                  src="/principal.png" 
                  alt="Principal" 
                  fill 
                  className="object-cover"
                />
                {/* Gradient Overlay - Ivory to transparent */}
                <div className="absolute inset-0 bg-gradient-to-b from-ivory/15 via-transparent to-transparent" />
              </div>
            </ImageReveal>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-luxury-gold/20 rounded-full blur-2xl -z-10"></div>
          </div>

          <div className="lg:col-span-7 lg:pl-12">
            <ScrollReveal direction="right" delay={0.3}>
              <SectionHeading title="Message from the Principal" align="left" />
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={0.5}>
              <div className="relative">
                <span className="absolute -top-10 -left-6 text-8xl text-luxury-gold/20 font-serif leading-none">"</span>
                <p className="text-royal-brown-light text-lg md:text-xl leading-relaxed italic relative z-10 font-serif">
                  Education is not merely about accumulating facts; it is about awakening curiosity, fostering integrity, and shaping character. At Senthil Public School, we are committed to providing an environment where every child feels valued and inspired to achieve their highest potential. Our world-class faculty and state-of-the-art facilities ensure that our students are prepared not just for exams, but for life.
                </p>
              </div>
              
              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-[2px] bg-luxury-gold"></div>
                <div>
                  <h4 className="font-serif font-bold text-xl text-royal-brown">Dr. Jonathan Sterling</h4>
                  <p className="text-sm text-royal-brown-light uppercase tracking-widest">Principal, Senthil Public School</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
