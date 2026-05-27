"use client";

import { useState, useEffect } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Loader2, Award, TrendingUp, Users, GraduationCap, ChevronRight } from "lucide-react";

type Result = {
  _id: string;
  year: number;
  studentName: string;
  grade: string;
  marks?: number;
  percentage?: number;
  examName: string;
  image_url?: string;
};

// Fallback data if DB is empty
const fallbackResultsData: Record<string, any[]> = {
  "Board Exams": [
    { year: "2025", passRate: "100%", topScore: "99.2%", avgScore: "88.5%", highlights: "25 students scored above 95%" },
    { year: "2024", passRate: "100%", topScore: "98.8%", avgScore: "87.2%", highlights: "District Topper from our school" },
    { year: "2023", passRate: "99.5%", topScore: "99.0%", avgScore: "86.8%", highlights: "15 students scored above 95%" }
  ],
  "JEE Advanced": [
    { year: "2025", selections: "42", topRank: "AIR 154", highlights: "Highest selections in the district" },
    { year: "2024", selections: "35", topRank: "AIR 210", highlights: "5 students under AIR 1000" },
    { year: "2023", selections: "28", topRank: "AIR 450", highlights: "3 students under AIR 1000" }
  ],
  "NEET": [
    { year: "2025", selections: "65", topScore: "715/720", highlights: "State Rank 3" },
    { year: "2024", selections: "52", topScore: "705/720", highlights: "8 students scored 650+" },
    { year: "2023", selections: "40", topScore: "690/720", highlights: "5 students scored 650+" }
  ]
};

// Counter Component
const AnimatedCounter = ({ end, label, suffix = "", icon: Icon }: { end: number, label: string, suffix?: string, icon: any }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 flex flex-col items-center text-center group hover:bg-white/20 transition-all duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
    >
      <div className="w-14 h-14 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold mb-4 group-hover:scale-110 transition-transform">
        <Icon size={28} />
      </div>
      <div className="font-serif text-5xl font-bold text-white mb-2 flex items-baseline gap-1">
        {count}
        <span className="text-2xl text-luxury-gold">{suffix}</span>
      </div>
      <p className="text-white/70 font-medium uppercase tracking-widest text-sm">{label}</p>
    </motion.div>
  );
};

export default function ResultsPage() {
  const [resultsData, setResultsData] = useState<Record<string, any[]>>(fallbackResultsData);
  const [activeTab, setActiveTab] = useState<string>("Board Exams");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/api/results/`);
        if (res.ok) {
          const data: Result[] = await res.json();
          if (data && data.length > 0) {
            const grouped: Record<string, any[]> = {};
            data.forEach(item => {
              if (!grouped[item.examName]) {
                grouped[item.examName] = [];
              }
              grouped[item.examName].push({
                year: item.year.toString(),
                studentName: item.studentName,
                grade: item.grade,
                percentage: item.percentage ? `${item.percentage}%` : "N/A",
                marks: item.marks?.toString() || "N/A",
                highlights: "Top Achiever"
              });
            });
            setResultsData(grouped);
            setActiveTab(Object.keys(grouped)[0] || "Board Exams");
          }
        }
      } catch (err) {
        console.warn("Failed to fetch results, using fallback data:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, []);

  const tabs = Object.keys(resultsData);

  return (
    <main className="min-h-screen bg-ivory flex flex-col">
            
      {/* Header & Stats Hero */}
      <section className="relative pt-40 pb-32 bg-royal-brown-dark text-ivory overflow-hidden">
        <div className="absolute inset-0 bg-[url('/about-bg.png')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-royal-brown-dark/80 to-royal-brown-dark" />
        
        {/* Floating glow effects */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-luxury-gold/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="inline-block py-1 px-4 rounded-full border border-luxury-gold/40 text-luxury-gold text-xs font-bold tracking-[0.2em] uppercase mb-6 bg-luxury-gold/5 backdrop-blur-sm">
                Academic Brilliance
              </span>
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-ivory mb-6">
                A Legacy of <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold-light via-luxury-gold to-luxury-gold-light">Excellence</span>
              </h1>
              <p className="text-lg text-ivory/80 max-w-2xl mx-auto font-medium leading-relaxed">
                Year after year, our students surpass expectations, breaking records in board examinations and competitive entrance tests across the nation.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedCounter end={100} label="Pass Rate" suffix="%" icon={TrendingUp} />
            <AnimatedCounter end={500} label="Distinctions" suffix="+" icon={Award} />
            <AnimatedCounter end={150} label="Competitive Selections" suffix="+" icon={GraduationCap} />
            <AnimatedCounter end={15} label="Years of Excellence" suffix="+" icon={Users} />
          </div>
        </div>
      </section>

      {/* Main Results Content */}
      <section className="py-24 relative overflow-hidden bg-ivory">
        <div className="absolute top-0 right-0 w-full h-full bg-[url('/pattern.png')] opacity-[0.03] pointer-events-none" />
        
        <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="animate-spin text-luxury-gold w-16 h-16" />
              <p className="text-royal-brown font-serif italic text-lg">Fetching Academic Records...</p>
            </div>
          ) : (
            <>
              {/* Premium Tabs */}
              <div className="flex flex-wrap justify-center gap-4 mb-20">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-10 py-4 rounded-full font-serif font-bold text-lg overflow-hidden transition-all duration-300 ${
                      activeTab === tab 
                        ? "text-royal-brown-dark shadow-[0_8px_30px_rgba(212,175,55,0.3)]" 
                        : "bg-white text-royal-brown hover:bg-ivory-light border border-royal-brown/10"
                    }`}
                  >
                    {activeTab === tab && (
                      <motion.div 
                        layoutId="activeTab" 
                        className="absolute inset-0 bg-gradient-to-r from-luxury-gold via-luxury-gold-light to-luxury-gold z-0" 
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{tab}</span>
                  </button>
                ))}
              </div>

              {/* Data Cards */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 gap-8"
                >
                  {resultsData[activeTab]?.map((data, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group bg-white rounded-3xl p-1 border border-royal-brown/5 shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(212,175,55,0.15)] transition-all duration-500"
                    >
                      <div className="bg-gradient-to-br from-white to-ivory-light rounded-[22px] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-10 h-full">
                        
                        {/* Year Badge */}
                        <div className="flex-shrink-0 flex flex-col items-center justify-center w-32 h-32 rounded-full bg-royal-brown-dark text-white shadow-inner relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-20" />
                          <span className="text-xs font-bold text-luxury-gold uppercase tracking-[0.2em] relative z-10">Batch</span>
                          <span className="font-serif text-4xl font-bold relative z-10 mt-1">{data.year}</span>
                        </div>
                        
                        {/* Data Grid */}
                        <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left w-full">
                          {Object.entries(data).filter(([key]) => key !== 'year' && key !== 'highlights').map(([key, value], i) => (
                            <div key={i} className="relative">
                              <span className="text-[10px] font-bold text-royal-brown-light/60 uppercase tracking-widest block mb-2">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                              <span className="font-serif text-2xl font-bold text-royal-brown block">{value as React.ReactNode}</span>
                            </div>
                          ))}
                        </div>

                        {/* Highlight Section */}
                        <div className="flex-shrink-0 w-full md:w-1/4 bg-luxury-gold/5 rounded-2xl p-6 border border-luxury-gold/20 flex flex-col justify-center text-center md:text-left group-hover:bg-luxury-gold/10 transition-colors">
                          <div className="flex items-center gap-2 text-luxury-gold mb-2 justify-center md:justify-start">
                            <Award size={18} />
                            <span className="text-xs font-bold uppercase tracking-widest">Highlight</span>
                          </div>
                          <p className="text-royal-brown font-medium leading-snug">"{data.highlights}"</p>
                        </div>

                      </div>
                    </motion.div>
                  ))}
                  
                  {(!resultsData[activeTab] || resultsData[activeTab].length === 0) && (
                    <div className="text-center py-20">
                      <div className="w-24 h-24 bg-royal-brown/5 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Award className="text-royal-brown/20 w-12 h-12" />
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-royal-brown">No Records Found</h3>
                      <p className="text-royal-brown-light mt-2">Data for this category is currently being updated.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </>
          )}

        </div>
      </section>

      {/* Hall of Fame - Asymmetrical Grid */}
      <section className="py-32 bg-royal-brown-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/achievement.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <h2 className="font-serif text-5xl font-bold text-ivory mb-6">Hall of <span className="text-luxury-gold">Fame</span></h2>
            <p className="text-ivory/70 max-w-2xl mx-auto text-lg">Celebrating the extraordinary individuals who have etched their names in the history of Senthil Public School.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-6xl mx-auto">
            {/* Rank 1 - Large Center/Left */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-8 h-[500px] rounded-3xl overflow-hidden relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-royal-brown-dark via-royal-brown-dark/50 to-transparent z-10" />
              <img src="/achievement.png" alt="Top Achiever" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              
              <div className="absolute bottom-0 left-0 w-full p-10 z-20 flex justify-between items-end">
                <div>
                  <span className="inline-block px-4 py-1 bg-luxury-gold text-royal-brown-dark font-bold text-xs uppercase tracking-widest rounded-full mb-4">Rank 1</span>
                  <h3 className="font-serif text-4xl font-bold text-white mb-2">Priya Sharma</h3>
                  <p className="text-ivory/80 text-lg">99.8% - CBSE Class XII Science</p>
                </div>
                <button className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-luxury-gold hover:text-royal-brown hover:border-luxury-gold transition-all duration-300">
                  <ChevronRight />
                </button>
              </div>
            </motion.div>

            {/* Rank 2 & 3 - Stacked Right */}
            <div className="md:col-span-4 flex flex-col gap-8">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex-1 rounded-3xl overflow-hidden relative group border border-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-royal-brown-dark to-transparent z-10" />
                <div className="w-full h-full bg-ivory-dark flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                   <span className="text-royal-brown/30 font-serif italic text-sm">Image Placeholder</span>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white font-bold text-[10px] uppercase tracking-widest rounded-full mb-3 border border-white/20">Rank 2</span>
                  <h3 className="font-serif text-2xl font-bold text-white mb-1">Rahul Kumar</h3>
                  <p className="text-ivory/80 text-sm">99.2% - Commerce</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex-1 rounded-3xl overflow-hidden relative group border border-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-royal-brown-dark to-transparent z-10" />
                <div className="w-full h-full bg-ivory flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                   <span className="text-royal-brown/30 font-serif italic text-sm">Image Placeholder</span>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white font-bold text-[10px] uppercase tracking-widest rounded-full mb-3 border border-white/20">Rank 3</span>
                  <h3 className="font-serif text-2xl font-bold text-white mb-1">Ananya V.</h3>
                  <p className="text-ivory/80 text-sm">AIR 154 - JEE Advanced</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      </main>
  );
}

