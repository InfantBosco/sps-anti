"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import MagneticButton from "./ui/MagneticButton";

import Link from "next/link";

const news = [
  {
    id: "annual-sports-meet-2026",
    date: "15 Oct",
    title: "Annual Sports Meet 2026",
    category: "Events",
  },
  {
    id: "science-innovation-exhibition",
    date: "02 Nov",
    title: "Science & Innovation Exhibition",
    category: "Academics",
  },
  {
    id: "parent-teacher-interaction",
    date: "20 Nov",
    title: "Parent-Teacher Interaction Session",
    category: "Notice",
  }
];

export default function NewsAndEvents() {
  return (
    <section className="py-24 bg-ivory">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <SectionHeading title="Latest at Senthil" subtitle="News & Events" align="left" />
          <MagneticButton variant="ghost" className="hidden md:flex mb-12">
            View All Updates
          </MagneticButton>
        </div>

        <div className="space-y-6">
          {news.map((item, index) => (
            <Link href={`/news/${item.id}`} key={index}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group flex flex-col md:flex-row items-start md:items-center p-6 md:p-8 bg-white rounded-xl shadow-sm hover:shadow-md border border-royal-brown/5 transition-all cursor-pointer"
              >
                <div className="flex-shrink-0 w-24 h-24 bg-royal-brown-dark rounded-lg flex flex-col items-center justify-center text-ivory mb-4 md:mb-0 md:mr-8 group-hover:bg-luxury-gold transition-colors">
                  <span className="text-3xl font-serif font-bold">{item.date.split(" ")[0]}</span>
                  <span className="text-sm uppercase tracking-widest">{item.date.split(" ")[1]}</span>
                </div>
                
                <div className="flex-grow">
                  <span className="text-xs font-bold text-luxury-gold uppercase tracking-widest mb-2 block">{item.category}</span>
                  <h3 className="font-serif text-2xl font-bold text-royal-brown group-hover:text-luxury-gold transition-colors">{item.title}</h3>
                </div>

                <div className="mt-4 md:mt-0 flex-shrink-0 w-12 h-12 rounded-full border border-royal-brown/20 flex items-center justify-center group-hover:bg-luxury-gold group-hover:border-transparent group-hover:text-ivory transition-all">
                  <svg className="w-5 h-5 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
        
        <div className="mt-10 md:hidden flex justify-center">
          <MagneticButton variant="outline">View All Updates</MagneticButton>
        </div>
      </div>
    </section>
  );
}
