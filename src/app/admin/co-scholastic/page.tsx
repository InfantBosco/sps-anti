"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  Loader2,
  X,
  Play,
  Image as ImageIcon,
  CheckCircle2,
  ListFilter
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";
import Image from "next/image";

type Activity = {
  _id: string;
  title: string;
  category: string;
  description: string;
  image_url?: string;
  youtube_url?: string;
  order?: number;
};

const CATEGORIES = ["NIE", "Morning Assembly", "Robotics", "Clubs", "Arts", "Music"];

export default function AdminActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [formData, setFormData] = useState({ 
    title: "", 
    category: "NIE", 
    description: "", 
    image_url: "", 
    youtube_url: "", 
    order: 0 
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchActivities = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/activities/`);
      if (res.ok) {
        const data = await res.json();
        setActivities(data);
      }
    } catch (err) {
      console.error("Failed to fetch activities:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/activities/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("admin_token")}` },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setShowModal(false);
        setFormData({ title: "", category: "NIE", description: "", image_url: "", youtube_url: "", order: 0 });
        fetchActivities();
      }
    } catch (err) {
      alert("Failed to add activity");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteActivity = async (id: string) => {
    if (!confirm("Are you sure you want to delete this activity?")) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/activities/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}` } });
      if (res.ok) fetchActivities();
    } catch (err) {
      alert("Failed to delete activity");
    }
  };

  const filteredActivities = activeCategory === "All" 
    ? activities 
    : activities.filter(a => a.category === activeCategory);

  return (
    <div className="space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-serif text-4xl font-bold text-royal-brown">Co-Scholastic Activities</h1>
          <p className="text-royal-brown-light/70 mt-2">Manage events, clubs, special programs and media highlights.</p>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="px-8 py-4 bg-royal-brown-dark text-ivory rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-royal-brown transition-all shadow-lg"
        >
          <Plus size={20} className="text-luxury-gold" /> Post New Activity
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={() => setActiveCategory("All")}
          className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeCategory === 'All' ? 'bg-luxury-gold text-royal-brown-dark shadow-md' : 'bg-white text-royal-brown/60 hover:bg-ivory'}`}
        >
          All Activities
        </button>
        {CATEGORIES.map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-luxury-gold text-royal-brown-dark shadow-md' : 'bg-white text-royal-brown/60 hover:bg-ivory'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      <div className="bg-white rounded-[2.5rem] border border-royal-brown/5 shadow-sm overflow-hidden min-h-[50vh]">
        <div className="p-10">
          {loading ? (
            <div className="py-20 text-center">
              <Loader2 className="animate-spin text-luxury-gold mx-auto" size={40} />
            </div>
          ) : filteredActivities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredActivities.map((activity) => (
                <motion.div 
                  key={activity._id}
                  className="bg-ivory/20 rounded-3xl border border-royal-brown/5 overflow-hidden group hover:shadow-xl hover:border-luxury-gold/30 transition-all duration-500"
                >
                  <div className="relative aspect-video">
                    <Image 
                      src={activity.image_url || "/principal.png"} 
                      alt={activity.title} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-royal-brown-dark/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-bold text-luxury-gold uppercase tracking-widest">
                      {activity.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="font-bold text-royal-brown text-lg mb-2">{activity.title}</h4>
                    <p className="text-sm text-royal-brown-light/70 line-clamp-2 mb-4 italic">"{activity.description}"</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-royal-brown/5">
                      <div className="flex gap-2">
                        {activity.youtube_url && (
                          <div className="p-2 bg-red-500/10 text-red-500 rounded-lg" title="YouTube Video Linked">
                            <Play size={16} />
                          </div>
                        )}
                        {activity.image_url && (
                          <div className="p-2 bg-luxury-gold/10 text-luxury-gold-dark rounded-lg" title="Image Uploaded">
                            <ImageIcon size={16} />
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 bg-white text-royal-brown rounded-lg shadow-sm hover:text-luxury-gold transition-colors">
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => deleteActivity(activity._id)}
                          className="p-2 bg-white text-red-500 rounded-lg shadow-sm hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-royal-brown/40 italic">
              No activities found in this category.
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
              className="relative w-full max-w-3xl bg-white rounded-[3rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="p-10 border-b border-royal-brown/5 flex items-center justify-between bg-ivory/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-luxury-gold/10 rounded-2xl flex items-center justify-center text-luxury-gold">
                    <Palette size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-royal-brown">Post New Activity</h3>
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

              <form onSubmit={handleSubmit} className="p-10 space-y-8 overflow-y-auto flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <ImageUpload 
                    label="Display Image" 
                    value={formData.image_url} 
                    onUpload={(url) => setFormData({...formData, image_url: url})} 
                  />
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Activity Title</label>
                      <input 
                        required
                        type="text" 
                        placeholder="e.g. Robotics Workshop 2024"
                        className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Category</label>
                      <select 
                        required
                        className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                      >
                        {CATEGORIES.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">YouTube Link (Optional)</label>
                      <input 
                        type="url" 
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all"
                        value={formData.youtube_url}
                        onChange={(e) => setFormData({...formData, youtube_url: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Detailed Description</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="Describe the activity, its highlights and student participation..."
                    className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-3 px-4 outline-none focus:border-luxury-gold/50 transition-all resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                  />
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
                    {submitting ? <Loader2 className="animate-spin" size={18} /> : "Publish Activity"}
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
