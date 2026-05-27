"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Don't show on Home page
  if (isHomePage) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        className="fixed top-33 left-6 z-[40]"
      >
        <motion.button
          whileHover={{ scale: 1.05, x: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="group flex items-center gap-2 bg-royal-brown-dark/90 backdrop-blur-md border border-luxury-gold/20 p-2.5 rounded-xl shadow-xl hover:bg-royal-brown transition-all"
        >
          <div className="w-8 h-8 rounded-lg bg-luxury-gold flex items-center justify-center text-royal-brown-dark shadow-md group-hover:shadow-luxury-gold/30 transition-shadow">
            <ArrowLeft size={18} strokeWidth={3} />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-ivory/80 pr-2 group-hover:text-luxury-gold transition-colors">
            Back
          </span>

          {/* Subtle Shine */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
