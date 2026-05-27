"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const partners = [
  { name: "CBSE", logo: "https://upload.wikimedia.org/wikipedia/en/b/b8/CBSE_Logo.png" },
  { name: "British Council", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/British_Council_logo.svg/2560px-British_Council_logo.svg.png" },
  { name: "Microsoft Showcase School", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png" },
  { name: "NIE", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/The_Times_of_India_logo.png" },
  { name: "Fit India", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Fit_India_Movement_Logo.svg/1200px-Fit_India_Movement_Logo.svg.png" },
  { name: "Digital India", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Digital_India_logo.svg/2560px-Digital_India_logo.svg.png" },
];

export default function LogosMarquee() {
  return (
    <div className="py-20 bg-ivory border-t border-b border-luxury-gold/10 overflow-hidden relative group">
      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ivory to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ivory to-transparent z-10" />
      
      <div className="container mx-auto px-6 mb-12 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-luxury-gold/60">Our Prestigious Affiliations & Partners</span>
      </div>

      <div className="flex w-[200%]">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-20 items-center justify-around w-full"
        >
          {[...partners, ...partners].map((partner, i) => (
            <div key={i} className="relative h-12 w-48 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer flex items-center justify-center">
              <Image 
                src={partner.logo} 
                alt={partner.name}
                width={160}
                height={60}
                className="object-contain max-h-full"
                unoptimized
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
