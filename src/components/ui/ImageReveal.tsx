"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ImageRevealProps {
  children: ReactNode;
  delay?: number;
}

export default function ImageReveal({ children, delay = 0.2 }: ImageRevealProps) {
  return (
    <div className="relative overflow-hidden group rounded-[2.5rem]">
      <motion.div
        initial={{ scale: 1.2, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 1.5, 
          delay, 
          ease: [0.22, 1, 0.36, 1] 
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
      
      {/* Royal Curtain Overlay */}
      <motion.div
        initial={{ scaleY: 1 }}
        whileInView={{ scaleY: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ 
          duration: 1.2, 
          delay: delay + 0.1, 
          ease: [0.76, 0, 0.24, 1] 
        }}
        className="absolute inset-0 bg-royal-brown origin-top z-20 pointer-events-none"
      />
    </div>
  );
}
