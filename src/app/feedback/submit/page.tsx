"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Star, User } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FeedbackSubmitPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    organization: "",
    designation: "",
    message: "",
    rating: 5,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="min-h-screen flex flex-col bg-ivory">
            
      <div className="flex-grow pt-40 pb-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <SectionHeading 
                title="Share Your Feedback" 
                subtitle="Your Opinion Matters" 
              />
              <p className="text-royal-brown-light mt-4 max-w-2xl mx-auto">
                We value every voice in our community. Please share your experience, suggestions, or words of encouragement with us.
              </p>
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-royal-brown/10 flex flex-col md:flex-row">
              {/* Left Side: Branding */}
              <div className="md:w-1/3 bg-royal-brown-dark p-12 text-ivory flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/10 rounded-full blur-3xl -mr-16 -mt-16" />
                <div className="relative z-10">
                  <Star className="text-luxury-gold mb-8" size={40} />
                  <h3 className="font-serif text-3xl font-bold mb-6">Partner in <span className="text-luxury-gold">Progress</span></h3>
                  <p className="text-ivory/60 text-sm leading-relaxed">
                    Your feedback is the catalyst for our growth. Every message is reviewed by our administration to ensure we continue to exceed expectations.
                  </p>
                </div>
                <div className="relative z-10 pt-12">
                  <div className="w-12 h-1 bg-luxury-gold" />
                </div>
              </div>

              {/* Right Side: Form */}
              <div className="md:w-2/3 p-10 md:p-14 bg-white">
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
                  >
                    <div className="w-20 h-20 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mb-4">
                      <Send size={40} />
                    </div>
                    <h4 className="font-serif text-3xl font-bold text-royal-brown">Submission Received</h4>
                    <p className="max-w-xs text-royal-brown/60 mx-auto">
                      Thank you for taking the time to share your thoughts with us. Your contribution is highly valued.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs uppercase tracking-[0.2em] text-royal-brown/40 font-bold flex items-center gap-2">
                          <User size={12} className="text-luxury-gold" /> Full Name
                        </label>
                        <input 
                          required 
                          type="text" 
                          name="name" 
                          value={formData.name} 
                          onChange={handleInputChange} 
                          placeholder="Ex: John Doe"
                          className="w-full bg-ivory-light border border-royal-brown/5 rounded-xl px-5 py-4 text-royal-brown focus:outline-none focus:border-luxury-gold transition-all" 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs uppercase tracking-[0.2em] text-royal-brown/40 font-bold">Email Address</label>
                        <input 
                          required 
                          type="email" 
                          name="email" 
                          value={formData.email} 
                          onChange={handleInputChange} 
                          placeholder="email@example.com"
                          className="w-full bg-ivory-light border border-royal-brown/5 rounded-xl px-5 py-4 text-royal-brown focus:outline-none focus:border-luxury-gold transition-all" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-xs uppercase tracking-[0.2em] text-royal-brown/40 font-bold">Organization / Designation</label>
                        <input 
                          type="text" 
                          name="organization" 
                          value={formData.organization} 
                          onChange={handleInputChange} 
                          placeholder="Optional"
                          className="w-full bg-ivory-light border border-royal-brown/5 rounded-xl px-5 py-4 text-royal-brown focus:outline-none focus:border-luxury-gold transition-all" 
                        />
                      </div>
                      <div className="space-y-3">
                        <label className="text-xs uppercase tracking-[0.2em] text-royal-brown/40 font-bold">Phone Number</label>
                        <input 
                          type="tel" 
                          name="phone" 
                          value={formData.phone} 
                          onChange={handleInputChange} 
                          placeholder="Optional"
                          className="w-full bg-ivory-light border border-royal-brown/5 rounded-xl px-5 py-4 text-royal-brown focus:outline-none focus:border-luxury-gold transition-all" 
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs uppercase tracking-[0.2em] text-royal-brown/40 font-bold">Message / Feedback</label>
                      <textarea 
                        required 
                        name="message" 
                        value={formData.message} 
                        onChange={handleInputChange} 
                        rows={5} 
                        placeholder="Please share your thoughts here..."
                        className="w-full bg-ivory-light border border-royal-brown/5 rounded-xl px-5 py-4 text-royal-brown focus:outline-none focus:border-luxury-gold transition-all resize-none"
                      />
                    </div>

                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit" 
                      className="w-full bg-royal-brown text-ivory font-bold uppercase tracking-[0.3em] py-5 rounded-xl hover:bg-royal-brown-dark transition-all flex items-center justify-center gap-3 shadow-xl shadow-royal-brown/10"
                    >
                      Send Message <Send size={18} className="text-luxury-gold" />
                    </motion.button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
