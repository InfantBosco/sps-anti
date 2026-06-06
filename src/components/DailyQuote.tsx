'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const quotes = [
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
  { text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.", author: "Unknown" },
  { text: "Excellence is not a skill, it's an attitude.", author: "Ralph Marston" },
  { text: "Every expert was once a beginner.", author: "Unknown" },
  { text: "Knowledge is power.", author: "Francis Bacon" },
];

export default function DailyQuote() {
  const [quote, setQuote] = useState(quotes[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const today = new Date().getDate();
    const quoteIndex = today % quotes.length;
    setIndex(quoteIndex);
    setQuote(quotes[quoteIndex]);
  }, []);

  const handleNext = () => {
    const nextIndex = (index + 1) % quotes.length;
    setIndex(nextIndex);
    setQuote(quotes[nextIndex]);
  };

  return (
    <section className="py-12 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm font-semibold text-indigo-600 mb-4 uppercase tracking-widest">
            Daily Inspiration
          </h2>
          <blockquote className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 italic">
            "{quote.text}"
          </blockquote>
          <p className="text-gray-600 font-medium mb-6">— {quote.author}</p>
          
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300"
          >
            Next Quote
          </button>
        </motion.div>
      </div>
    </section>
  );
}
