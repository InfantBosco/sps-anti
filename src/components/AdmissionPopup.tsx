"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { X, GraduationCap } from "lucide-react";

export default function AdmissionPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show popup after 3 seconds on the landing page
    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem("hasSeenAdmissionPopup");
      if (!hasSeenPopup) {
        setIsOpen(true);
      }
    }, 3000);

    // Click outside listener
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenAdmissionPopup", "true");
  };

  const handleYes = () => {
    router.push("/admissions");
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay to catch clicks outside */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-[2px]"
          />
          
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[100] w-[320px] md:w-[380px]"
          >
            <div className="bg-royal-brown-dark border border-luxury-gold/30 rounded-3xl p-8 shadow-[0_25px_60px_rgba(212,175,55,0.2)] hover:shadow-[0_30px_70px_rgba(212,175,55,0.25)] backdrop-blur-xl relative overflow-hidden group transition-all duration-500">
              {/* Background Decorative Glow */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-luxury-gold/10 blur-[60px] rounded-full group-hover:bg-luxury-gold/20 transition-all duration-700" />
              
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-ivory/40 hover:text-luxury-gold transition-colors"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 bg-luxury-gold/10 rounded-2xl flex items-center justify-center text-luxury-gold mb-6 border border-luxury-gold/20 shadow-inner">
                  <GraduationCap size={32} />
                </div>
                
                <h3 className="font-serif text-2xl font-bold text-ivory mb-3 leading-tight">
                  Seeking <span className="text-luxury-gold">Admissions?</span>
                </h3>
                
                <p className="text-ivory/60 text-sm leading-relaxed mb-8">
                  Join our legacy of excellence. Are you interested in enrolling your child for the 2026-27 academic year?
                </p>

                <div className="flex gap-4 w-full">
                  <button
                    onClick={handleYes}
                    className="flex-1 py-3 bg-luxury-gold text-royal-brown-dark font-bold rounded-xl hover:bg-ivory transition-all shadow-lg shadow-luxury-gold/20"
                  >
                    Yes, tell me more
                  </button>
                  <button
                    onClick={handleClose}
                    className="px-6 py-3 border border-ivory/20 text-ivory font-bold rounded-xl hover:bg-ivory/10 transition-all"
                  >
                    No
                  </button>
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-luxury-gold shadow-[0_0_15px_rgba(197,160,89,0.5)]" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
