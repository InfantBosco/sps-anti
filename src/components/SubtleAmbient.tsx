"use client";

import { motion } from "framer-motion";

export default function SubtleAmbient() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Subtle floating orbs with minimal opacity */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: `${20 + i * 30}%`,
            y: `${10 + i * 20}%`,
            opacity: 0.02
          }}
          animate={{
            x: `${20 + i * 30 + (i % 2 === 0 ? 10 : -10)}%`,
            y: `${10 + i * 20 + (i % 2 === 0 ? -15 : 15)}%`,
            opacity: [0.02, 0.08, 0.02]
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute w-96 h-96 rounded-full blur-[100px] pointer-events-none ${
            i === 0 
              ? "bg-luxury-gold/5" 
              : i === 1 
              ? "bg-royal-brown/3" 
              : "bg-ivory/2"
          }`}
        />
      ))}
    </div>
  );
}
