"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'center',
  light = false
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto"
  };

  return (
    <div className={`flex flex-col mb-12 md:mb-16 max-w-3xl ${alignmentClasses[align]}`}>
      {subtitle && (
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`uppercase tracking-[0.2em] text-sm font-semibold mb-4 block ${
            light ? "text-luxury-gold-light" : "text-luxury-gold"
          }`}
        >
          {subtitle}
        </motion.span>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${
          light ? "text-ivory" : "text-royal-brown"
        }`}
      >
        {title}
      </motion.h2>
      
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "80px" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        className={`h-1 mt-6 rounded-full ${
          light ? "bg-luxury-gold/50" : "bg-royal-brown/20"
        }`}
      />
    </div>
  );
}
