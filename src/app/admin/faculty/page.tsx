"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  CheckCircle2, 
  Loader2,
  X,
  ChevronRight,
  Briefcase,
  Layers
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import Image from "next/image";

type Faculty = {
  _id: string;
  name: string;
  designation: string;
  department: string;
  image_url?: string;
};

export default function AdminFaculty() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", designation: "", department: "", image_url: "" });
  const [submitting, setSubmitting] = useState(false);

  const fetchFaculty = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/faculty/`);
      if (res.ok) {
        const data = await res.json();
        setFaculty(data);
      }
    } catch (err) {
      console.error("Failed to fetch faculty:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/faculty/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("admin_token")}` },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowModal(false);
        setFormData({ name: "", designation: "", department: "", image_url: "" });
        fetchFaculty();
      }
    } catch (err) {
      alert("Failed to add faculty");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteFaculty = async (id: string) => {
    if (!confirm("Are you sure you want to delete this faculty member?")) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/faculty/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}` } });
      if (res.ok) fetchFaculty();
    } catch (err) {
      alert("Failed to delete faculty");
    }
  };

  return (
    <div className="space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-serif text-4xl font-bold text-royal-brown">Faculty Management</h1>
          <p className="text-royal-brown-light/70 mt-2">Manage teaching staff profiles, designations and departments.</p>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="px-8 py-4 bg-luxury-gold text-royal-brown-dark rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-ivory transition-all shadow-lg shadow-luxury-gold/20"
        >
          <Plus size={20} /> Add New Faculty
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-royal-brown/5 shadow-sm">
          <p className="text-[10px] font-bold text-luxury-gold uppercase tracking-[0.2em] mb-1">Total Staff</p>
          <h3 className="text-2xl font-bold text-royal-brown">{faculty.length}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-royal-brown/5 shadow-sm">
          <p className="text-[10px] font-bold text-luxury-gold uppercase tracking-[0.2em] mb-1">Departments</p>
          <h3 className="text-2xl font-bold text-royal-brown">{new Set(faculty.map(f => f.department)).size}</h3>
        </div>
      </div>

      {/* Faculty List */}
      <div className="bg-white rounded-[2.5rem] border border-royal-brown/5 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-royal-brown/5 bg-ivory/20">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-royal-brown/30" size={18} />
            <input 
              type="text" 
              placeholder="Search faculty by name or department..." 
              className="w-full bg-white border border-royal-brown/10 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-luxury-gold/50 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
          {loading ? (
            <div className="col-span-full py-20 text-center">
              <Loader2 className="animate-spin text-luxury-gold mx-auto" size={40} />
            </div>
          ) : faculty.length > 0 ? (
            faculty.map((member) => (
              <motion.div 
                key={member._id}
                layoutId={member._id}
                className="bg-ivory/30 p-6 rounded-3xl border border-royal-brown/5 relative group hover:shadow-xl hover:border-luxury-gold/30 transition-all duration-500"
              >
                <div className="flex gap-6 items-center">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-md">
                    <Image 
                      src={member.image_url || "/principal.png"} 
                      alt={member.name} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-royal-brown text-lg leading-tight">{member.name}</h4>
                    <p className="text-luxury-gold font-bold text-[10px] uppercase tracking-widest mt-1 mb-3">{member.designation}</p>
                    <div className="flex items-center gap-2 text-xs text-royal-brown-light/60">
                      <Layers size={14} /> {member.department}
                    </div>
                  </div>
                </div>

                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-white text-royal-brown rounded-lg shadow-md hover:text-luxury-gold transition-colors">
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => deleteFaculty(member._id)}
                    className="p-2 bg-white text-red-500 rounded-lg shadow-md hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-royal-brown/40 italic">
              No faculty members added yet. Use the "Add New Faculty" button to begin.
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
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-10 border-b border-royal-brown/5 flex items-center justify-between bg-ivory/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-luxury-gold/10 rounded-2xl flex items-center justify-center text-luxury-gold">
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-royal-brown">Add Faculty Member</h3>
                    <p className="text-xs text-royal-brown-light/60 uppercase tracking-widest font-bold">New Profile Registration</p>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ImageUpload 
                    label="Faculty Photograph" 
                    value={formData.image_url} 
                    onUpload={(url) => setFormData({...formData, image_url: url})} 
                  />
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Dr. Ramesh Kumar"
                        className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Designation</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. PGT Physics"
                        className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all"
                        value={formData.designation}
                        onChange={(e) => setFormData({...formData, designation: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Department</label>
                      <select 
                        required
                        className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all"
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                      >
                        <option value="">Select Department</option>
                        <option value="Science">Science</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="English">English</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Social Science">Social Science</option>
                        <option value="Physical Education">Physical Education</option>
                        <option value="Arts & Craft">Arts & Craft</option>
                      </select>
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
                    {submitting ? <Loader2 className="animate-spin" size={18} /> : "Save Faculty Member"}
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
