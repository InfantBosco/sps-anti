"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface CouncilMember {
  _id: string;
  name: string;
  designation: string;
  image_url?: string;
}

export default function StudentCouncilPage() {
  const [members, setMembers] = useState<CouncilMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/api/student_council/`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (Array.isArray(data)) {
          setMembers(data);
        }
      } catch (err) {
        console.error("Error fetching student council:", err);
        // Fallback to empty or mock data if API fails to prevent white screen/crash
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  return (
    <main className="min-h-screen bg-ivory">
            
      <div className="pt-40 pb-20">
        <div className="container mx-auto px-6 md:px-12">
          {/* Intro Section */}
          <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="w-full md:w-1/2 relative h-[400px] rounded-3xl overflow-hidden shadow-2xl group"
            >
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000"
                alt="Student Council Meeting"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-royal-brown-dark/20 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="w-full md:w-1/2 space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-royal-brown leading-tight">
                Our Student <br />
                <span className="text-luxury-gold">Council</span>
              </h1>
              <div className="w-20 h-1 bg-luxury-gold rounded-full" />
              <p className="text-lg leading-relaxed text-royal-brown-light/90 font-medium">
                The Student Council is the dynamic voice of our student body. It serves as a vital bridge between students and administration, fostering responsibility, leadership, and teamwork among our future leaders. Members are carefully chosen for their dedication, integrity, and unwavering commitment to the school's ethos.
              </p>
            </motion.div>
          </div>

          {/* Members Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal-brown inline-block relative">
              Meet Our Leaders
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-luxury-gold rounded-full"></span>
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : members.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {members.map((member, idx) => (
                <motion.div 
                  key={member._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 4) * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg border border-royal-brown/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
                >
                  <div className="relative h-[320px] w-full overflow-hidden bg-gray-100">
                    <Image
                      src={member.image_url || "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-royal-brown-dark via-royal-brown-dark/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-bold text-ivory mb-1">{member.name}</h3>
                      <p className="text-sm font-semibold text-luxury-gold uppercase tracking-wider">{member.designation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-20 bg-white/40 backdrop-blur-sm rounded-3xl border border-royal-brown/10 shadow-sm"
            >
              <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-luxury-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-royal-brown mb-2">Elections Ongoing</h3>
              <p className="text-royal-brown-light max-w-md mx-auto">
                The student council members for the current academic year are being finalized. Check back soon!
              </p>
            </motion.div>
          )}
        </div>
      </div>

      </main>
  );
}

