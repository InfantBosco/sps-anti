"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function AnimatedCrest() {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-24 h-24 md:w-32 md:h-32 relative flex items-center justify-center">
      {/* SVG drawing */}
      <motion.svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full absolute inset-0"
        animate={{ opacity: showLogo ? 0 : 1 }}
        transition={{ duration: 1 }}
      >
        {/* Outer Shield */}
        <motion.path
          d="M50 5L85 15V45C85 68 50 95 50 95C50 95 15 68 15 45V15L50 5Z"
          stroke="#C5A059"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        
        {/* Inner Details */}
        <motion.path
          d="M30 30L50 50L70 30"
          stroke="#C5A059"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
        />
        
        <motion.path
          d="M30 70C30 70 40 60 50 60C60 60 70 70 70 70"
          stroke="#C5A059"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.5, ease: "easeInOut" }}
        />
        
        <motion.circle
          cx="50"
          cy="50"
          r="5"
          fill="#C5A059"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 2.5 }}
        />
      </motion.svg>

      {/* Actual Logo Reveal */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full relative z-10"
          >
            <Image
              src="/logo.png"
              alt="SPS Logo"
              fill
              className="object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        viewport={{ once: true }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute inset-0 bg-luxury-gold blur-2xl rounded-full -z-10"
      />
    </div>
  );
}
