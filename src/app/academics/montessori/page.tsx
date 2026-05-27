"use client";

import { motion } from "framer-motion";
import { BookOpen, Star, Sparkles, GraduationCap } from "lucide-react";

export default function MontessoriPage() {
  return (
    <main className="min-h-screen bg-ivory flex flex-col">
            
      {/* Header */}
      <section className="relative pt-40 pb-20 bg-royal-brown-dark text-ivory overflow-hidden min-h-[40vh] flex flex-col justify-center">
        <div className="absolute inset-0 bg-[url('/infra-bg.png')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-brown-dark via-transparent to-royal-brown-dark/80" />
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-ivory mb-6">
              Montessori <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold-light via-luxury-gold to-luxury-gold-light">Education</span>
            </h1>
            <p className="text-lg text-ivory/80 max-w-2xl mx-auto font-medium">
              Fostering independence, curiosity, and a lifelong love for learning in our youngest students.
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Maria Montessori */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-1 flex-1 bg-luxury-gold" />
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-royal-brown whitespace-nowrap">
                  Dr. Maria Montessori
                </h2>
              </div>
              <p className="text-royal-brown-light/80 text-lg leading-relaxed mb-6 font-serif italic">
                "The greatest sign of success for a teacher is to be able to say, 
                'The children are now working as if I did not exist.'"
              </p>
              <p className="text-royal-brown-light leading-relaxed mb-6">
                Maria Montessori was an Italian physician, educator, and innovator, acclaimed for her educational method that builds on the way children naturally learn. 
                She opened the first Montessori school—the Casa dei Bambini, or Children's House—in Rome on January 6, 1907. 
                Her philosophy fundamentally changed how early childhood education is approached worldwide.
              </p>
              <p className="text-royal-brown-light leading-relaxed">
                She believed that children teach themselves through engaging with their environment. Her methodology focuses on self-directed activity, hands-on learning, and collaborative play, allowing children to make creative choices in their learning while the classroom and the teacher offer age-appropriate activities to guide the process.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/5] max-w-md mx-auto rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white relative z-10 group">
                <div className="absolute inset-0 bg-royal-brown/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                {/* Placeholder for Maria Montessori Photo */}
                <div className="w-full h-full bg-royal-brown-light flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-700">
                  <span className="text-ivory font-serif italic text-xl opacity-50">Dr. Maria Montessori</span>
                </div>
              </div>
              <div className="absolute -inset-4 bg-luxury-gold/20 rounded-[2.5rem] -z-0 blur-xl opacity-50" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-[url('/pattern.png')] opacity-10 -z-0" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it's Applied */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-4xl font-bold text-royal-brown mb-4">Montessori at Senthil Public School</h2>
              <p className="text-royal-brown-light max-w-2xl mx-auto">
                Discover how we integrate the Montessori philosophy to create a nurturing, stimulating, and highly effective learning environment for your child.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Key Features */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-ivory/50 rounded-3xl p-10 border border-royal-brown/10 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-luxury-gold mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <Sparkles size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-royal-brown mb-4">Key Features</h3>
              <ul className="space-y-4 text-royal-brown-light">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-2 shrink-0" />
                  <span>Child-centered learning environment tailored to individual pace.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-2 shrink-0" />
                  <span>Specially designed, hands-on educational materials.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-2 shrink-0" />
                  <span>Uninterrupted blocks of work time for deep focus.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-2 shrink-0" />
                  <span>Emphasis on practical life skills and sensory development.</span>
                </li>
              </ul>
            </motion.div>

            {/* Curriculum */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-ivory/50 rounded-3xl p-10 border border-royal-brown/10 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-luxury-gold mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <BookOpen size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-royal-brown mb-4">Curriculum Integration</h3>
              <ul className="space-y-4 text-royal-brown-light">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-2 shrink-0" />
                  <span><strong>Practical Life:</strong> Activities fostering independence and motor skills.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-2 shrink-0" />
                  <span><strong>Sensorial:</strong> Materials that refine the five senses.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-2 shrink-0" />
                  <span><strong>Language & Math:</strong> Phonics-based reading and concrete mathematical concepts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-2 shrink-0" />
                  <span><strong>Cultural Studies:</strong> Geography, botany, and zoology fundamentals.</span>
                </li>
              </ul>
            </motion.div>

            {/* Training */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-ivory/50 rounded-3xl p-10 border border-royal-brown/10 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-luxury-gold mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                <GraduationCap size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-royal-brown mb-4">Teacher Training</h3>
              <ul className="space-y-4 text-royal-brown-light">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-2 shrink-0" />
                  <span>Rigorous certification programs for all Montessori educators.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-2 shrink-0" />
                  <span>Continuous workshops on child psychology and development.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-2 shrink-0" />
                  <span>Training in observation techniques to guide individual learning paths.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold mt-2 shrink-0" />
                  <span>Regular assessment by the centralized academic cell.</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      </main>
  );
}

