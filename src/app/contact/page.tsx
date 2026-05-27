"use client";

import { useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import MagneticButton from "@/components/ui/MagneticButton";
import { MapPin, Phone, Mail, Clock, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    try {
      const res = await fetch(`${apiUrl}/api/contact/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", subject: "", message: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-ivory">
            
      {/* Header */}
      <section className="relative pt-40 pb-20 bg-royal-brown-dark text-ivory overflow-hidden min-h-[40vh] flex flex-col justify-center">
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <SectionHeading title="Get In Touch" subtitle="Contact Us" light={true} />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
              <h3 className="font-serif text-3xl font-bold text-royal-brown mb-8">We'd love to hear from you</h3>
              <p className="text-royal-brown-light/80 mb-12 text-lg">Whether you have a question about admissions, academics, or simply want to visit our campus, our team is ready to assist you.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xl text-royal-brown mb-2">Campus Address</h4>
                    <p className="text-royal-brown-light/80">Senthil Public School,<br/>Adhiyamaan Bypass Road,<br/>Dharmapuri, Tamil Nadu 636701, India</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xl text-royal-brown mb-2">Phone Numbers</h4>
                    <p className="text-royal-brown-light/80">+91 98765 43210<br/>+91 87654 32109</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xl text-royal-brown mb-2">Email Addresses</h4>
                    <p className="text-royal-brown-light/80">info@senthilpublicschool.in<br/>admissions@senthilpublicschool.in</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-xl text-royal-brown mb-2">Office Hours</h4>
                    <p className="text-royal-brown-light/80">Monday - Friday: 8:00 AM - 5:00 PM<br/>Saturday: 9:00 AM - 1:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-10 md:p-12 rounded-2xl shadow-xl border border-royal-brown/10 relative overflow-hidden">
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 z-20 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8"
                  >
                    <CheckCircle className="text-luxury-gold w-16 h-16 mb-4" />
                    <h3 className="font-serif text-2xl font-bold text-royal-brown mb-2">Message Sent!</h3>
                    <p className="text-royal-brown-light">Thank you for reaching out. Our team will get back to you shortly.</p>
                    <button onClick={() => setSubmitStatus("idle")} className="mt-8 text-luxury-gold font-bold uppercase tracking-widest text-sm">Send Another Message</button>
                  </motion.div>
                )}
              </AnimatePresence>

              <h3 className="font-serif text-2xl font-bold text-royal-brown mb-8">Send a Message</h3>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-royal-brown mb-2">First Name</label>
                    <input required name="firstName" value={formData.firstName} onChange={handleChange} type="text" className="w-full bg-ivory-light border border-royal-brown/20 rounded-lg px-4 py-3 outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-royal-brown mb-2">Last Name</label>
                    <input required name="lastName" value={formData.lastName} onChange={handleChange} type="text" className="w-full bg-ivory-light border border-royal-brown/20 rounded-lg px-4 py-3 outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-royal-brown mb-2">Email Address</label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-ivory-light border border-royal-brown/20 rounded-lg px-4 py-3 outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-royal-brown mb-2">Subject</label>
                  <input required name="subject" value={formData.subject} onChange={handleChange} type="text" className="w-full bg-ivory-light border border-royal-brown/20 rounded-lg px-4 py-3 outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-royal-brown mb-2">Message</label>
                  <textarea required name="message" value={formData.message} onChange={handleChange} rows={5} className="w-full bg-ivory-light border border-royal-brown/20 rounded-lg px-4 py-3 outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all resize-none"></textarea>
                </div>
                {submitStatus === "error" && (
                  <p className="text-red-500 text-sm">Failed to send message. Please ensure the backend is running.</p>
                )}
                <MagneticButton className="w-full py-4 !rounded-lg text-lg">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </MagneticButton>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] w-full bg-royal-brown-dark relative">
        <div className="absolute inset-0 flex items-center justify-center text-ivory/50 font-serif italic text-xl">
          [ Interactive Map Embed Placeholder ]
        </div>
      </section>

      </main>
  );
}

