"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ClipboardList, BookOpen, Presentation, BrainCircuit } from "lucide-react";

const examCellFunctions = [
  {
    category: "Academic Planning & Coordination",
    icon: <ClipboardList className="w-6 h-6" />,
    items: [
      "Co-ordinating and streamlining (subjectwise) academic activities of Senthil group of schools.",
      "Developing a strategic plan for the school, in consultation with the school management.",
      "Planning the curriculum.",
      "Setting the time table for all the exams of Senthil group of schools.",
      "Scheduling and observing demo classes."
    ]
  },
  {
    category: "Assessment & Evaluation",
    icon: <CheckCircle2 className="w-6 h-6" />,
    items: [
      "Question paper preparation for SPS – Salem, SPS & SMSHSS – Adhiyamankottai and SPS & SMS – Krishnagiri.",
      "Preparing Subject Competency Question Papers and answer key.",
      "Checking Question banks, exam refreshers and work sheets.",
      "Checking the answer key of each exam for the classes I – X.",
      "Rechecking the evaluated answer scripts of students - Randomly.",
      "Checking the reading skill of students from class I – VIII.",
      "Selecting the outsource persons to assess LSRW skills of students of classes I to V.",
      "Checking Note Books / Portion completion."
    ]
  },
  {
    category: "Staff Development & Mentorship",
    icon: <Presentation className="w-6 h-6" />,
    items: [
      "Conducting campus drive and walk-in-interview to fish out smart and energetic teachers.",
      "Acting as mentors to assess and ensure the quality of staff members.",
      "Guiding the teachers to prepare lesson plan.",
      "Conducting workshops for the teachers subject wise.",
      "Correcting Subject Competency Test papers of staff members.",
      "Counselling the teachers for perfect knowledge transfer.",
      "Observing classes and giving feedback across all branches.",
      "Arranging workshops by publishers to improve the quality of teaching.",
      "Creating a supportive working environment for all staff."
    ]
  },
  {
    category: "Quality Assurance & Research",
    icon: <BrainCircuit className="w-6 h-6" />,
    items: [
      "Selecting the books for each category.",
      "Guiding & motivating class X – Toppers to think out of box and face HOT questions.",
      "Continuous research in the field of teaching and learning for most modern techniques.",
      "Fostering inter-disciplinarity both within the school and between schools.",
      "Ensuring the regular review, evaluation and development of programmes offered by the school.",
      "Promoting excellence and improvement in all matters of teaching, learning, research and administration.",
      "Ensuring the effective delivery of high quality teaching and the maintenance of academic standards.",
      "Managing and encouraging an information flow to Staff and Students within the school."
    ]
  }
];

export default function ExamCellPage() {
  return (
    <main className="min-h-screen bg-ivory flex flex-col">
            
      {/* Header & What is Exam Cell */}
      <section className="relative pt-40 pb-20 bg-royal-brown-dark text-ivory overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-royal-brown-dark via-royal-brown-dark to-luxury-gold/10" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-luxury-gold/20 rounded-full blur-[100px]" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="inline-block py-1 px-3 rounded-full border border-luxury-gold/30 text-luxury-gold text-sm tracking-widest uppercase mb-6">
                Academic Integrity
              </span>
              <h1 className="font-serif text-5xl md:text-7xl font-bold text-ivory mb-6">
                The Exam <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold-light via-luxury-gold to-luxury-gold-light">Cell</span>
              </h1>
              <p className="text-lg text-ivory/80 font-medium leading-relaxed mb-8">
                The Exam Cell is the centralized nervous system of Senthil Public School's academic framework. 
                It functions as a highly dedicated body that ensures the highest standards of teaching, learning, and evaluation are maintained uniformly across all branches.
              </p>
              <p className="text-ivory/60 leading-relaxed">
                By streamlining curriculum planning, organizing rigorous assessments, and providing continuous mentorship to faculty, the Exam Cell acts as the guardian of our institutional excellence.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative aspect-video rounded-3xl overflow-hidden border border-luxury-gold/20 shadow-2xl group"
            >
              <div className="absolute inset-0 bg-royal-brown/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
              {/* Exam Cell Image Placeholder */}
              <div className="w-full h-full bg-ivory-dark flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-700">
                <span className="text-royal-brown/50 font-serif italic text-lg px-4 text-center">[Exam Cell Team / Operations Image]</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How Exam Cell Works */}
      <section className="py-24 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold to-transparent opacity-30" />
        
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-4xl font-bold text-royal-brown mb-4">How The Exam Cell Works</h2>
              <div className="w-20 h-1 bg-luxury-gold mx-auto mb-8" />
              <p className="text-royal-brown-light max-w-2xl mx-auto">
                The core functions and responsibilities of the Exam Cell are categorized into four critical pillars to ensure operational efficiency and academic superiority.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {examCellFunctions.map((section, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-ivory/30 rounded-3xl p-8 lg:p-10 border border-royal-brown/5 shadow-sm hover:shadow-xl hover:border-luxury-gold/30 transition-all duration-500 group"
              >
                <div className="flex items-center gap-4 mb-8 border-b border-royal-brown/10 pb-6">
                  <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-luxury-gold shadow-sm group-hover:scale-110 group-hover:bg-luxury-gold group-hover:text-white transition-all duration-500 shrink-0">
                    {section.icon}
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-royal-brown leading-tight">
                    {section.category}
                  </h3>
                </div>
                
                <ul className="space-y-4">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1.5 shrink-0 w-2 h-2 rounded-sm bg-luxury-gold/60 group-hover:bg-luxury-gold transition-colors" />
                      <p className="text-royal-brown-light/90 text-sm leading-relaxed">{item}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      </main>
  );
}

