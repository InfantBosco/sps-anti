"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  GraduationCap, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  Calendar,
  CheckCircle2,
  XCircle,
  Clock,
  Loader2
} from "lucide-react";

type AdmissionInquiry = {
  _id: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  gradeApplyingFor: string;
  status: string;
  createdAt: string;
};

export default function AdminAdmissions() {
  const [inquiries, setInquiries] = useState<AdmissionInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAdmissions = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/admissions/`);
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error("Failed to fetch admissions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  const filteredInquiries = inquiries.filter(item => 
    item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-serif text-4xl font-bold text-royal-brown">Admissions Portal</h1>
          <p className="text-royal-brown-light/70 mt-2">Manage and review incoming enrollment inquiries for the 2026-27 session.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-6 py-3 bg-white border border-royal-brown/10 rounded-xl text-royal-brown font-bold text-sm flex items-center gap-2 hover:bg-ivory transition-colors">
            <Filter size={18} className="text-luxury-gold" /> Filter By Grade
          </button>
          <button className="px-6 py-3 bg-royal-brown-dark text-ivory rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-royal-brown transition-colors">
            Export Records
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-royal-brown/5 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-luxury-gold/10 rounded-xl flex items-center justify-center text-luxury-gold">
            <GraduationCap size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-royal-brown-light/60 uppercase tracking-widest">Total Inquiries</p>
            <h3 className="text-2xl font-bold text-royal-brown">{inquiries.length}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-royal-brown/5 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500">
            <Clock size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-royal-brown-light/60 uppercase tracking-widest">Pending Review</p>
            <h3 className="text-2xl font-bold text-royal-brown">{inquiries.filter(i => i.status === 'Pending').length}</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-royal-brown/5 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
            <CheckCircle2 size={28} />
          </div>
          <div>
            <p className="text-xs font-bold text-royal-brown-light/60 uppercase tracking-widest">Selected/Contacted</p>
            <h3 className="text-2xl font-bold text-royal-brown">{inquiries.filter(i => i.status === 'Contacted').length}</h3>
          </div>
        </div>
      </div>

      {/* Main Table Area */}
      <div className="bg-white rounded-[2.5rem] border border-royal-brown/5 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-royal-brown/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-ivory/20">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-royal-brown/30" size={18} />
            <input 
              type="text" 
              placeholder="Search by student, parent or email..." 
              className="w-full bg-white border border-royal-brown/10 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-luxury-gold/50 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-royal-brown/40 uppercase tracking-widest">
            Sorted by <span className="text-royal-brown">Newest First</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-ivory-dark/10">
                <th className="px-8 py-4 text-[10px] font-bold text-luxury-gold-dark uppercase tracking-widest">Student / Grade</th>
                <th className="px-8 py-4 text-[10px] font-bold text-luxury-gold-dark uppercase tracking-widest">Parent Details</th>
                <th className="px-8 py-4 text-[10px] font-bold text-luxury-gold-dark uppercase tracking-widest">Date Applied</th>
                <th className="px-8 py-4 text-[10px] font-bold text-luxury-gold-dark uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-luxury-gold-dark uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-royal-brown/5">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center">
                    <Loader2 className="animate-spin text-luxury-gold mx-auto" size={32} />
                    <p className="mt-4 text-sm font-serif italic text-royal-brown/40">Loading applications...</p>
                  </td>
                </tr>
              ) : filteredInquiries.length > 0 ? (
                filteredInquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="hover:bg-ivory/30 transition-colors group">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-royal-brown-dark text-luxury-gold flex items-center justify-center font-bold">
                          {inquiry.studentName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-royal-brown">{inquiry.studentName}</p>
                          <p className="text-xs font-bold text-luxury-gold uppercase tracking-widest">Grade {inquiry.gradeApplyingFor}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="font-medium text-royal-brown mb-1">{inquiry.parentName}</p>
                      <div className="flex items-center gap-3 text-xs text-royal-brown-light/60">
                        <span className="flex items-center gap-1"><Mail size={12} /> {inquiry.email}</span>
                        <span className="flex items-center gap-1"><Phone size={12} /> {inquiry.phone}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-royal-brown-light">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-luxury-gold" />
                        {new Date(inquiry.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                        inquiry.status === 'Contacted' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                        inquiry.status === 'Rejected' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
                        'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      }`}>
                        {inquiry.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 rounded-lg bg-ivory text-royal-brown hover:bg-luxury-gold hover:text-royal-brown-dark transition-all">
                          <CheckCircle2 size={18} />
                        </button>
                        <button className="p-2 rounded-lg bg-ivory text-royal-brown hover:bg-red-500 hover:text-white transition-all">
                          <XCircle size={18} />
                        </button>
                        <button className="p-2 rounded-lg bg-ivory text-royal-brown hover:bg-royal-brown-dark hover:text-ivory transition-all">
                          <MoreHorizontal size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-royal-brown/40 italic">
                    No applications found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
