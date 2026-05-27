"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function NIEPage() {
  return (
    <main className="min-h-screen bg-ivory">
            
      <div className="pt-40 pb-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-royal-brown mb-6"
            >
              Newspaper in Education <span className="text-luxury-gold">(NIE)</span>
            </motion.h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 96 }}
              transition={{ duration: 1 }}
              className="h-1 bg-luxury-gold mx-auto rounded-full" 
            />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Image Section */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/2 relative h-[450px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000"
                alt="Newspaper in Education"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-4 border-2 border-white/30 rounded-2xl pointer-events-none" />
            </motion.div>

            {/* Content Section */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/2 space-y-8"
            >
              <div>
                <h2 className="text-3xl font-serif font-bold text-royal-brown mb-4">
                  How is NIE Included in Education?
                </h2>
                <p className="text-lg text-royal-brown-light leading-relaxed">
                  The Newspaper in Education (NIE) program is a global initiative that promotes the use of newspapers as an educational resource in the classroom. At Senthil Public School, we believe that learning extends far beyond textbooks, and newspapers are a powerful tool to connect students with the real world.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    num: "01",
                    title: "Current Affairs & Global Awareness",
                    desc: "Integrating news into daily lessons helps students stay updated with national and international events, fostering global citizenship and expanding their worldview."
                  },
                  {
                    num: "02",
                    title: "Language & Vocabulary Development",
                    desc: "Regular reading of well-articulated articles significantly improves vocabulary, comprehension skills, and written expression in students of all ages."
                  },
                  {
                    num: "03",
                    title: "Critical Thinking & Analysis",
                    desc: "Through structured discussions on editorials and opinion pieces, students learn to analyze different perspectives, distinguish fact from opinion, and develop their own reasoned viewpoints."
                  },
                  {
                    num: "04",
                    title: "Everyday Open Paper Quizzes",
                    desc: "To ensure active engagement, we conduct daily open paper quizzes where students explore the day's newspaper to find answers, boosting their speed-reading and research skills."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <span className="text-luxury-gold font-bold text-xl">{item.num}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-royal-brown mb-2">{item.title}</h3>
                      <p className="text-royal-brown-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quiz Activity Image Box */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-video bg-royal-brown/5 rounded-3xl border-2 border-dashed border-luxury-gold/30 flex items-center justify-center group relative overflow-hidden"
              >
                <span className="text-luxury-gold font-bold uppercase tracking-widest group-hover:scale-110 transition-transform text-center px-6">NIE Quiz Activity Image Box</span>
                <div className="absolute inset-0 bg-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>

              <motion.div 
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                className="bg-royal-brown text-ivory p-8 rounded-2xl shadow-xl mt-8 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <p className="font-serif text-lg italic relative z-10">
                  "A reading student is a thinking student. The NIE program bridges the gap between curriculum and reality, making learning dynamic and relevant."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      </main>
  );
}

