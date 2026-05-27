"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1000] bg-royal-brown-dark/98 flex items-center justify-center flex-col overflow-hidden backdrop-blur-sm"
        >
          {/* Decorative background logo (straight and more subtle) */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.015] scale-125">
            <Image src="/logo.png" alt="" width={800} height={800} className="grayscale" />
          </div>

          <div className="relative flex flex-col items-center z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-32 h-32 md:w-40 md:h-40 mb-10"
            >
              <Image
                src="/logo.png"
                alt="Senthil Public School"
                fill
                className="object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                priority
              />
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-luxury-gold/20 blur-3xl rounded-full -z-10"
              />
            </motion.div>
            
            <motion.div className="overflow-hidden h-10 flex items-center">
              <motion.span
                initial={{ y: 40 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                className="font-serif text-2xl md:text-3xl font-bold text-ivory tracking-[0.1em] uppercase"
              >
                Senthil Public School
              </motion.span>
            </motion.div>

            {/* Premium Loading Bar */}
            <div className="mt-10 w-64 h-[3px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="absolute top-0 left-0 h-full bg-luxury-gold shadow-[0_0_15px_rgba(212,175,55,0.8)]"
              />
            </div>
            
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-[10px] font-bold text-luxury-gold/60 uppercase tracking-[0.3em]"
            >
              Establishing Excellence {progress}%
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
