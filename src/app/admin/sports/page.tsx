"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dumbbell, 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  Loader2,
  X,
  Trophy,
  CheckCircle2,
  ListPlus
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import Image from "next/image";

type Sport = {
  _id: string;
  title: string;
  image_url: string;
  achievements: string[];
  order?: number;
};

export default function AdminSports() {
  const [sports, setSports] = useState<Sport[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ 
    title: "", 
    image_url: "", 
    achievements: [""] as string[], 
    order: 0 
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchSports = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/sports/`);
      if (res.ok) {
        const data = await res.json();
        setSports(data);
      }
    } catch (err) {
      console.error("Failed to fetch sports:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSports();
  }, []);

  const addAchievementField = () => {
    setFormData({ ...formData, achievements: [...formData.achievements, ""] });
  };

  const updateAchievement = (index: number, value: string) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = value;
    setFormData({ ...formData, achievements: newAchievements });
  };

  const removeAchievement = (index: number) => {
    const newAchievements = formData.achievements.filter((_, i) => i !== index);
    setFormData({ ...formData, achievements: newAchievements });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/sports/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("admin_token")}` },
        body: JSON.stringify({
          ...formData,
          achievements: formData.achievements.filter(a => a.trim() !== "")
        }),
      });

      if (res.ok) {
        setShowModal(false);
        setFormData({ title: "", image_url: "", achievements: [""], order: 0 });
        fetchSports();
      }
    } catch (err) {
      alert("Failed to add sport");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteSport = async (id: string) => {
    if (!confirm("Are you sure you want to delete this sport category?")) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/sports/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}` } });
      if (res.ok) fetchSports();
    } catch (err) {
      alert("Failed to delete sport");
    }
  };

  return (
    <div className="space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-serif text-4xl font-bold text-royal-brown">Sports & Athletics</h1>
          <p className="text-royal-brown-light/70 mt-2">Manage sports disciplines, facilities, and student achievements.</p>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="px-8 py-4 bg-royal-brown-dark text-ivory rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-royal-brown transition-all shadow-lg"
        >
          <Plus size={20} className="text-luxury-gold" /> Add New Sport
        </button>
      </div>

      {/* Sports List */}
      <div className="bg-white rounded-[2.5rem] border border-royal-brown/5 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-royal-brown/5 bg-ivory/20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-luxury-gold/10 rounded-xl flex items-center justify-center text-luxury-gold">
              <Trophy size={20} />
            </div>
            <h3 className="font-bold text-royal-brown">Athletic Disciplines</h3>
          </div>
          <p className="text-[10px] font-bold text-royal-brown/40 uppercase tracking-[0.2em]">{sports.length} Managed Sports</p>
        </div>

        <div className="p-10">
          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="animate-spin text-luxury-gold mx-auto" size={40} />
            </div>
          ) : sports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sports.map((sport) => (
                <motion.div 
                  key={sport._id}
                  className="bg-white rounded-3xl border border-royal-brown/5 shadow-sm overflow-hidden flex flex-col md:flex-row group hover:shadow-xl hover:border-luxury-gold/30 transition-all duration-500"
                >
                  <div className="relative w-full md:w-48 h-48 md:h-auto">
                    <Image 
                      src={sport.image_url} 
                      alt={sport.title} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="flex-1 p-8 relative">
                    <h4 className="font-bold text-royal-brown text-xl mb-4">{sport.title}</h4>
                    <div className="space-y-2 mb-6">
                      <p className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest">Recent Achievements</p>
                      <ul className="space-y-1">
                        {sport.achievements.slice(0, 2).map((a, i) => (
                          <li key={i} className="text-xs text-royal-brown-light flex items-center gap-2">
                            <CheckCircle2 size={12} className="text-luxury-gold" /> {a}
                          </li>
                        ))}
                        {sport.achievements.length > 2 && (
                          <li className="text-[10px] text-royal-brown-light/40 italic">+{sport.achievements.length - 2} more achievements</li>
                        )}
                      </ul>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="p-2 bg-ivory text-royal-brown rounded-lg hover:bg-luxury-gold transition-all">
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => deleteSport(sport._id)}
                        className="p-2 bg-ivory text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-royal-brown/40 italic">
              No sports content added yet.
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
                    <Dumbbell size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-royal-brown">Add Sport Category</h3>
                    <p className="text-xs text-royal-brown-light/60 uppercase tracking-widest font-bold">Content Management</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-royal-brown/40 hover:bg-red-500 hover:text-white transition-all shadow-md"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <ImageUpload 
                    label="Cover Image" 
                    value={formData.image_url} 
                    onUpload={(url) => setFormData({...formData, image_url: url})} 
                  />
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Sport Title</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Football / Basketball"
                        className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Display Priority</label>
                      <input 
                        type="number" 
                        className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all"
                        value={formData.order}
                        onChange={(e) => setFormData({...formData, order: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Recent Achievements</label>
                    <button 
                      type="button"
                      onClick={addAchievementField}
                      className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest flex items-center gap-1 hover:underline"
                    >
                      <ListPlus size={14} /> Add Achievement
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.achievements.map((achievement, idx) => (
                      <div key={idx} className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="e.g. Zonal Winners 2023"
                          className="flex-1 bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all"
                          value={achievement}
                          onChange={(e) => updateAchievement(idx, e.target.value)}
                        />
                        {formData.achievements.length > 1 && (
                          <button 
                            type="button"
                            onClick={() => removeAchievement(idx)}
                            className="p-3 text-red-500 hover:bg-red-50 transition-colors rounded-xl"
                          >
                            <X size={18} />
                          </button>
                        )}
                      </div>
                    ))}
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
                    {submitting ? <Loader2 className="animate-spin" size={18} /> : "Save Sport Category"}
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
