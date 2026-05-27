"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Loader2,
  X,
  Star,
  Quote,
  UserCheck
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import Image from "next/image";

type Feedback = {
  _id: string;
  name: string;
  designation?: string;
  message: string;
  image_url?: string;
  type: string;
  is_published: boolean;
  createdAt: string;
};

export default function AdminFeedback() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"Parent" | "VIP">("Parent");
  const [formData, setFormData] = useState({ name: "", designation: "", message: "", image_url: "", type: "VIP", is_published: true });
  const [submitting, setSubmitting] = useState(false);

  const fetchFeedback = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/feedback/`);
      if (res.ok) {
        const data = await res.json();
        setFeedback(data);
      }
    } catch (err) {
      console.error("Failed to fetch feedback:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/feedback/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("admin_token")}` },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowModal(false);
        setFormData({ name: "", designation: "", message: "", image_url: "", type: "VIP", is_published: true });
        fetchFeedback();
      }
    } catch (err) {
      alert("Failed to add feedback");
    } finally {
      setSubmitting(false);
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/feedback/${id}/publish?publish=${!currentStatus}`, { method: "PATCH", headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}` } });
      if (res.ok) fetchFeedback();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const deleteFeedback = async (id: string) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/feedback/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}` } });
      if (res.ok) fetchFeedback();
    } catch (err) {
      alert("Failed to delete feedback");
    }
  };

  const filteredFeedback = feedback.filter(f => f.type === activeTab);

  return (
    <div className="space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-serif text-4xl font-bold text-royal-brown">Feedback & Testimonials</h1>
          <p className="text-royal-brown-light/70 mt-2">Manage dignitary perspectives and review parent experiences.</p>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="px-8 py-4 bg-royal-brown-dark text-ivory rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-royal-brown transition-all shadow-lg"
        >
          <Plus size={20} className="text-luxury-gold" /> Add VIP Testimonial
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 p-1.5 bg-ivory-dark/30 rounded-2xl w-fit border border-royal-brown/5">
        <button 
          onClick={() => setActiveTab("Parent")}
          className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'Parent' ? 'bg-white text-royal-brown shadow-md' : 'text-royal-brown/40 hover:text-royal-brown'}`}
        >
          Parent Stories
        </button>
        <button 
          onClick={() => setActiveTab("VIP")}
          className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'VIP' ? 'bg-white text-royal-brown shadow-md' : 'text-royal-brown/40 hover:text-royal-brown'}`}
        >
          VIP Perspectives
        </button>
      </div>

      {/* Feedback List */}
      <div className="bg-white rounded-[2.5rem] border border-royal-brown/5 shadow-sm overflow-hidden">
        <div className="p-10">
          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="animate-spin text-luxury-gold mx-auto" size={40} />
            </div>
          ) : filteredFeedback.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredFeedback.map((item) => (
                <motion.div 
                  key={item._id}
                  className="bg-ivory/20 p-8 rounded-[2rem] border border-royal-brown/5 relative group hover:shadow-xl hover:border-luxury-gold/30 transition-all duration-500"
                >
                  <Quote className="absolute top-8 right-8 text-luxury-gold/10" size={64} />
                  
                  <div className="flex gap-6 items-start mb-6">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-md">
                      <Image 
                        src={item.image_url || "/principal.png"} 
                        alt={item.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-royal-brown text-lg">{item.name}</h4>
                      <p className="text-luxury-gold font-bold text-[10px] uppercase tracking-widest">{item.designation || "Parent"}</p>
                    </div>
                  </div>

                  <p className="text-royal-brown-light/80 italic leading-relaxed mb-8 relative z-10">
                    "{item.message}"
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-royal-brown/5">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => togglePublish(item._id, item.is_published)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                          item.is_published 
                            ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' 
                            : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                        }`}
                      >
                        {item.is_published ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        {item.is_published ? 'Published' : 'Hidden'}
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => deleteFeedback(item._id)}
                      className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-royal-brown/40 italic">
              No {activeTab.toLowerCase()} feedback found.
            </div>
          )}
        </div>
      </div>

      {/* Add VIP Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-royal-brown-dark/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 border-b border-royal-brown/5 flex items-center justify-between bg-ivory/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-luxury-gold/10 rounded-2xl flex items-center justify-center text-luxury-gold">
                    <Star size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-royal-brown">Add VIP Perspective</h3>
                    <p className="text-xs text-royal-brown-light/60 uppercase tracking-widest font-bold">Dignitary Testimonial</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-royal-brown/40 hover:bg-red-500 hover:text-white transition-all shadow-md"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-10 space-y-8">
                <div className="flex flex-col md:flex-row gap-10">
                  <div className="w-full md:w-1/3">
                    <ImageUpload 
                      label="Dignitary Photo" 
                      value={formData.image_url} 
                      onUpload={(url) => setFormData({...formData, image_url: url})} 
                    />
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Dr. Arvind Kumar"
                        className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Designation / Title</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Former Director, IIT"
                        className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all"
                        value={formData.designation}
                        onChange={(e) => setFormData({...formData, designation: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Testimonial Message</label>
                      <textarea 
                        required
                        rows={4}
                        placeholder="The discipline and academic rigor..."
                        className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-royal-brown/5 flex justify-end gap-4">
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-8 py-3 rounded-xl font-bold text-sm text-royal-brown hover:bg-ivory transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="px-8 py-3 bg-royal-brown-dark text-ivory rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-royal-brown transition-all disabled:opacity-50"
                  >
                    {submitting ? <Loader2 className="animate-spin" size={18} /> : "Publish Testimonial"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
