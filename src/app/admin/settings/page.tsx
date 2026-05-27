"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Settings, 
  Save, 
  Loader2, 
  School, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Globe,
  Play,
  AtSign,
  Link
} from "lucide-react";
import ImageUpload from "@/components/admin/ImageUpload";

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [settings, setSettings] = useState({
    schoolName: "Senthil Public School",
    email: "info@senthil.in",
    phone: "+91 98765 43210",
    address: "Dharmapuri, Tamil Nadu",
    timings: "8:30 AM - 4:00 PM",
    logoUrl: "",
    bannerUrl: "",
    socialLinks: {
      youtube: "",
      instagram: "",
      facebook: ""
    }
  });

  const fetchSettings = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/settings/`);
      if (res.ok) {
        const data = await res.json();
        if (data.length > 0) setSettings(data[0]);
      }
    } catch (err) {
      console.error("Failed to fetch settings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/settings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("admin_token")}` },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        alert("Settings updated successfully!");
      }
    } catch (err) {
      alert("Failed to update settings");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header Area */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-4xl font-bold text-royal-brown">Institutional Settings</h1>
          <p className="text-royal-brown-light/70 mt-2">Manage global configurations, contact information and branding.</p>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center">
          <Loader2 className="animate-spin text-luxury-gold mx-auto" size={40} />
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-20">
          
          {/* Branding Section */}
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white p-10 rounded-[2.5rem] border border-royal-brown/5 shadow-sm space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-luxury-gold/10 rounded-xl flex items-center justify-center text-luxury-gold">
                  <School size={20} />
                </div>
                <h3 className="font-bold text-royal-brown text-xl">General Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">School Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-4 px-5 outline-none focus:border-luxury-gold/50 transition-all font-serif text-lg font-bold"
                    value={settings.schoolName}
                    onChange={(e) => setSettings({...settings, schoolName: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Operational Hours</label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-gold" size={18} />
                    <input 
                      type="text" 
                      className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-4 pl-12 pr-5 outline-none focus:border-luxury-gold/50 transition-all"
                      value={settings.timings}
                      onChange={(e) => setSettings({...settings, timings: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Physical Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-luxury-gold" size={18} />
                  <textarea 
                    rows={3}
                    className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-4 pl-12 pr-5 outline-none focus:border-luxury-gold/50 transition-all resize-none"
                    value={settings.address}
                    onChange={(e) => setSettings({...settings, address: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-royal-brown/5 shadow-sm space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-luxury-gold/10 rounded-xl flex items-center justify-center text-luxury-gold">
                  <Globe size={20} />
                </div>
                <h3 className="font-bold text-royal-brown text-xl">Digital Assets & Branding</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <ImageUpload 
                  label="Official School Logo" 
                  value={settings.logoUrl} 
                  onUpload={(url) => setSettings({...settings, logoUrl: url})} 
                />
                <ImageUpload 
                  label="Homepage Hero Banner" 
                  value={settings.bannerUrl} 
                  onUpload={(url) => setSettings({...settings, bannerUrl: url})} 
                />
              </div>
            </div>
          </div>

          {/* Contact & Social Section */}
          <div className="space-y-10">
            <div className="bg-white p-10 rounded-[2.5rem] border border-royal-brown/5 shadow-sm space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-luxury-gold/10 rounded-xl flex items-center justify-center text-luxury-gold">
                  <Phone size={20} />
                </div>
                <h3 className="font-bold text-royal-brown text-xl">Contact Point</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Official Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-gold" size={18} />
                    <input 
                      type="email" 
                      className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-4 pl-12 pr-5 outline-none focus:border-luxury-gold/50 transition-all"
                      value={settings.email}
                      onChange={(e) => setSettings({...settings, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-gold" size={18} />
                    <input 
                      type="tel" 
                      className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-4 pl-12 pr-5 outline-none focus:border-luxury-gold/50 transition-all"
                      value={settings.phone}
                      onChange={(e) => setSettings({...settings, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-royal-brown/5 shadow-sm space-y-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-luxury-gold/10 rounded-xl flex items-center justify-center text-luxury-gold">
                  <Play size={20} />
                </div>
                <h3 className="font-bold text-royal-brown text-xl">Social Presence</h3>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">YouTube Channel</label>
                  <input 
                    type="url" 
                    placeholder="https://youtube.com/..."
                    className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-4 px-5 outline-none focus:border-luxury-gold/50 transition-all"
                    value={settings.socialLinks.youtube}
                    onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, youtube: e.target.value}})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">Instagram Profile</label>
                  <input 
                    type="url" 
                    placeholder="https://instagram.com/..."
                    className="w-full bg-ivory/50 border border-royal-brown/10 rounded-xl py-4 px-5 outline-none focus:border-luxury-gold/50 transition-all"
                    value={settings.socialLinks.instagram}
                    onChange={(e) => setSettings({...settings, socialLinks: {...settings.socialLinks, instagram: e.target.value}})}
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={submitting}
                className="w-full py-5 bg-royal-brown-dark text-luxury-gold rounded-2xl font-bold hover:bg-royal-brown transition-all shadow-xl shadow-royal-brown-dark/20 flex items-center justify-center gap-3"
              >
                {submitting ? <Loader2 className="animate-spin" size={20} /> : <><Save size={20} /> Save Changes</>}
              </button>
            </div>
          </div>

        </form>
      )}
    </div>
  );
}
