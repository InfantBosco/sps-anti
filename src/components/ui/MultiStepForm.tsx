"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "./MagneticButton";
import { Check, ChevronRight, ChevronLeft, Loader2 } from "lucide-react";

const steps = ["Student Details", "Parent Details", "Academic History", "Review"];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const [formData, setFormData] = useState({
    studentName: "",
    parentName: "",
    phone: "",
    email: "",
    gradeApplyingFor: "",
    previousSchool: "",
    message: ""
  });

  // Store validation errors for each field
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 0) {
      if (!formData.studentName.trim()) newErrors.studentName = "Student name is required";
      if (!formData.gradeApplyingFor) newErrors.gradeApplyingFor = "Grade is required";
    } else if (currentStep === 1) {
      if (!formData.parentName.trim()) newErrors.parentName = "Parent name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) newErrors.phone = "Phone must be 10 digits";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 0) {
      if (!formData.studentName.trim()) newErrors.studentName = "Student name is required";
      if (!formData.gradeApplyingFor) newErrors.gradeApplyingFor = "Grade is required";
    } else if (currentStep === 1) {
      if (!formData.parentName.trim()) newErrors.parentName = "Parent name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Invalid email format";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

    try {
      const res = await fetch(`${apiUrl}/api/admissions/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitStatus("success");
      } else {
        setSubmitStatus("error");
      }
    } catch (err) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-16 text-center border border-royal-brown/10">
        <div className="w-24 h-24 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-8">
          <Check className="text-luxury-gold w-12 h-12" />
        </div>
        <h2 className="font-serif text-4xl font-bold text-royal-brown mb-4">Application Submitted!</h2>
        <p className="text-royal-brown-light/80 text-lg mb-8">
          Thank you for applying to Senthil Public School. Our admissions team will review your application and contact you shortly.
        </p>
        <button onClick={() => window.location.reload()} className="text-luxury-gold font-bold uppercase tracking-widest text-sm hover:underline">
          Submit Another Application
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-royal-brown/10">
      <div className="flex flex-col md:flex-row">
        
        {/* Sidebar Progress */}
        <div className="bg-royal-brown-dark p-8 md:w-1/3 text-ivory flex flex-col justify-between">
          <div>
            <h3 className="font-serif font-bold text-2xl mb-8">Admissions 2026</h3>
            <ul className="space-y-6">
              {steps.map((step, idx) => (
                <li key={idx} className="flex items-center gap-4 relative">
                  {idx !== steps.length - 1 && (
                    <div className={`absolute top-8 left-[11px] bottom-[-24px] w-[2px] ${idx < currentStep ? "bg-luxury-gold" : "bg-ivory/20"}`}></div>
                  )}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 text-xs font-bold z-10 transition-colors ${
                    idx < currentStep ? "bg-luxury-gold border-luxury-gold text-royal-brown-dark" : 
                    idx === currentStep ? "border-luxury-gold text-luxury-gold" : "border-ivory/30 text-ivory/50"
                  }`}>
                    {idx < currentStep ? <Check size={12} strokeWidth={4} /> : idx + 1}
                  </div>
                  <span className={`font-medium transition-colors ${idx <= currentStep ? "text-ivory" : "text-ivory/50"}`}>
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-12 text-sm text-ivory/60">
            Need help? Contact <br />
            <a href="mailto:admissions@senthil.in" className="text-luxury-gold hover:underline">admissions@senthil.in</a>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-8 md:p-12 md:w-2/3 bg-ivory-light relative min-h-[500px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex-grow"
            >
              <h2 className="font-serif text-3xl font-bold text-royal-brown mb-2">{steps[currentStep]}</h2>
              <p className="text-royal-brown-light/80 text-sm mb-8">Please provide accurate information for the application process.</p>

              {currentStep === 0 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-royal-brown mb-1">Student Full Name</label>
                    <input name="studentName" value={formData.studentName} onChange={handleChange} type="text" className="w-full bg-white border border-royal-brown/20 rounded-lg px-4 py-3 outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all" placeholder="John Doe" />
                    {errors.studentName && <p className="text-red-500 text-sm mt-1">{errors.studentName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-royal-brown mb-1">Applying for Grade</label>
                    <select name="gradeApplyingFor" value={formData.gradeApplyingFor} onChange={handleChange} className="w-full bg-white border border-royal-brown/20 rounded-lg px-4 py-3 outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all">
                      <option value="">Select Grade</option>
                      <option value="1">Grade 1</option>
                      <option value="2">Grade 2</option>
                      <option value="3">Grade 3</option>
                      <option value="4">Grade 4</option>
                      <option value="5">Grade 5</option>
                      <option value="6">Grade 6</option>
                      <option value="7">Grade 7</option>
                      <option value="8">Grade 8</option>
                      <option value="9">Grade 9</option>
                      <option value="10">Grade 10</option>
                      <option value="11">Grade 11</option>
                      <option value="12">Grade 12</option>
                    </select>
                    {errors.gradeApplyingFor && <p className="text-red-500 text-sm mt-1">{errors.gradeApplyingFor}</p>}
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-royal-brown mb-1">Parent/Guardian Name</label>
                    <input name="parentName" value={formData.parentName} onChange={handleChange} type="text" className="w-full bg-white border border-royal-brown/20 rounded-lg px-4 py-3 outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all" placeholder="Jane Doe" />
                    {errors.parentName && <p className="text-red-500 text-sm mt-1">{errors.parentName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-royal-brown mb-1">Email Address</label>
                    <input name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-white border border-royal-brown/20 rounded-lg px-4 py-3 outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all" placeholder="jane@example.com" />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-royal-brown mb-1">Phone Number</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-white border border-royal-brown/20 rounded-lg px-4 py-3 outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all" placeholder="+91 98765 43210" />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-royal-brown mb-1">Previous School Name (Optional)</label>
                    <input name="previousSchool" value={formData.previousSchool} onChange={handleChange} type="text" className="w-full bg-white border border-royal-brown/20 rounded-lg px-4 py-3 outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all" placeholder="Global Academy" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-royal-brown mb-1">Additional Message / Remarks (Optional)</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full bg-white border border-royal-brown/20 rounded-lg px-4 py-3 outline-none focus:border-luxury-gold focus:ring-1 focus:ring-luxury-gold transition-all" placeholder="Any specific requirements..."></textarea>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4 text-center py-8">
                  <div className="w-20 h-20 bg-luxury-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="text-luxury-gold w-10 h-10" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-royal-brown mb-2">Ready to Submit</h3>
                  <p className="text-royal-brown-light/80">Please review all information before submitting the application. Our admissions team will contact you within 48 hours.</p>
                  {submitStatus === "error" && (
                    <p className="text-red-500 font-medium mt-4">There was an error submitting your application. Please try again.</p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8 pt-6 border-t border-royal-brown/10">
            {currentStep > 0 ? (
              <MagneticButton variant="ghost" onClick={prevStep} className="px-4 py-2 !rounded-lg flex items-center gap-2" disabled={isSubmitting}>
                <ChevronLeft size={18} /> Back
              </MagneticButton>
            ) : <div></div>}
            
            {currentStep < steps.length - 1 ? (
              <MagneticButton onClick={nextStep} className="px-6 py-2 !rounded-lg flex items-center gap-2">
                Next Step <ChevronRight size={18} />
              </MagneticButton>
            ) : (
              <button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="px-8 py-3 rounded-lg bg-royal-brown-dark text-luxury-gold font-medium hover:bg-royal-brown transition-colors flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? <><Loader2 className="animate-spin" size={18} /> Submitting...</> : "Submit Application"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
