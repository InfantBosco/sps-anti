"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function EnquiryFAB() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-[90] md:bottom-12 md:right-12">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="absolute bottom-20 right-0 w-72 md:w-80 bg-white rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.15)] border border-luxury-gold/30 overflow-hidden hover:shadow-[0_30px_70px_rgba(212,175,55,0.2)] transition-shadow duration-500"
          >
            <div className="bg-royal-brown-dark p-6 text-ivory relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-luxury-gold/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <h3 className="font-serif text-xl font-bold relative z-10">Quick Enquiry</h3>
              <p className="text-xs text-ivory/60 mt-1 relative z-10">How can we assist you today?</p>
            </div>
            
            <div className="p-6 space-y-4">
              <Link href="/contact/enquiry" onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-4 rounded-xl bg-ivory hover:bg-luxury-gold/5 border border-royal-brown/5 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-ivory transition-all">
                  <Send size={18} />
                </div>
                <div>
                  <span className="block text-sm font-bold text-royal-brown">General Enquiry</span>
                  <span className="block text-[10px] text-royal-brown-light uppercase tracking-wider">Admissions & Info</span>
                </div>
              </Link>
              
              <Link href="/contact/reach-us" onClick={() => setIsOpen(false)} className="flex items-center gap-4 p-4 rounded-xl bg-ivory hover:bg-luxury-gold/5 border border-royal-brown/5 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-ivory transition-all">
                  <MessageSquare size={18} />
                </div>
                <div>
                  <span className="block text-sm font-bold text-royal-brown">Visit Campus</span>
                  <span className="block text-[10px] text-royal-brown-light uppercase tracking-wider">Book a Tour</span>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 md:w-20 md:h-20 bg-royal-brown text-ivory rounded-full shadow-[0_10px_30px_rgba(42,32,25,0.3)] flex items-center justify-center relative group"
      >
        <div className="absolute inset-1 border-2 border-dashed border-luxury-gold/30 rounded-full group-hover:rotate-45 transition-transform duration-1000" />
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        
        {/* Subtle pulsing badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-luxury-gold rounded-full flex items-center justify-center">
            <span className="absolute inset-0 bg-luxury-gold rounded-full animate-ping opacity-40" />
            <span className="relative text-[10px] font-bold text-royal-brown-dark">!</span>
          </span>
        )}
      </motion.button>
    </div>
  );
}
