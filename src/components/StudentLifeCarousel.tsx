"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import RoyalImageEffect from "./ui/RoyalImageEffect";
import { useRef, useState, useEffect } from "react";

import Link from "next/link";

const activities = [
  { id: 1, title: "Sports & Athletics", src: "/royal-sports.png", href: "/activities/sports" },
  { id: 2, title: "Performing Arts", src: "/royal-auditorium.png", href: "/activities/co-scholastic" },
  { id: 3, title: "Robotics Club", src: "/royal-campus.png", href: "/activities/robotics" },
  { id: 4, title: "Literary Society", src: "/royal-library.png", href: "/activities/library" },
];

export default function StudentLifeCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <section className="py-24 bg-royal-brown-dark text-ivory overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-12">
        <SectionHeading title="Beyond the Classroom" subtitle="Student Life" align="left" light={true} />
      </div>

      <div className="ml-6 md:ml-12 lg:ml-auto lg:container lg:px-12">
        <motion.div 
          ref={carouselRef} 
          className="cursor-grab active:cursor-grabbing overflow-hidden"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div 
            drag="x" 
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-8"
          >
            {activities.map((item) => (
              <Link href={item.href} key={item.id}>
                <motion.div 
                  className="min-w-[300px] md:min-w-[450px] h-[400px] md:h-[500px] relative rounded-2xl overflow-hidden group shadow-xl hover:shadow-[0_25px_60px_rgba(212,175,55,0.15)] border border-luxury-gold/10 hover:border-luxury-gold/40 transition-all duration-500"
                >
                  <RoyalImageEffect 
                    src={item.src} 
                    alt={item.title} 
                    className="w-full h-full"
                    overlayText={item.title}
                    overlaySubtext="Explore"
                  />
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
