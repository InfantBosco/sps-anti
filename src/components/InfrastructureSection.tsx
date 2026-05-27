"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./ui/SectionHeading";

export default function InfrastructureSection() {
  const facilities = [
    "World-Class Smart Classrooms",
    "Advanced Science & Tech Labs",
    "Grand Library & Resource Center",
    "Premium Sports Complex",
    "Auditorium & Performing Arts Center",
    "Hygienic Dining & Cafeteria"
  ];

  return (
    <section className="py-24 md:py-32 bg-royal-brown-dark text-ivory relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {/* Subtle background texture or pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-luxury-gold to-transparent opacity-20 mix-blend-overlay"></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <SectionHeading 
              title="State-of-the-Art Campus" 
              subtitle="Infrastructure" 
              align="left"
              light={true}
            />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6 text-ivory-dark/80 text-lg leading-relaxed mb-10"
            >
              <p>
                Our sprawling campus is designed to provide a secure, inspiring, and engaging environment. Every facility is meticulously crafted to support both academic excellence and holistic development.
              </p>
            </motion.div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {facilities.map((facility, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="flex items-center gap-3 text-ivory/90"
                >
                  <span className="w-2 h-2 rounded-full bg-luxury-gold shrink-0"></span>
                  <span className="font-medium">{facility}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Image Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 relative h-[500px] lg:h-[700px] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(197,160,89,0.15)]"
          >
            <div className="absolute inset-0 bg-luxury-gold/10 mix-blend-overlay z-10" />
            <Image
              src="/royal-auditorium.png"
              alt="School Auditorium"
              fill
              className="object-cover transition-transform duration-1000 ease-out hover:scale-105"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
