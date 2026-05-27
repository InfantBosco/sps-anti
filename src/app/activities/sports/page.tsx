"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type Sport = {
  _id: string;
  title: string;
  image_url: string;
  achievements: string[];
  order?: number;
};

export default function SportsPage() {
  const [sportsData, setSportsData] = useState<Sport[]>([]);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/api/sports/`);
        if (res.ok) {
          const data = await res.json();
          setSportsData(data);
        }
      } catch (err) {
        console.error("Failed to fetch sports:", err);
      }
    };
    fetchSports();
  }, []);
  return (
    <main className="min-h-screen bg-ivory">
            
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-royal-brown-dark/50 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=2000"
          alt="Sports at Senthil Public School"
          fill
          className="object-cover object-center"
          priority
        />
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center px-4"
        >
          <span className="text-luxury-gold font-bold uppercase tracking-[0.4em] text-sm mb-4 block">Athletic Excellence</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-ivory drop-shadow-xl mb-4">
            Champions in Making
          </h1>
          <p className="text-xl text-ivory-dark font-medium max-w-2xl mx-auto drop-shadow-md">
            Fostering discipline, teamwork, and physical fitness through world-class athletic programs.
          </p>
        </motion.div>
      </section>

      <div className="container mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 gap-32">
          {sportsData.map((sport, index) => (
            <motion.div 
              key={sport.title} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col md:flex-row gap-16 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 relative h-[450px] rounded-[2rem] overflow-hidden shadow-2xl group border-4 border-white">
                <Image
                  src={sport.image_url}
                  alt={sport.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-royal-brown-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Content Side */}
              <div className="w-full md:w-1/2 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-royal-brown">
                    {sport.title}
                  </h2>
                  <div className="w-20 h-1 bg-luxury-gold rounded-full" />
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-luxury-gold-dark">Recent Achievements</h3>
                  <ul className="space-y-4">
                    {sport.achievements.map((achievement, i) => (
                      <motion.li 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-6 h-6 rounded-full bg-luxury-gold/10 flex items-center justify-center shrink-0 mt-1">
                          <div className="w-2 h-2 rounded-full bg-luxury-gold" />
                        </div>
                        <span className="text-lg text-royal-brown-light font-medium">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      </main>
  );
}

