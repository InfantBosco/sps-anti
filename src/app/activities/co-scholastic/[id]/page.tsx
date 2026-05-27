"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { Trophy, Star, Target, Zap, X, CheckCircle2 } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

const activityData: Record<string, any> = {
  "archery": { name: "Archery", image: "https://images.unsplash.com/photo-1511216113886-d2427eeac95a?auto=format&fit=crop&q=80&w=1200" },
  "art": { name: "Art and Drawing", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1200" },
  "band": { name: "Band", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=1200" },
  "chess": { name: "Chess", image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=1200" },
  "dance-classical": { name: "Classical Dance", image: "https://images.unsplash.com/photo-1533147670608-2a2f9776d3ac?auto=format&fit=crop&q=80&w=1200" },
  "craft": { name: "Craft", image: "https://images.unsplash.com/photo-1522031346087-0b19b7d8c6b7?auto=format&fit=crop&q=80&w=1200" },
  "karate": { name: "Karate", image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=1200" },
  "keyboard": { name: "Keyboard", image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=1200" },
  "robotics": { name: "Robotics", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1200" },
  "silambam": { name: "Silambam", image: "https://images.unsplash.com/photo-1564415315949-22a466a9d9e6?auto=format&fit=crop&q=80&w=1200" },
  "skating": { name: "Skating", image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&q=80&w=1200" },
  "dance-western": { name: "Western Dance", image: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=1200" },
  "yoga": { name: "Yoga", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200" },
  "taekwondo": { name: "Taekwondo", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=1200" },
};

export default function ActivityDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [showModal, setShowModal] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [formData, setFormData] = useState({ name: "", admissionNo: "", class: "", section: "" });

  const activity = activityData[id] || { name: "Activity", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200" };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegistered(true);
    setTimeout(() => {
      setShowModal(false);
      setRegistered(false);
      setFormData({ name: "", admissionNo: "", class: "", section: "" });
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-ivory">
            
      {/* Registration Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-royal-brown-dark/60 backdrop-blur-md"
            onClick={() => setShowModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-royal-brown-light hover:text-royal-brown transition-colors"
              >
                <X size={24} />
              </button>

              {registered ? (
                <div className="text-center py-10">
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 size={48} />
                  </motion.div>
                  <h3 className="font-serif text-3xl font-bold text-royal-brown mb-2">Registration Success!</h3>
                  <p className="text-royal-brown-light">You have joined the {activity.name} Club.</p>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h3 className="font-serif text-3xl font-bold text-royal-brown mb-2">Join the Club</h3>
                    <p className="text-royal-brown-light text-sm">Enroll in {activity.name} for the current session.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-royal-brown-light mb-2">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-ivory border border-royal-brown/10 focus:border-luxury-gold outline-none transition-all text-royal-brown font-medium"
                        placeholder="Student's Name"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-royal-brown-light mb-2">Admission Number</label>
                      <input 
                        required
                        type="text" 
                        value={formData.admissionNo}
                        onChange={(e) => setFormData({...formData, admissionNo: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-ivory border border-royal-brown/10 focus:border-luxury-gold outline-none transition-all text-royal-brown font-medium"
                        placeholder="e.g. SPS2024001"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-royal-brown-light mb-2">Class</label>
                        <select 
                          required
                          value={formData.class}
                          onChange={(e) => setFormData({...formData, class: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-ivory border border-royal-brown/10 focus:border-luxury-gold outline-none transition-all text-royal-brown font-medium"
                        >
                          <option value="">Select</option>
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-royal-brown-light mb-2">Section</label>
                        <select 
                          required
                          value={formData.section}
                          onChange={(e) => setFormData({...formData, section: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-ivory border border-royal-brown/10 focus:border-luxury-gold outline-none transition-all text-royal-brown font-medium"
                        >
                          <option value="">Select</option>
                          {['A', 'B', 'C', 'D'].map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <button 
                      type="submit"
                      className="w-full py-4 bg-royal-brown text-ivory font-bold uppercase tracking-widest rounded-xl hover:bg-luxury-gold hover:text-royal-brown-dark transition-all duration-300 shadow-lg mt-4"
                    >
                      Confirm Registration
                    </button>
                    <p className="text-[10px] text-center text-royal-brown-light/60 mt-4 italic leading-relaxed">
                      * Membership is strictly reserved for current students of Senthil Public School.
                    </p>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

            
      {/* Hero Header */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <Image
          src={activity.image}
          alt={activity.name}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-royal-brown-dark/70 via-royal-brown-dark/40 to-ivory" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="inline-block py-1 px-4 rounded-full border border-luxury-gold text-luxury-gold text-xs font-bold tracking-[0.2em] uppercase mb-6 bg-luxury-gold/5 backdrop-blur-sm">
              Co-Scholastic Excellence
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white drop-shadow-2xl">
              {activity.name}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 -mt-20 relative z-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Content: Description & Overview */}
            <div className="lg:col-span-2 space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-10 md:p-16 rounded-[2.5rem] shadow-2xl border border-royal-brown/5"
              >
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-royal-brown mb-8 relative inline-block">
                  About the Activity
                  <div className="absolute -bottom-3 left-0 w-12 h-1 bg-luxury-gold rounded-full" />
                </h2>
                <p className="text-royal-brown-light/90 text-lg leading-relaxed mb-8">
                  At Senthil Public School, we believe that {activity.name} plays a crucial role in the holistic development of our students. This program is designed not just to teach a skill, but to foster discipline, creativity, and a sense of achievement. Our expert instructors guide students from foundational techniques to advanced mastery, ensuring a rewarding learning journey for every child.
                </p>
                
                {/* Video Showcase Section */}
                <div className="mt-16 space-y-8">
                  <h3 className="font-serif text-3xl font-bold text-royal-brown flex items-center gap-3">
                    <Target className="text-luxury-gold" />
                    Video Showcase
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[1, 2].map((v) => (
                      <div key={v} className="aspect-video bg-black/5 rounded-3xl overflow-hidden relative group border-2 border-dashed border-luxury-gold/20 flex items-center justify-center hover:bg-black/10 transition-colors">
                        <div className="w-16 h-16 bg-luxury-gold/20 rounded-full flex items-center justify-center text-luxury-gold group-hover:scale-110 transition-transform cursor-pointer">
                           <Zap size={32} />
                        </div>
                        <span className="absolute bottom-4 left-6 text-[10px] font-bold uppercase tracking-[0.2em] text-royal-brown/40">Youtube Video Placeholder</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Secondary Image Placeholder */}
                <div className="relative aspect-video rounded-3xl overflow-hidden shadow-xl group mt-12">
                   <div className="absolute inset-0 bg-royal-brown/10 z-10 group-hover:bg-transparent transition-colors duration-500" />
                   <div className="w-full h-full bg-ivory-dark flex items-center justify-center border-2 border-dashed border-luxury-gold/30">
                      <span className="text-luxury-gold font-bold uppercase tracking-widest group-hover:scale-110 transition-transform">{activity.name} In Action - Placeholder</span>
                   </div>
                </div>
              </motion.div>

              {/* Achievements Section */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="bg-royal-brown-dark p-10 rounded-[2rem] text-ivory shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                   <Trophy className="text-luxury-gold mb-6" size={40} />
                   <h3 className="font-serif text-2xl font-bold mb-4">State Level Success</h3>
                   <p className="text-ivory/70">Our students consistently secure top positions in state-level {activity.name} competitions, showcasing the high standard of training at SPS.</p>
                </div>
                <div className="bg-ivory-dark/30 p-10 rounded-[2rem] border border-royal-brown/10 shadow-sm">
                   <Zap className="text-luxury-gold mb-6" size={40} />
                   <h3 className="font-serif text-2xl font-bold text-royal-brown mb-4">Skill Mastery</h3>
                   <p className="text-royal-brown-light">Over 80% of our students achieving grade-level certifications within the first two years of the program.</p>
                </div>
              </motion.div>
            </div>

            {/* Right Content: Stats & Highlights */}
            <div className="space-y-8">
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-ivory-dark/20 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-royal-brown/5 sticky top-32"
              >
                <h3 className="font-serif text-2xl font-bold text-royal-brown mb-8 flex items-center gap-3">
                   <Star className="text-luxury-gold" />
                   Highlights
                </h3>
                <ul className="space-y-6">
                  {[
                    { title: "Expert Coaching", desc: "Certified professionals with years of experience." },
                    { title: "Modern Equipment", desc: "State-of-the-art facilities for training." },
                    { title: "Performance Platforms", desc: "Regular opportunities to perform on stage." },
                    { title: "Personalized Progress", desc: "Small groups for individual attention." }
                  ].map((item, i) => (
                    <li key={i} className="flex gap-4 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-2 shrink-0 group-hover:scale-150 transition-transform" />
                      <div>
                        <h4 className="font-bold text-royal-brown text-sm uppercase tracking-wide mb-1">{item.title}</h4>
                        <p className="text-royal-brown-light text-sm">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => setShowModal(true)}
                  className="w-full mt-12 py-4 bg-royal-brown text-ivory font-bold uppercase tracking-widest rounded-xl hover:bg-luxury-gold hover:text-royal-brown-dark transition-all duration-300 shadow-lg"
                >
                  Join the Club
                </button>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

          </main>
  );
}
