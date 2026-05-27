"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  Loader2,
  X,
  UserCheck,
  Shield,
  Star
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import Image from "next/image";

type CouncilMember = {
  _id: string;
  name: string;
  designation: string;
  image_url?: string;
  order?: number;
};

export default function AdminCouncil() {
  const [members, setMembers] = useState<CouncilMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", designation: "", image_url: "", order: 0 });
  const [submitting, setSubmitting] = useState(false);

  const fetchMembers = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/student_council/`);
      if (res.ok) {
        const data = await res.json();
        setMembers(data);
      }
    } catch (err) {
      console.error("Failed to fetch council:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/student_council/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("admin_token")}` },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowModal(false);
        setFormData({ name: "", designation: "", image_url: "", order: 0 });
        fetchMembers();
      }
    } catch (err) {
      alert("Failed to add council member");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteMember = async (id: string) => {
    if (!confirm("Are you sure you want to delete this leader?")) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/student_council/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}` } });
      if (res.ok) fetchMembers();
    } catch (err) {
      alert("Failed to delete member");
    }
  };

  return (
    <div className="space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-serif text-4xl font-bold text-royal-brown">Student Leadership</h1>
          <p className="text-royal-brown-light/70 mt-2">Manage the student council body, their roles and order of priority.</p>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="px-8 py-4 bg-royal-brown-dark text-ivory rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-royal-brown transition-all shadow-lg"
        >
          <Plus size={20} className="text-luxury-gold" /> Add New Leader
        </button>
      </div>

      {/* Council List */}
      <div className="bg-white rounded-[2.5rem] border border-royal-brown/5 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-royal-brown/5 bg-ivory/20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-luxury-gold/10 rounded-xl flex items-center justify-center text-luxury-gold">
              <Shield size={20} />
            </div>
            <h3 className="font-bold text-royal-brown">Active Council Body</h3>
          </div>
          <p className="text-[10px] font-bold text-royal-brown/40 uppercase tracking-[0.2em]">{members.length} Elected Members</p>
        </div>

        <div className="p-10">
          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="animate-spin text-luxury-gold mx-auto" size={40} />
            </div>
          ) : members.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {members.sort((a,b) => (a.order || 0) - (b.order || 0)).map((member) => (
                <motion.div 
                  key={member._id}
                  className="bg-white rounded-3xl border border-royal-brown/5 shadow-sm overflow-hidden group hover:shadow-xl hover:border-luxury-gold/30 transition-all duration-500 text-center p-8"
                >
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 bg-luxury-gold rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
                    <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <Image 
                        src={member.image_url || "/principal.png"} 
                        alt={member.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                    {member.order === 0 && (
                      <div className="absolute -top-2 -right-2 bg-luxury-gold text-royal-brown-dark p-1.5 rounded-full shadow-lg">
                        <Star size={14} />
                      </div>
                    )}
                  </div>
                  
                  <h4 className="font-bold text-royal-brown text-xl mb-1">{member.name}</h4>
                  <p className="text-luxury-gold font-bold text-[10px] uppercase tracking-widest bg-luxury-gold/5 px-3 py-1 rounded-full w-fit mx-auto mb-6">
                    {member.designation}
                  </p>

                  <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2.5 bg-ivory text-royal-brown rounded-xl hover:bg-luxury-gold hover:text-royal-brown-dark transition-all">
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => deleteMember(member._id)}
                      className="p-2.5 bg-ivory text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-royal-brown/40 italic">
              Student Council is currently empty.
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
                    <UserCheck size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-royal-brown">Elect Council Leader</h3>
                    <p className="text-xs text-royal-brown-light/60 uppercase tracking-widest font-bold">New Leadership Appointment</p>
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
                      label="Leader Profile" 
                      value={formData.image_url} 
                      onUpload={(url) => setFormData({...formData, image_url: url})} 
                    />
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Student Full Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Rahul Varma"
                        className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Leadership Designation</label>
                      <select 
                        required
                        className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all"
                        value={formData.designation}
                        onChange={(e) => setFormData({...formData, designation: e.target.value})}
                      >
                        <option value="">Select Role</option>
                        <option value="School Captain (Boy)">School Captain (Boy)</option>
                        <option value="School Captain (Girl)">School Captain (Girl)</option>
                        <option value="School Vice Captain">School Vice Captain</option>
                        <option value="Sports Captain">Sports Captain</option>
                        <option value="Cultural Secretary">Cultural Secretary</option>
                        <option value="House Captain">House Captain</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Display Priority (Order)</label>
                      <input 
                        type="number" 
                        placeholder="0 for top, 1, 2..."
                        className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all"
                        value={formData.order}
                        onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                      />
                      <p className="text-[10px] text-royal-brown-light/50 italic px-1">Lower numbers appear first in the council list.</p>
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
                    {submitting ? <Loader2 className="animate-spin" size={18} /> : "Appoint Leader"}
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
