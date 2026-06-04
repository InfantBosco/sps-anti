"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, CheckCircle, AlertCircle, FileText, X } from "lucide-react";

export default function CareersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    coverLetter: ""
  });
  
  const [resume, setResume] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Mobile number is required";
    if (!formData.position.trim()) newErrors.position = "Position is required";
    if (!resume) newErrors.resume = "Please upload your resume (PDF only)";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setResume(file);
        setErrors(prev => { const e = {...prev}; delete e.resume; return e; });
      } else {
        setErrors(prev => ({ ...prev, resume: "Only PDF files are allowed" }));
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setResume(file);
        setErrors(prev => { const e = {...prev}; delete e.resume; return e; });
      } else {
        setErrors(prev => ({ ...prev, resume: "Only PDF files are allowed" }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => { const newErrs = { ...prev }; delete newErrs[name]; return newErrs; });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // 1. Upload Resume to Cloudinary
      const formDataUpload = new FormData();
      formDataUpload.append("file", resume!);

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const uploadRes = await fetch(`${apiUrl}/api/upload/`, {
        method: "POST",
        body: formDataUpload,
      });

      if (!uploadRes.ok) throw new Error("Resume upload failed");
      const { url: resume_url } = await uploadRes.json();

      // 2. Submit Application
      const res = await fetch(`${apiUrl}/api/careers/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          resume_url
        }),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", phone: "", position: "", experience: "", coverLetter: "" });
        setResume(null);
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-ivory flex flex-col">
            
      {/* Header */}
      <section className="relative pt-40 pb-20 bg-royal-brown-dark text-ivory overflow-hidden min-h-[40vh] flex flex-col justify-center">
        <div className="absolute inset-0 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-10 mix-blend-luminosity" />
        {/* Gradient Overlay - Ivory to transparent */}
        <div className="absolute inset-0 bg-gradient-to-b from-ivory/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-royal-brown-dark via-transparent to-transparent" />
        <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-ivory mb-6">
              Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-luxury-gold-light via-luxury-gold to-luxury-gold-light">Faculty</span>
            </h1>
            <p className="text-lg text-ivory/80 max-w-2xl mx-auto font-medium">
              We are always looking for passionate educators and professionals to join our esteemed institution. 
              Shape the leaders of tomorrow with Senthil Public School.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 flex-grow relative">
        <div className="absolute inset-0 bg-gradient-to-b from-royal-brown-dark to-royal-brown z-0" />
        
        <div className="container mx-auto px-6 md:px-12 relative z-10 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-4xl bg-ivory/95 backdrop-blur-3xl rounded-[2.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden"
          >
            <AnimatePresence>
              {submitStatus === "success" && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-50 bg-ivory/95 backdrop-blur-md flex flex-col items-center justify-center text-center p-8 rounded-[2.5rem]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircle className="text-luxury-gold w-24 h-24 mb-6 mx-auto" />
                  </motion.div>
                  <h3 className="font-serif text-4xl font-bold text-royal-brown mb-4">Application Submitted!</h3>
                  <p className="text-royal-brown-light text-lg max-w-md mx-auto leading-relaxed">
                    Thank you for your interest in joining Senthil Public School. Our HR department will review your application and contact you if your profile matches our requirements.
                  </p>
                  <button 
                    onClick={() => setSubmitStatus("idle")} 
                    className="mt-10 px-8 py-4 rounded-full bg-royal-brown text-white font-bold uppercase tracking-widest text-sm hover:bg-luxury-gold transition-colors"
                  >
                    Return to Careers
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mb-10 text-center">
              <h2 className="font-serif text-3xl font-bold text-royal-brown mb-2">
                Application Form
              </h2>
              <p className="text-royal-brown-light font-medium">Please fill out the details below and upload your latest resume.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-royal-brown/70 font-bold ml-1">Full Name *</label>
                  <input 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    type="text" 
                    className={`w-full bg-white border ${errors.name ? 'border-red-400' : 'border-royal-brown/10'} rounded-xl px-5 py-4 text-royal-brown outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all shadow-sm`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-royal-brown/70 font-bold ml-1">Email Address *</label>
                  <input 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    type="email" 
                    className={`w-full bg-white border ${errors.email ? 'border-red-400' : 'border-royal-brown/10'} rounded-xl px-5 py-4 text-royal-brown outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all shadow-sm`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-royal-brown/70 font-bold ml-1">Mobile Number *</label>
                  <input 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    type="tel" 
                    className={`w-full bg-white border ${errors.phone ? 'border-red-400' : 'border-royal-brown/10'} rounded-xl px-5 py-4 text-royal-brown outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all shadow-sm`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-royal-brown/70 font-bold ml-1">Position Applying For *</label>
                  <select 
                    name="position" 
                    value={formData.position} 
                    onChange={handleChange}
                    className={`w-full bg-white border ${errors.position ? 'border-red-400' : 'border-royal-brown/10'} rounded-xl px-5 py-4 text-royal-brown outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all shadow-sm appearance-none`}
                  >
                    <option value="" disabled>Select a position</option>
                    <option value="PGT Teacher">PGT Teacher</option>
                    <option value="TGT Teacher">TGT Teacher</option>
                    <option value="PRT Teacher">PRT Teacher</option>
                    <option value="Administrative Staff">Administrative Staff</option>
                    <option value="Management">Management</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.position && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.position}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-royal-brown/70 font-bold ml-1">Total Experience (Years)</label>
                <input 
                  name="experience" 
                  value={formData.experience} 
                  onChange={handleChange} 
                  type="number" 
                  min="0"
                  className={`w-full bg-white border border-royal-brown/10 rounded-xl px-5 py-4 text-royal-brown outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all shadow-sm`}
                />
              </div>

              {/* Drag and Drop Resume */}
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-royal-brown/70 font-bold ml-1">Upload Resume (PDF only) *</label>
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`w-full border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer relative overflow-hidden ${
                    isDragging 
                      ? 'border-luxury-gold bg-luxury-gold/5 scale-[1.02]' 
                      : errors.resume 
                        ? 'border-red-400 bg-red-50' 
                        : 'border-royal-brown/20 bg-white hover:border-luxury-gold hover:bg-ivory'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="application/pdf" 
                    className="hidden" 
                  />
                  
                  {resume ? (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex flex-col items-center gap-3 z-10"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                        <FileText size={32} />
                      </div>
                      <div>
                        <p className="font-bold text-royal-brown">{resume.name}</p>
                        <p className="text-sm text-royal-brown-light">{(resume.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                      <button 
                        type="button"
                        onClick={(e) => { e.stopPropagation(); setResume(null); }}
                        className="text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-700 mt-2 flex items-center gap-1"
                      >
                        <X size={14} /> Remove File
                      </button>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 z-10 pointer-events-none">
                      <div className="w-16 h-16 rounded-full bg-royal-brown/5 text-luxury-gold flex items-center justify-center">
                        <UploadCloud size={32} />
                      </div>
                      <p className="font-bold text-royal-brown text-lg">Click or drag file to this area to upload</p>
                      <p className="text-sm text-royal-brown-light">Support for a single PDF upload. Maximum file size 5MB.</p>
                    </div>
                  )}
                </div>
                {errors.resume && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.resume}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-royal-brown/70 font-bold ml-1">Cover Letter / Additional Information</label>
                <textarea 
                  name="coverLetter" 
                  value={formData.coverLetter} 
                  onChange={handleChange} 
                  rows={4} 
                  className={`w-full bg-white border border-royal-brown/10 rounded-xl px-5 py-4 text-royal-brown outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 transition-all resize-none shadow-sm`}
                ></textarea>
              </div>

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-royal-brown-dark text-ivory font-bold uppercase tracking-widest py-5 rounded-xl hover:bg-luxury-gold transition-colors flex items-center justify-center gap-3 shadow-xl shadow-royal-brown-dark/20 disabled:opacity-70 mt-8"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-ivory border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Submit Application"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      </main>
  );
}

