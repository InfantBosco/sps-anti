"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface RoyalImageEffectProps {
  src: string;
  alt: string;
  className?: string;
  overlayText?: string;
  overlaySubtext?: string;
}

export default function RoyalImageEffect({ src, alt, className = "", overlayText, overlaySubtext }: RoyalImageEffectProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative overflow-hidden group cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ scale: isHovered ? 1.05 : 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full relative"
      >
        <Image src={src} alt={alt} fill className="object-cover" />
      </motion.div>

      {/* Glassmorphic Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 bg-royal-brown-dark/30 backdrop-blur-sm border border-luxury-gold/30 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="absolute inset-4 border border-luxury-gold/20 rounded-xl pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-brown-dark/80 via-transparent to-transparent pointer-events-none" />
        
        {overlayText && (
          <motion.h3 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-2xl md:text-3xl font-bold text-ivory text-center px-6 relative z-10 drop-shadow-md"
          >
            {overlayText}
          </motion.h3>
        )}
        
        {overlaySubtext && (
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 15, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 flex items-center gap-3 relative z-10"
          >
            <span className="w-8 h-[1px] bg-luxury-gold"></span>
            <span className="text-sm font-semibold text-luxury-gold uppercase tracking-widest">{overlaySubtext}</span>
            <span className="w-8 h-[1px] bg-luxury-gold"></span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
