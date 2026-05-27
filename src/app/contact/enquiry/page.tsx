"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export default function EnquiryPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // Simulate API Call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-ivory flex flex-col">
            
      {/* Header */}
      <section className="relative pt-40 pb-20 bg-royal-brown-dark text-ivory overflow-hidden min-h-[40vh] flex flex-col justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-royal-brown-dark via-royal-brown-dark/95 to-luxury-gold/10" />
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-ivory mb-6">
              General <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold-light via-luxury-gold to-luxury-gold-light">Enquiry</span>
            </h1>
            <p className="text-lg text-ivory/80 max-w-2xl mx-auto font-medium">
              Have a question about our programs, facilities, or admissions? Drop us a line and we'll get back to you promptly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 flex-grow relative">
        <div className="absolute inset-0 bg-[url('/about-bg.png')] bg-cover bg-center opacity-[0.02]" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-3xl bg-white/70 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-royal-brown/10 shadow-[0_30px_60px_rgba(0,0,0,0.08)] relative overflow-hidden"
          >
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div 
                  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
                  exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                  className="absolute inset-0 z-20 bg-white/90 flex flex-col items-center justify-center text-center p-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle className="text-luxury-gold w-20 h-20 mb-6 mx-auto" />
                  </motion.div>
                  <h3 className="font-serif text-3xl font-bold text-royal-brown mb-3">Enquiry Sent!</h3>
                  <p className="text-royal-brown-light text-lg">Thank you for reaching out. Our admissions team will contact you shortly.</p>
                  <button 
                    onClick={() => setSubmitStatus("idle")} 
                    className="mt-8 px-8 py-3 rounded-full bg-royal-brown text-white font-bold uppercase tracking-widest text-sm hover:bg-luxury-gold transition-colors"
                  >
                    Send Another Enquiry
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <h2 className="font-serif text-3xl font-bold text-royal-brown mb-8 border-b border-royal-brown/10 pb-4">
              Send us a message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm uppercase tracking-widest text-royal-brown/70 font-bold ml-1">Full Name *</label>
                <div className="relative">
                  <input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    type="text" 
                    className={`w-full bg-ivory/50 border ${errors.name ? 'border-red-400' : 'border-royal-brown/20'} rounded-xl px-5 py-4 text-royal-brown outline-none focus:bg-white focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all`}
                    placeholder="John Doe"
                  />
                  {errors.name && <AlertCircle className="absolute right-4 top-4 text-red-400" size={20} />}
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm uppercase tracking-widest text-royal-brown/70 font-bold ml-1">Email Address *</label>
                  <div className="relative">
                    <input 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      type="text" 
                      className={`w-full bg-ivory/50 border ${errors.email ? 'border-red-400' : 'border-royal-brown/20'} rounded-xl px-5 py-4 text-royal-brown outline-none focus:bg-white focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <AlertCircle className="absolute right-4 top-4 text-red-400" size={20} />}
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm uppercase tracking-widest text-royal-brown/70 font-bold ml-1">Mobile Number *</label>
                  <div className="relative">
                    <input 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      type="text" 
                      className={`w-full bg-ivory/50 border ${errors.phone ? 'border-red-400' : 'border-royal-brown/20'} rounded-xl px-5 py-4 text-royal-brown outline-none focus:bg-white focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all`}
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && <AlertCircle className="absolute right-4 top-4 text-red-400" size={20} />}
                  </div>
                  {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm uppercase tracking-widest text-royal-brown/70 font-bold ml-1">Your Message *</label>
                <div className="relative">
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    rows={5} 
                    className={`w-full bg-ivory/50 border ${errors.message ? 'border-red-400' : 'border-royal-brown/20'} rounded-xl px-5 py-4 text-royal-brown outline-none focus:bg-white focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all resize-none`}
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>
                {errors.message && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.message}</p>}
              </div>

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-royal-brown text-ivory font-bold uppercase tracking-widest py-5 rounded-xl hover:bg-luxury-gold transition-colors flex items-center justify-center gap-3 shadow-lg shadow-royal-brown/20 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-ivory border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    Submit Enquiry <Send size={20} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      </main>
  );
}

