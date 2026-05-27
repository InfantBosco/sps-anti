"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Senthil Public School provided me with the foundation I needed to excel at a top-tier university. The faculty truly cares about holistic development.",
    author: "Arjun Reddy",
    role: "Alumnus, Class of 2020",
  },
  {
    quote: "The infrastructure and focus on discipline are unmatched. My children look forward to going to school every single day.",
    author: "Priya Sharma",
    role: "Parent",
  },
  {
    quote: "An environment that perfectly balances rigorous academics with sports and arts. It is a privilege to teach here.",
    author: "Dr. Vikram Singh",
    role: "Head of Science Department",
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-ivory-dark/30 relative">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading title="Voices of Our Community" subtitle="Testimonials" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="bg-ivory p-8 rounded-2xl shadow-sm border border-royal-brown/5 relative"
            >
              <Quote className="text-luxury-gold/20 w-16 h-16 absolute top-6 right-6" />
              <div className="relative z-10">
                <p className="text-royal-brown-light/90 italic leading-relaxed mb-8">
                  "{item.quote}"
                </p>
                <div>
                  <h4 className="font-serif font-bold text-royal-brown">{item.author}</h4>
                  <p className="text-xs text-luxury-gold uppercase tracking-wider font-semibold mt-1">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
