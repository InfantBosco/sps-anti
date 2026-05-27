"use client";

import SectionHeading from "@/components/ui/SectionHeading";
import { motion } from "framer-motion";
import { UserCircle } from "lucide-react";

// Mock Data for Faculty
const facultyData = [
  {
    category: "Principal",
    members: [
      { id: "SPS001", name: "Dr. K. Senthil Kumar", qualification: "Ph.D., M.Sc., M.Ed.", role: "Principal" }
    ]
  },
  {
    category: "Vice-Principal",
    members: [
      { id: "SPS002", name: "Mrs. R. Meenakshi", qualification: "M.A., M.Ed., M.Phil.", role: "Vice-Principal" }
    ]
  },
  {
    category: "Academic Co-ordinators",
    members: [
      { id: "SPS003", name: "Mr. V. Rajan", qualification: "M.Sc., B.Ed.", role: "Senior Secondary Co-ordinator" },
      { id: "SPS004", name: "Mrs. S. Lakshmi", qualification: "M.A., B.Ed.", role: "Secondary Co-ordinator" },
      { id: "SPS005", name: "Mrs. P. Kavitha", qualification: "B.Sc., B.Ed.", role: "Primary Co-ordinator" }
    ]
  },
  {
    category: "Teachers",
    members: [
      { id: "SPS006", name: "Mr. T. Karthik", qualification: "M.Sc. (Physics), B.Ed.", role: "PGT Physics" },
      { id: "SPS007", name: "Mrs. M. Anitha", qualification: "M.Sc. (Chemistry), B.Ed.", role: "PGT Chemistry" },
      { id: "SPS008", name: "Mr. R. Suresh", qualification: "M.Sc. (Maths), B.Ed.", role: "PGT Mathematics" },
      { id: "SPS009", name: "Mrs. K. Priya", qualification: "M.A. (English), B.Ed.", role: "TGT English" },
      { id: "SPS010", name: "Ms. N. Divya", qualification: "B.Sc., B.Ed.", role: "TGT Science" },
      { id: "SPS011", name: "Mr. J. Mohan", qualification: "M.A. (Tamil), B.Ed.", role: "TGT Tamil" },
      { id: "SPS012", name: "Mrs. V. Revathi", qualification: "B.A., B.Ed.", role: "PRT Social Science" },
      { id: "SPS013", name: "Mr. G. Prakash", qualification: "B.P.Ed.", role: "Physical Education Director" }
    ]
  }
];

export default function FacultyPage() {
  return (
    <main className="min-h-screen bg-ivory">
            
      {/* Header */}
      <section className="relative pt-40 pb-20 bg-royal-brown-dark text-ivory overflow-hidden min-h-[40vh] flex flex-col justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-royal-brown-dark via-royal-brown/90 to-royal-brown-dark z-0" />
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <SectionHeading 
            title="Our Guiding Lights" 
            subtitle="Expert Faculty" 
            light={true} 
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-ivory-light/80 text-lg max-w-2xl mx-auto mt-6"
          >
            Meet our team of dedicated educators who bring passion, expertise, and innovation to every classroom.
          </motion.p>
        </div>
      </section>

      {/* Faculty Hierarchy */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          
          <div className="space-y-24">
            {facultyData.map((group, groupIndex) => (
              <motion.div 
                key={groupIndex}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                {/* Category Header */}
                <div className="text-center mb-12 relative">
                  <h3 className="font-serif text-3xl md:text-4xl font-bold text-royal-brown inline-block bg-ivory px-6 relative z-10">
                    {group.category}
                  </h3>
                  <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-royal-brown/20 -z-0"></div>
                </div>

                {/* Grid */}
                <div className={`grid gap-8 ${
                  group.category === "Principal" || group.category === "Vice-Principal" 
                    ? "grid-cols-1 max-w-xl mx-auto" 
                    : group.category === "Academic Co-ordinators"
                      ? "grid-cols-1 md:grid-cols-3"
                      : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
                }`}>
                  {group.members.map((member, memberIndex) => (
                    <motion.div
                      key={memberIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: memberIndex * 0.1 }}
                      className={`bg-white rounded-2xl p-8 border border-royal-brown/10 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group ${
                        group.category === "Principal" || group.category === "Vice-Principal" ? "p-12" : ""
                      }`}
                    >
                      <div className={`rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mb-6 group-hover:scale-110 transition-transform duration-500 ${
                        group.category === "Principal" || group.category === "Vice-Principal" ? "w-28 h-28" : "w-20 h-20"
                      }`}>
                        <UserCircle size={group.category === "Principal" || group.category === "Vice-Principal" ? 64 : 48} strokeWidth={1.5} />
                      </div>
                      
                      <h4 className={`font-serif font-bold text-royal-brown mb-2 ${
                        group.category === "Principal" || group.category === "Vice-Principal" ? "text-3xl" : "text-xl"
                      }`}>
                        {member.name}
                      </h4>
                      
                      <div className="text-luxury-gold font-semibold uppercase tracking-widest text-xs mb-4">
                        {member.role}
                      </div>
                      
                      <div className="w-12 h-[1px] bg-royal-brown/10 mb-4"></div>
                      
                      <div className="space-y-2 w-full text-sm">
                        <div className="flex justify-between items-center text-royal-brown-light">
                          <span className="font-semibold">ID:</span>
                          <span>{member.id}</span>
                        </div>
                        <div className="flex justify-between items-center text-royal-brown-light">
                          <span className="font-semibold">Qualifications:</span>
                          <span className="text-right ml-4">{member.qualification}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      </main>
  );
}

