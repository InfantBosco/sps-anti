"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";

export default function RoboticsPage() {
  const achievements = [
    "First Place in National Level Robotics Championship 2025",
    "Best Innovation Award at State Science & Tech Expo",
    "Successfully developed an AI-powered autonomous cleaning robot",
    "Represented India in the International Junior Robotics Olympiad",
    "Partnership with top-tier tech firms for student internships"
  ];

  return (
    <main className="min-h-screen bg-ivory">
      
      {/* Hero Section */}
      <section className="pt-40 pb-24 bg-royal-brown-dark text-ivory relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-luxury-gold rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-luxury-gold font-bold uppercase tracking-[0.4em] text-sm mb-4 block">
              Innovation & Technology
            </span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Robotics <span className="text-luxury-gold">Club</span>
            </h1>
            <p className="text-ivory-dark/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Where curious minds meet cutting-edge technology to build the future, one circuit at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro & Images Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="aspect-square bg-royal-brown/5 rounded-3xl border-2 border-dashed border-luxury-gold/30 flex items-center justify-center relative group overflow-hidden"
            >
               <span className="text-luxury-gold font-bold uppercase tracking-widest group-hover:scale-110 transition-transform">Main Robotics Lab Image</span>
               <div className="absolute inset-0 bg-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <SectionHeading title="Building Tomorrow" subtitle="Our Vision" align="left" />
              <p className="text-royal-brown-light text-lg leading-relaxed mb-8">
                The Robotics Club at Senthil Public School is more than just a club; it's a launchpad for future engineers and innovators. We provide our students with the tools, guidance, and creative freedom to explore AI, Mechanics, and Electronics.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-royal-brown/5">
                   <h4 className="font-serif text-3xl font-bold text-luxury-gold mb-1">50+</h4>
                   <p className="text-xs font-bold uppercase tracking-widest text-royal-brown-light">Active Members</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-royal-brown/5">
                   <h4 className="font-serif text-3xl font-bold text-luxury-gold mb-1">12</h4>
                   <p className="text-xs font-bold uppercase tracking-widest text-royal-brown-light">Major Projects</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="order-2 lg:order-1"
            >
              <SectionHeading title="Hands-on Learning" subtitle="The Approach" align="left" />
              <p className="text-royal-brown-light text-lg leading-relaxed">
                Students engage in collaborative projects ranging from simple circuit designs to complex autonomous systems. Our mentorship program ensures that every member gets the support they need to bring their ideas to life.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="order-1 lg:order-2 aspect-video bg-royal-brown/5 rounded-3xl border-2 border-dashed border-luxury-gold/30 flex items-center justify-center group relative overflow-hidden"
            >
               <span className="text-luxury-gold font-bold uppercase tracking-widest group-hover:scale-110 transition-transform">Project Showcase Image</span>
               <div className="absolute inset-0 bg-luxury-gold/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expert Review Section */}
      <section className="py-24 bg-royal-brown text-ivory relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
           <div className="max-w-4xl mx-auto text-center">
             <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-12"
             >
               <div className="w-20 h-20 bg-luxury-gold rounded-full mx-auto flex items-center justify-center mb-6">
                 <svg className="w-10 h-10 text-royal-brown fill-current" viewBox="0 0 24 24">
                   <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V12C14.017 12.5523 13.5693 13 13.017 13H11.017C10.4647 13 10.017 12.5523 10.017 12V9C10.017 8.44772 10.4647 8 11.017 8H15.017V6H11.017C9.36015 6 8.017 7.34315 8.017 9V12C8.017 13.6569 9.36015 15 11.017 15H12.017V18C12.017 20.2091 13.8079 22 16.017 22H21.017V20H16.017C15.4647 20 15.017 19.5523 15.017 19V18H18.017C20.2261 18 22.017 16.2091 22.017 14V9C22.017 6.79086 20.2261 5 18.017 5H15.017C14.4647 5 14.017 4.55228 14.017 4V3H12.017V4C12.017 6.20914 10.2261 8 8.017 8H5.017C2.80786 8 1.017 9.79086 1.017 12V17C1.017 19.2091 2.80786 21 5.017 21H8.017V19H5.017C4.46472 19 4.017 18.5523 4.017 18V13H8.017C8.56928 13 9.017 12.5523 9.017 12V9C9.017 8.44772 8.56928 8 8.017 8H7.017V6H11.017C12.6739 6 14.017 7.34315 14.017 9V12C14.017 13.6569 12.6739 15 11.017 15H10.017V18C10.017 20.2091 11.8079 22 14.017 22H14.017L14.017 21Z" />
                 </svg>
               </div>
               <h3 className="text-luxury-gold font-bold uppercase tracking-widest text-sm mb-4">Sector Expert's Review</h3>
             </motion.div>
             
             <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-serif text-2xl md:text-3xl italic leading-relaxed mb-10 text-ivory-dark"
             >
               "The level of technical proficiency and creative problem-solving demonstrated by the students at Senthil Public School is truly world-class. Their robotics program doesn't just teach coding; it inspires a deep understanding of how technology can solve real-world problems."
             </motion.p>
             
             <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
             >
               <h4 className="font-bold text-luxury-gold text-lg">Dr. Aris Thorne</h4>
               <p className="text-ivory/50 text-sm uppercase tracking-widest">Director of AI Research, Nexus Tech Institute</p>
             </motion.div>
           </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-24 bg-ivory">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeading title="Hall of Fame" subtitle="Achievements" />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {achievements.map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 bg-white rounded-2xl border border-royal-brown/5 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-12 h-12 bg-luxury-gold/10 rounded-full flex items-center justify-center text-luxury-gold mb-6 group-hover:bg-luxury-gold group-hover:text-ivory transition-colors">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                  </svg>
                </div>
                <p className="text-royal-brown font-serif text-lg font-bold leading-snug">
                  {achievement}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      </main>
  );
}

