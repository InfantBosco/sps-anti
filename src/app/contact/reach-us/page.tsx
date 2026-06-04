"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ReachUsPage() {
  return (
    <main className="min-h-screen bg-ivory flex flex-col">
            
      {/* Header */}
      <section className="relative pt-40 pb-20 bg-royal-brown-dark text-ivory overflow-hidden min-h-[40vh] flex flex-col justify-center">
        <div className="absolute inset-0 bg-[url('/infra-bg.png')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
        {/* Gradient Overlay - Ivory to transparent */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-brown-dark via-transparent to-royal-brown-dark/80" />
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-ivory mb-6">
              Reach <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold-light via-luxury-gold to-luxury-gold-light">Us</span>
            </h1>
            <p className="text-lg text-ivory/80 max-w-2xl mx-auto font-medium">
              We are always here to assist you. Visit our campus or get in touch with our team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 flex-grow relative">
        <div className="absolute inset-0 bg-gradient-to-b from-ivory to-ivory-dark z-0" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-royal-brown/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all group"
              >
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-royal-brown/5 text-royal-brown flex items-center justify-center shrink-0 group-hover:bg-luxury-gold group-hover:text-white transition-colors duration-500">
                    <MapPin size={28} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-royal-brown mb-2">Campus Location</h3>
                    <p className="text-royal-brown-light leading-relaxed">
                      Senthil Public School,<br/>
                      Adhiyamaan Bypass Road,<br/>
                      Dharmapuri, Tamil Nadu 636701, India
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-royal-brown/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all group"
              >
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-royal-brown/5 text-royal-brown flex items-center justify-center shrink-0 group-hover:bg-luxury-gold group-hover:text-white transition-colors duration-500">
                    <Phone size={28} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-royal-brown mb-2">Contact Numbers</h3>
                    <p className="text-royal-brown-light leading-relaxed">
                      +91 98765 43210<br/>
                      +91 87654 32109
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-royal-brown/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all group"
              >
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-royal-brown/5 text-royal-brown flex items-center justify-center shrink-0 group-hover:bg-luxury-gold group-hover:text-white transition-colors duration-500">
                    <Mail size={28} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-royal-brown mb-2">Email Directory</h3>
                    <p className="text-royal-brown-light leading-relaxed">
                      info@senthilpublicschool.in<br/>
                      admissions@senthilpublicschool.in
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-royal-brown/10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all group"
              >
                <div className="flex gap-6 items-start">
                  <div className="w-14 h-14 rounded-2xl bg-royal-brown/5 text-royal-brown flex items-center justify-center shrink-0 group-hover:bg-luxury-gold group-hover:text-white transition-colors duration-500">
                    <Clock size={28} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-royal-brown mb-2">Office Hours</h3>
                    <p className="text-royal-brown-light leading-relaxed">
                      Monday - Friday: 8:00 AM - 5:00 PM<br/>
                      Saturday: 9:00 AM - 1:00 PM
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Map Integration */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-7 h-[600px] lg:h-auto rounded-3xl overflow-hidden border border-royal-brown/20 shadow-2xl relative group"
            >
              <div className="absolute inset-0 bg-royal-brown/10 z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3905.7487216669926!2d78.14885817578768!3d12.115456288126743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac16e7591db3bd%3A0xc665b262f2d93e2!2sSenthil%20Public%20School%20Dharmapuri!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full object-cover grayscale-[30%] contrast-[110%] group-hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </motion.div>

          </div>
        </div>
      </section>

      </main>
  );
}

