"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const activities = [
  { id: "archery", name: "Archery", image: "https://images.unsplash.com/photo-1511216113886-d2427eeac95a?auto=format&fit=crop&q=80&w=800" },
  { id: "art", name: "Art and Drawing", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800" },
  { id: "band", name: "Band", image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800" },
  { id: "chess", name: "Chess", image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=800" },
  { id: "dance-classical", name: "Classical Dance", image: "https://images.unsplash.com/photo-1533147670608-2a2f9776d3ac?auto=format&fit=crop&q=80&w=800" },
  { id: "craft", name: "Craft", image: "https://images.unsplash.com/photo-1522031346087-0b19b7d8c6b7?auto=format&fit=crop&q=80&w=800" },
  { id: "karate", name: "Karate", image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&q=80&w=800" },
  { id: "keyboard", name: "Keyboard", image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&q=80&w=800" },
  { id: "robotics", name: "Robotics", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800" },
  { id: "silambam", name: "Silambam", image: "https://images.unsplash.com/photo-1564415315949-22a466a9d9e6?auto=format&fit=crop&q=80&w=800" },
  { id: "skating", name: "Skating", image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?auto=format&fit=crop&q=80&w=800" },
  { id: "dance-western", name: "Western Dance", image: "https://images.unsplash.com/photo-1547153760-18fc86324498?auto=format&fit=crop&q=80&w=800" },
  { id: "yoga", name: "Yoga", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800" },
  { id: "taekwondo", name: "Taekwondo", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&q=80&w=800" },
];

export default function CoScholasticPage() {
  return (
    <main className="min-h-screen bg-ivory">
            
      <div className="pt-40 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SectionHeading title="Co-Scholastic Activities" subtitle="Holistic Education" />
              <p className="text-lg md:text-xl text-royal-brown-light max-w-3xl mx-auto mt-8 leading-relaxed">
                Our holistic approach to education goes beyond textbooks. Explore a wide array of activities designed to nurture creativity, build character, and uncover hidden talents.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {activities.map((activity, idx) => (
              <Link key={activity.id} href={`/activities/co-scholastic/${activity.id}`}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (idx % 4) * 0.1, duration: 0.6 }}
                  className="group relative h-[350px] rounded-3xl overflow-hidden shadow-xl cursor-pointer"
                >
                  <Image
                    src={activity.image}
                    alt={activity.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-brown-dark/95 via-royal-brown-dark/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: 40 }}
                      className="h-1 bg-luxury-gold mb-4" 
                    />
                    <h3 className="text-2xl font-serif font-bold text-ivory tracking-wide">
                      {activity.name}
                    </h3>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      </main>
  );
}

