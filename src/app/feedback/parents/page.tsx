"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { MessageSquare, Play, Video, Heart, Sparkles, Star } from "lucide-react";

const parentFeedbacks = [
  {
    id: 1,
    parentName: "Mr. & Mrs. Subramanian",
    wardName: "Aryan (Grade VII)",
    message: "Choosing Senthil Public School was the best decision for our son. The individual attention he receives from teachers is remarkable. We've seen a tremendous change in his confidence and public speaking skills.",
    tags: ["Confidence", "Care"]
  },
  {
    id: 2,
    parentName: "Mrs. Revathi Raj",
    wardName: "Ananya (Grade IV)",
    message: "The Montessori method at SPS is world-class. My daughter loves going to school every day. The environment is so nurturing and safe, which gives us immense peace of mind.",
    tags: ["Montessori", "Safety"]
  },
  {
    id: 3,
    parentName: "Mr. Karthik Raja",
    wardName: "Sneha (Grade X)",
    message: "As a parent of a board-going student, I am impressed by the strategic academic planning and the zero-stress environment the school maintains. The foundation they are building is solid.",
    tags: ["Academics", "Support"]
  },
];

function FloatingCard({ feedback, index }: { feedback: any, index: number }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity, scale }}
      className={`relative mb-16 last:mb-0 ${index % 2 === 0 ? "ml-0 mr-auto md:ml-12" : "ml-auto mr-0 md:mr-12"}`}
    >
      <div className="max-w-2xl bg-white/60 backdrop-blur-xl p-10 md:p-14 rounded-[3.5rem] border border-royal-brown/10 shadow-2xl hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] transition-all duration-700 group relative overflow-hidden">
        
        {/* Floating Background Icons */}
        <div className="absolute -top-10 -right-10 text-luxury-gold/5 group-hover:text-luxury-gold/10 transition-colors duration-500">
          <Heart size={200} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-luxury-gold text-luxury-gold" />
              ))}
            </div>
            <div className="w-8 h-[1px] bg-luxury-gold/30 mx-2" />
            <span className="text-[10px] font-bold tracking-[0.3em] text-luxury-gold uppercase">Verified Story</span>
          </div>

          <p className="font-serif text-2xl md:text-3xl text-royal-brown leading-relaxed mb-10 italic font-medium">
            "{feedback.message}"
          </p>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {feedback.tags.map((tag: string) => (
              <span key={tag} className="px-4 py-1.5 bg-royal-brown-dark/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-royal-brown/60 border border-royal-brown/5">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-royal-brown/5 pt-8">
            <div>
              <h4 className="font-serif text-2xl font-bold text-royal-brown group-hover:text-luxury-gold transition-colors duration-500">{feedback.parentName}</h4>
              <p className="text-royal-brown-light/60 font-bold uppercase tracking-widest text-xs mt-1">
                Parent of <span className="text-luxury-gold-dark">{feedback.wardName}</span>
              </p>
            </div>
            
            <div className="w-14 h-14 rounded-2xl bg-luxury-gold/10 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-ivory transition-all duration-500">
              <MessageSquare size={24} />
            </div>
          </div>
        </div>

        {/* Interaction Flare */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </motion.div>
  );
}

export default function ParentsFeedbackPage() {
  return (
    <main className="min-h-screen bg-ivory overflow-hidden">
            
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <motion.div 
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-luxury-gold/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -100, 0], y: [0, 100, 0] }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-royal-brown/10 rounded-full blur-[120px]" 
        />
      </div>

      <div className="pt-40 pb-32 relative">
        <div className="container mx-auto px-6 md:px-12">
          
          {/* Header */}
          <div className="max-w-4xl mx-auto mb-24 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-20 h-20 bg-luxury-gold/10 rounded-[2rem] flex items-center justify-center text-luxury-gold mx-auto mb-8 shadow-inner"
            >
              <Heart size={40} />
            </motion.div>
            <SectionHeading 
              title="Voices of Our Community" 
              subtitle="The Parent Perspective" 
              align="center"
            />
            <p className="text-royal-brown-light/70 mt-8 text-xl max-w-2xl mx-auto leading-relaxed">
              Every child's journey is a collaborative masterpiece. Discover how we partner with parents to create extraordinary success stories.
            </p>
          </div>

          {/* YouTube Section */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mb-32 relative"
          >
            <div className="relative aspect-video w-full bg-royal-brown-dark rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] border border-luxury-gold/20 group cursor-pointer">
              <div className="absolute inset-0 bg-[url('/about-bg.png')] bg-cover bg-center opacity-30 mix-blend-overlay scale-110 group-hover:scale-100 transition-transform duration-1000" />
              
              {/* Gradient Overlay - Ivory to transparent */}
              <div className="absolute inset-0 bg-gradient-to-b from-ivory/15 via-transparent to-transparent z-5 pointer-events-none" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-royal-brown-dark via-transparent to-transparent opacity-80" />
              
              <div className="relative z-10 h-full flex flex-col items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-28 h-28 rounded-full bg-luxury-gold text-royal-brown-dark flex items-center justify-center shadow-[0_0_50px_rgba(197,160,89,0.5)] group-hover:shadow-[0_0_80px_rgba(197,160,89,0.8)] transition-all"
                >
                  <Play fill="currentColor" size={48} className="ml-2" />
                </motion.div>
                <div className="mt-12 text-center">
                  <h3 className="font-serif text-4xl md:text-5xl font-bold text-ivory mb-4">Parent Chronicles</h3>
                  <div className="flex items-center justify-center gap-4">
                    <span className="w-12 h-[1px] bg-luxury-gold" />
                    <span className="text-luxury-gold uppercase tracking-[0.4em] font-bold text-xs">Watch The Experience</span>
                    <span className="w-12 h-[1px] bg-luxury-gold" />
                  </div>
                </div>
              </div>

              <div className="absolute top-8 right-8 flex items-center gap-3 bg-red-600/20 backdrop-blur-md border border-red-500/50 px-6 py-3 rounded-2xl text-white font-bold text-xs group-hover:bg-red-600 transition-colors">
                <Video size={16} className="animate-pulse" /> EXPERIENCE NOW
              </div>
            </div>
          </motion.div>

          {/* Feedbacks Cloud */}
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            {parentFeedbacks.map((feedback, i) => (
              <FloatingCard key={feedback.id} feedback={feedback} index={i} />
            ))}
          </div>

          {/* Final Sparkle */}
          <div className="mt-32 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="inline-block text-luxury-gold mb-4"
            >
              <Sparkles size={40} />
            </motion.div>
            <h4 className="font-serif text-3xl font-bold text-royal-brown">Become Part of Our Story</h4>
            <p className="text-royal-brown-light/60 mt-4 max-w-sm mx-auto">Your child's future begins with a single conversation. Connect with our admissions team today.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
