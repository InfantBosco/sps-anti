"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Search, 
  Trash2, 
  Mail, 
  Phone, 
  Calendar, 
  FileText,
  Loader2,
  X,
  ExternalLink,
  CheckCircle2,
  Clock,
  MoreHorizontal
} from "lucide-react";

type Application = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  experience?: string;
  resume_url: string;
  coverLetter?: string;
  status: string;
  createdAt: string;
};

export default function AdminCareers() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const fetchApplications = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/careers/`);
      if (res.ok) {
        const data = await res.json();
        setApplications(data);
      }
    } catch (err) {
      console.error("Failed to fetch applications:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/careers/${id}/status?status=${status}`, { method: "PATCH", headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}` } });
      if (res.ok) {
        fetchApplications();
        if (selectedApp?._id === id) setSelectedApp({ ...selectedApp, status });
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const deleteApplication = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application?")) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/careers/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}` } });
      if (res.ok) {
        fetchApplications();
        if (selectedApp?._id === id) setSelectedApp(null);
      }
    } catch (err) {
      alert("Failed to delete application");
    }
  };

  const filteredApps = applications.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-serif text-4xl font-bold text-royal-brown">Recruitment Portal</h1>
          <p className="text-royal-brown-light/70 mt-2">Manage job applications, review resumes and track candidate statuses.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="bg-white px-6 py-3 rounded-xl border border-royal-brown/5 shadow-sm">
            <p className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest leading-none mb-1">Active Positions</p>
            <p className="text-lg font-bold text-royal-brown">12 Openings</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-royal-brown/5 shadow-sm overflow-hidden min-h-[60vh]">
        <div className="p-8 border-b border-royal-brown/5 bg-ivory/20 flex flex-col md:flex-row gap-6 justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-royal-brown/30" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, position or email..." 
              className="w-full bg-white border border-royal-brown/10 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-luxury-gold/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-ivory-dark/10">
                <th className="px-8 py-4 text-[10px] font-bold text-luxury-gold-dark uppercase tracking-widest">Candidate</th>
                <th className="px-8 py-4 text-[10px] font-bold text-luxury-gold-dark uppercase tracking-widest">Position</th>
                <th className="px-8 py-4 text-[10px] font-bold text-luxury-gold-dark uppercase tracking-widest">Experience</th>
                <th className="px-8 py-4 text-[10px] font-bold text-luxury-gold-dark uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-luxury-gold-dark uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-royal-brown/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <Loader2 className="animate-spin text-luxury-gold mx-auto" size={32} />
                  </td>
                </tr>
              ) : filteredApps.length > 0 ? (
                filteredApps.map((app) => (
                  <tr key={app._id} className="hover:bg-ivory/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-ivory-dark text-royal-brown flex items-center justify-center font-bold">
                          {app.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-royal-brown">{app.name}</p>
                          <p className="text-xs text-royal-brown-light/60">{app.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-sm font-bold text-royal-brown">{app.position}</span>
                    </td>
                    <td className="px-8 py-6 text-sm text-royal-brown-light">
                      {app.experience ? `${app.experience} Years` : 'Not specified'}
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                        app.status === 'Shortlisted' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                        app.status === 'Rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                        'bg-blue-500/10 text-blue-500 border-blue-500/20'
                      }`}>
                        {app.status || 'Applied'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => setSelectedApp(app)}
                          className="p-2 bg-ivory text-royal-brown rounded-lg hover:bg-luxury-gold transition-all"
                        >
                          <FileText size={18} />
                        </button>
                        <button 
                          onClick={() => updateStatus(app._id, 'Shortlisted')}
                          className="p-2 bg-ivory text-emerald-500 rounded-lg hover:bg-emerald-500 hover:text-white transition-all"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        <button 
                          onClick={() => deleteApplication(app._id)}
                          className="p-2 bg-ivory text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-royal-brown/40 italic">
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedApp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedApp(null)}
              className="absolute inset-0 bg-royal-brown-dark/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-8 border-b border-royal-brown/5 flex items-center justify-between bg-ivory/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-luxury-gold/10 rounded-2xl flex items-center justify-center text-luxury-gold">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-royal-brown">Candidate Profile</h3>
                    <p className="text-xs text-royal-brown-light/60 uppercase tracking-widest font-bold">{selectedApp.position}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-royal-brown/40 hover:bg-red-500 hover:text-white transition-all shadow-md"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 p-10 overflow-y-auto space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest mb-2">Candidate Name</p>
                      <h4 className="text-2xl font-bold text-royal-brown">{selectedApp.name}</h4>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest mb-2">Contact Details</p>
                      <div className="space-y-2">
                        <p className="flex items-center gap-2 text-royal-brown-light"><Mail size={16} className="text-luxury-gold" /> {selectedApp.email}</p>
                        <p className="flex items-center gap-2 text-royal-brown-light"><Phone size={16} className="text-luxury-gold" /> {selectedApp.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest mb-2">Experience</p>
                      <p className="text-lg font-bold text-royal-brown">{selectedApp.experience || '0'} Years</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest mb-2">Resume Document</p>
                      <a 
                        href={selectedApp.resume_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-ivory px-6 py-3 rounded-xl border border-royal-brown/10 text-royal-brown font-bold hover:bg-luxury-gold transition-all group"
                      >
                        <FileText size={20} className="text-luxury-gold group-hover:text-royal-brown" /> View CV/Resume <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest">Cover Letter / Note</p>
                  <div className="bg-ivory/30 p-8 rounded-3xl border border-royal-brown/5 italic text-royal-brown-light leading-relaxed">
                    "{selectedApp.coverLetter || 'No cover letter provided.'}"
                  </div>
                </div>
              </div>

              <div className="p-8 border-t border-royal-brown/5 bg-ivory/10 flex justify-end gap-4">
                <button 
                  onClick={() => updateStatus(selectedApp._id, 'Rejected')}
                  className="px-8 py-3 rounded-xl font-bold text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  Reject Candidate
                </button>
                <button 
                  onClick={() => updateStatus(selectedApp._id, 'Shortlisted')}
                  className="px-8 py-3 bg-emerald-500 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                >
                  Shortlist Candidate
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
