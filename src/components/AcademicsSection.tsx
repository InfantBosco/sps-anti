"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import PremiumCard from "./ui/PremiumCard";
import { BookOpen, Award, Users, Lightbulb } from "lucide-react";

export default function AcademicsSection() {
  const features = [
    {
      title: "CBSE Curriculum",
      description: "A comprehensive and rigorous academic framework designed to prepare students for national and international challenges.",
      icon: <BookOpen size={28} />,
      delay: 0.1,
      href: "https://www.cbse.gov.in/"
    },
    {
      title: "Holistic Development",
      description: "Equal emphasis on sports, arts, and co-curricular activities to ensure the overall growth of every child.",
      icon: <Users size={28} />,
      delay: 0.2,
      href: "/activities/student-council"
    },
    {
      title: "Expert Faculty",
      description: "Learn from highly qualified educators who are passionate about mentoring the next generation of leaders.",
      icon: <Award size={28} />,
      delay: 0.3,
      href: "/faculty"
    },
    {
      title: "Innovative Learning",
      description: "Modern pedagogical approaches incorporating technology and experiential learning to foster critical thinking.",
      icon: <Lightbulb size={28} />,
      delay: 0.4,
      href: "/activities/nie"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-ivory-dark/30 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <SectionHeading 
          title="Shaping Brilliant Minds" 
          subtitle="Academics" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <PremiumCard 
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={feature.delay}
                href={feature.href}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
