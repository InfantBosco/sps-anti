"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What is the age criteria for Kindergarten admission?",
    answer: "For Pre-KG, the child must be 3 years old by March 31st of the academic year. For LKG, the child must be 4 years old.",
  },
  {
    question: "Is there an entrance exam for higher grades?",
    answer: "Yes, students applying for Grade 6 and above will need to take a brief assessment in English, Mathematics, and Science to evaluate their foundational knowledge.",
  },
  {
    question: "Does the school provide transport facilities?",
    answer: "Yes, we have a fleet of GPS-enabled school buses that cover all major routes within a 25km radius of the campus.",
  },
  {
    question: "What is the student-teacher ratio?",
    answer: "We maintain a strict student-teacher ratio of 25:1 to ensure personalized attention and optimal learning outcomes for every child.",
  }
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className={`border rounded-xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-luxury-gold bg-white shadow-lg shadow-luxury-gold/10' : 'border-royal-brown/10 bg-ivory-light shadow-sm hover:shadow-md hover:border-luxury-gold/20'}`}
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
          >
            <span className={`font-serif font-bold text-lg transition-colors duration-300 ${openIndex === index ? 'text-luxury-gold' : 'text-royal-brown'}`}>
              {faq.question}
            </span>
            <ChevronDown 
              className={`transform transition-all duration-300 ${openIndex === index ? 'rotate-180 text-luxury-gold' : 'text-royal-brown/50'}`} 
            />
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-6 pb-5 text-royal-brown-light/80 leading-relaxed border-t border-luxury-gold/10 pt-4">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
