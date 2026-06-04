"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import TiltCard from "./TiltCard";

interface PremiumCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  icon?: React.ReactNode;
  delay?: number;
  href?: string;
}

export default function PremiumCard({
  title,
  description,
  imageSrc,
  icon,
  delay = 0,
  href
}: PremiumCardProps) {
  
  const ExploreContent = (
    <div className="mt-8 flex items-center text-sm font-semibold text-luxury-gold uppercase tracking-widest group/link shrink-0 w-fit">
      <span className="mr-2 relative">
        Explore
        <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-luxury-gold group-hover/link:w-full transition-all duration-300"></span>
      </span>
      <svg className="w-4 h-4 transform group-hover/link:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <TiltCard className="h-full block">
        <div className="group relative bg-ivory-light rounded-2xl overflow-hidden border border-royal-brown/5 shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col">
          {imageSrc && (
            <div className="relative h-64 w-full overflow-hidden shrink-0">
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Gradient Overlay - Ivory to transparent */}
              <div className="absolute inset-0 bg-gradient-to-b from-ivory/15 via-transparent to-transparent z-5 pointer-events-none" />
              {/* Subtle overlay effect */}
              <div className="absolute inset-0 bg-royal-brown/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
            </div>
          )}
          
          <div className={`p-8 flex flex-col flex-grow ${imageSrc ? 'pt-8' : 'pt-12'}`}>
            {icon && (
              <div className="w-14 h-14 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mb-6 group-hover:bg-luxury-gold group-hover:text-ivory transition-colors duration-500 shrink-0">
                {icon}
              </div>
            )}
            
            <h3 className="font-serif text-2xl font-bold text-royal-brown mb-4 group-hover:text-luxury-gold transition-colors duration-300">
              {title}
            </h3>
            
            <p className="text-royal-brown-light/80 leading-relaxed flex-grow">
              {description}
            </p>
            
            {href ? (
              href.startsWith('http') ? (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {ExploreContent}
                </a>
              ) : (
                <Link href={href}>
                  {ExploreContent}
                </Link>
              )
            ) : (
              ExploreContent
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
