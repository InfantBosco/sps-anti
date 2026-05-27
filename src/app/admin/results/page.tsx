"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Trophy, 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  Loader2,
  X,
  Star,
  Award,
  BookOpen
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import Image from "next/image";

type Result = {
  _id: string;
  year: number;
  studentName: string;
  grade: string;
  marks?: number;
  percentage?: number;
  examName: string;
  image_url?: string;
};

export default function AdminResults() {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ 
    year: new Date().getFullYear(), 
    studentName: "", 
    grade: "", 
    percentage: 0, 
    examName: "CBSE Class XII", 
    image_url: "" 
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchResults = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/results/`);
      if (res.ok) {
        const data = await res.json();
        setResults(data);
      }
    } catch (err) {
      console.error("Failed to fetch results:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/results/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("admin_token")}` },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowModal(false);
        setFormData({ 
          year: new Date().getFullYear(), 
          studentName: "", 
          grade: "", 
          percentage: 0, 
          examName: "CBSE Class XII", 
          image_url: "" 
        });
        fetchResults();
      }
    } catch (err) {
      alert("Failed to add result");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteResult = async (id: string) => {
    if (!confirm("Are you sure you want to delete this result?")) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/results/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}` } });
      if (res.ok) fetchResults();
    } catch (err) {
      alert("Failed to delete result");
    }
  };

  return (
    <div className="space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-serif text-4xl font-bold text-royal-brown">Academic Achievements</h1>
          <p className="text-royal-brown-light/70 mt-2">Manage board results, toppers, and examination milestones.</p>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="px-8 py-4 bg-royal-brown-dark text-ivory rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-royal-brown transition-all shadow-lg"
        >
          <Plus size={20} className="text-luxury-gold" /> Post New Result
        </button>
      </div>

      {/* Results List */}
      <div className="bg-white rounded-[2.5rem] border border-royal-brown/5 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-royal-brown/5 bg-ivory/20 flex flex-col md:flex-row gap-6 justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-royal-brown/30" size={18} />
            <input 
              type="text" 
              placeholder="Search results by student or exam..." 
              className="w-full bg-white border border-royal-brown/10 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-luxury-gold/50 transition-all"
            />
          </div>
          <div className="flex gap-4">
            <select className="bg-white border border-royal-brown/10 rounded-xl px-4 py-3 text-sm outline-none font-bold text-royal-brown">
              <option>All Years</option>
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
            </select>
          </div>
        </div>

        <div className="p-10">
          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="animate-spin text-luxury-gold mx-auto" size={40} />
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((result) => (
                <motion.div 
                  key={result._id}
                  className="bg-white rounded-3xl border border-royal-brown/5 shadow-sm overflow-hidden group hover:shadow-xl hover:border-luxury-gold/30 transition-all duration-500"
                >
                  <div className="relative aspect-square">
                    <Image 
                      src={result.image_url || "/principal.png"} 
                      alt={result.studentName} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-luxury-gold text-xs font-bold uppercase tracking-widest">{result.examName}</p>
                      <h4 className="text-white font-bold text-lg leading-tight">{result.studentName}</h4>
                    </div>
                    
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => deleteResult(result._id)}
                        className="p-2 bg-white/90 backdrop-blur-md text-red-500 rounded-xl shadow-lg hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 bg-ivory/20 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-royal-brown/40 uppercase tracking-widest">Percentage</p>
                      <p className="text-2xl font-serif font-bold text-royal-brown">{result.percentage}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-royal-brown/40 uppercase tracking-widest">Year</p>
                      <p className="text-lg font-bold text-luxury-gold-dark">{result.year}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-royal-brown/40 italic">
              No academic results posted yet.
            </div>
          )}
        </div>
      </div>

      {/* Add Modal */}
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
              className="relative w-full max-w-3xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 border-b border-royal-brown/5 flex items-center justify-between bg-ivory/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-luxury-gold/10 rounded-2xl flex items-center justify-center text-luxury-gold">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-royal-brown">Post Academic Result</h3>
                    <p className="text-xs text-royal-brown-light/60 uppercase tracking-widest font-bold">New Topper Entry</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <ImageUpload 
                    label="Topper's Photograph" 
                    value={formData.image_url} 
                    onUpload={(url) => setFormData({...formData, image_url: url})} 
                  />
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Student Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Ananya S."
                        className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all"
                        value={formData.studentName}
                        onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Exam Category</label>
                        <select 
                          className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all"
                          value={formData.examName}
                          onChange={(e) => setFormData({...formData, examName: e.target.value})}
                        >
                          <option value="CBSE Class XII">CBSE Class XII</option>
                          <option value="CBSE Class X">CBSE Class X</option>
                          <option value="NEET">NEET</option>
                          <option value="JEE">JEE</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Year</label>
                        <input 
                          type="number" 
                          className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all"
                          value={formData.year}
                          onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Percentage (%)</label>
                        <input 
                          required
                          type="number" 
                          step="0.01"
                          placeholder="98.5"
                          className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all"
                          value={formData.percentage}
                          onChange={(e) => setFormData({...formData, percentage: parseFloat(e.target.value)})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Grade/Rank</label>
                        <input 
                          type="text" 
                          placeholder="A1 / District 1st"
                          className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all"
                          value={formData.grade}
                          onChange={(e) => setFormData({...formData, grade: e.target.value})}
                        />
                      </div>
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
                    {submitting ? <Loader2 className="animate-spin" size={18} /> : "Publish Achievement"}
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
