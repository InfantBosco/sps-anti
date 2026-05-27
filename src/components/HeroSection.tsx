"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import MagneticButton from "./ui/MagneticButton";
import ScrollReveal from "./ui/ScrollReveal";

const heroImages = [
  "/royal-campus.png",
  "/royal-library.png",
  "/royal-auditorium.png",
  "/royal-sports.png",
  "/royal-students.png",
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    setHasMounted(true);
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-royal-brown-dark"
    >
      {/* Background Slider */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={heroImages[currentIndex]}
              alt="School Campus"
              fill
              priority
              className="object-cover"
            />
            {/* Elegant Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-royal-brown-dark/60 via-transparent to-royal-brown-dark/80" />
            <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Atmospheric Particles Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {hasMounted && [...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: (i * 7) % 100 + "%", 
              y: (i * 13) % 100 + "%",
              opacity: 0.1
            }}
            animate={{ 
              y: ["-10%", "110%"],
              opacity: [0, 0.3, 0]
            }}
            transition={{ 
              duration: 20 + (i % 10), 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 0.5
            }}
            className="absolute w-1 h-1 bg-luxury-gold/40 rounded-full blur-[1px]"
          />
        ))}
      </div>

      {/* Centered Content */}
      <div className="relative z-20 w-full max-w-7xl px-6 flex flex-col items-center justify-center text-center">
        
        {/* Original Logo with Calm Glow */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-10 relative"
        >
          <div className="relative w-28 h-28 md:w-36 md:h-36 z-10 drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]">
            <Image
              src="/logo.png"
              alt="Senthil Public School Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          
          {/* Calm, Neat Glow Effect */}
          <motion.div 
            animate={{ 
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 bg-luxury-gold/20 blur-[50px] -z-10 rounded-full"
          />
        </motion.div>

        <div className="relative z-10">
          <ScrollReveal direction="up" delay={0.4}>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-ivory font-bold mb-4 tracking-tight">
              Excellence in <span className="text-luxury-gold">Education</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.6}>
            <p className="text-lg md:text-xl text-ivory-dark/90 font-medium max-w-3xl mx-auto mb-10 leading-relaxed">
              Welcome to Senthil Public School, where we blend tradition with modern innovation to shape the visionary leaders of tomorrow.
            </p>
          </ScrollReveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-6 relative z-10"
        >
          <MagneticButton
            onClick={() => router.push("/admissions")}
            className="px-10 py-4 bg-luxury-gold text-royal-brown-dark font-bold rounded-full hover:bg-ivory transition-all shadow-xl shadow-luxury-gold/20"
          >
            Admissions 2026-27
          </MagneticButton>
          <MagneticButton
            variant="outline"
            onClick={() => router.push("/about")}
            className="px-10 py-4 border-2 border-ivory text-ivory font-bold rounded-full hover:bg-ivory hover:text-royal-brown-dark transition-all backdrop-blur-md"
          >
            Explore Our World
          </MagneticButton>
        </motion.div>
      </div>

      {/* Progress Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {heroImages.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === currentIndex ? "w-12 bg-luxury-gold" : "w-3 bg-ivory/30"
            }`}
          />
        ))}
      </div>

      {/* Scroll Down Hint */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 right-12 z-30 hidden md:flex flex-col items-center gap-4"
      >
        <span className="[writing-mode:vertical-lr] text-ivory/50 text-[10px] uppercase tracking-[0.3em] font-bold">Scroll to Explore</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-luxury-gold to-transparent" />
      </motion.div>
    </section>
  );
}
