"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PhoneCall, 
  Search, 
  Trash2, 
  Mail, 
  User, 
  Calendar, 
  MessageCircle,
  Loader2,
  X,
  ChevronRight,
  Reply,
  ArrowLeft
} from "lucide-react";

type Contact = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
};

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Contact | null>(null);

  const fetchEnquiries = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/contact/`);
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data);
      }
    } catch (err) {
      console.error("Failed to fetch enquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const deleteEnquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry?")) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/contact/${id}`, { method: "DELETE", headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}` } });
      if (res.ok) {
        fetchEnquiries();
        if (selectedEnquiry?._id === id) setSelectedEnquiry(null);
      }
    } catch (err) {
      alert("Failed to delete enquiry");
    }
  };

  const filteredEnquiries = enquiries.filter(item => 
    item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 md:space-y-10">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-royal-brown">Helpdesk & Enquiries</h1>
          <p className="text-royal-brown-light/70 mt-2 text-sm md:text-base">Manage visitor queries, complaints and general correspondence.</p>
        </div>
        
        <div className="bg-white px-6 py-4 rounded-2xl border border-royal-brown/5 shadow-sm flex items-center gap-4 w-fit">
          <div className="w-10 h-10 bg-luxury-gold/10 rounded-xl flex items-center justify-center text-luxury-gold">
            <MessageCircle size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest">Unread Queries</p>
            <p className="text-sm font-bold text-royal-brown">{enquiries.length} Messages</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
        
        {/* Enquiry List */}
        <div className={`lg:col-span-5 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-royal-brown/5 shadow-sm overflow-hidden flex flex-col h-[60vh] md:h-[70vh] ${selectedEnquiry ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-4 md:p-6 border-b border-royal-brown/5 bg-ivory/20">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-royal-brown/30" size={18} />
              <input 
                type="text" 
                placeholder="Search queries..." 
                className="w-full bg-white border border-royal-brown/10 rounded-xl py-3 pl-12 pr-4 text-sm outline-none focus:border-luxury-gold/50 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-royal-brown/5 scrollbar-thin scrollbar-thumb-luxury-gold/20">
            {loading ? (
              <div className="py-20 text-center">
                <Loader2 className="animate-spin text-luxury-gold mx-auto" size={32} />
              </div>
            ) : filteredEnquiries.length > 0 ? (
              filteredEnquiries.map((item) => (
                <button 
                  key={item._id}
                  onClick={() => setSelectedEnquiry(item)}
                  className={`w-full p-4 md:p-6 text-left hover:bg-ivory/30 transition-all flex justify-between items-center group ${selectedEnquiry?._id === item._id ? 'bg-luxury-gold/5 border-l-4 border-luxury-gold' : ''}`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-royal-brown truncate text-sm md:text-base">{item.firstName} {item.lastName}</h4>
                      <span className="text-[10px] text-royal-brown-light/40 whitespace-nowrap">• {new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-[10px] md:text-xs font-bold text-luxury-gold uppercase tracking-widest truncate mb-2">{item.subject}</p>
                    <p className="text-xs text-royal-brown-light/60 truncate italic">"{item.message}"</p>
                  </div>
                  <ChevronRight size={18} className={`text-royal-brown/20 group-hover:text-luxury-gold transition-all ${selectedEnquiry?._id === item._id ? 'text-luxury-gold translate-x-1' : ''}`} />
                </button>
              ))
            ) : (
              <div className="py-20 text-center text-royal-brown/40 italic text-sm px-6">
                No inquiries found.
              </div>
            )}
          </div>
        </div>

        {/* Enquiry Detail View */}
        <div className={`lg:col-span-7 bg-white rounded-[2rem] md:rounded-[2.5rem] border border-royal-brown/5 shadow-sm overflow-hidden h-[60vh] md:h-[70vh] flex flex-col ${selectedEnquiry ? 'flex' : 'hidden lg:flex'}`}>
          {selectedEnquiry ? (
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedEnquiry._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col h-full"
              >
                <div className="p-4 md:p-8 border-b border-royal-brown/5 bg-ivory/10 flex items-center justify-between">
                  <div className="flex items-center gap-3 md:gap-4">
                    <button 
                      onClick={() => setSelectedEnquiry(null)}
                      className="p-2 -ml-2 text-royal-brown hover:bg-ivory rounded-lg lg:hidden"
                    >
                      <ArrowLeft size={20} />
                    </button>
                    <div className="w-10 h-10 md:w-14 md:h-14 bg-royal-brown-dark rounded-xl md:rounded-2xl flex items-center justify-center text-luxury-gold font-bold text-lg md:text-xl shrink-0">
                      {selectedEnquiry.firstName.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-serif text-lg md:text-2xl font-bold text-royal-brown truncate">{selectedEnquiry.firstName} {selectedEnquiry.lastName}</h3>
                      <p className="text-[10px] md:text-xs font-bold text-luxury-gold uppercase tracking-widest flex items-center gap-2 truncate">
                        <Mail size={10} className="md:w-3 md:h-3" /> {selectedEnquiry.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 md:gap-2">
                    <button className="p-2 md:p-3 bg-white text-royal-brown rounded-lg md:rounded-xl shadow-sm border border-royal-brown/10 hover:text-luxury-gold transition-colors">
                      <Reply size={18} className="md:w-5 md:h-5" />
                    </button>
                    <button 
                      onClick={() => deleteEnquiry(selectedEnquiry._id)}
                      className="p-2 md:p-3 bg-white text-red-500 rounded-lg md:rounded-xl shadow-sm border border-royal-brown/10 hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Trash2 size={18} className="md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 p-6 md:p-10 overflow-y-auto space-y-6 md:space-y-8">
                  <div className="space-y-3 md:space-y-4">
                    <p className="text-[10px] font-bold text-luxury-gold-dark uppercase tracking-[0.2em]">Enquiry Subject</p>
                    <h4 className="text-lg md:text-2xl font-serif font-bold text-royal-brown bg-ivory/50 p-4 rounded-xl md:rounded-2xl border-l-4 border-luxury-gold">
                      {selectedEnquiry.subject}
                    </h4>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <p className="text-[10px] font-bold text-luxury-gold-dark uppercase tracking-[0.2em]">Message Content</p>
                    <div className="text-base md:text-lg text-royal-brown-light leading-relaxed bg-ivory/20 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-royal-brown/5 italic">
                      "{selectedEnquiry.message}"
                    </div>
                  </div>

                  <div className="flex items-center gap-6 pt-6 md:pt-10 border-t border-royal-brown/5">
                    <div className="flex items-center gap-3 text-xs md:text-sm text-royal-brown/40">
                      <Calendar size={16} className="text-luxury-gold" />
                      Received on {new Date(selectedEnquiry.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-8 border-t border-royal-brown/5 bg-ivory/10">
                  <button className="w-full py-3 md:py-4 bg-royal-brown-dark text-ivory rounded-xl md:rounded-2xl font-bold hover:bg-royal-brown transition-all flex items-center justify-center gap-2 text-sm md:text-base">
                    <Reply size={18} className="text-luxury-gold" /> Send Response Email
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 text-royal-brown/30">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-ivory-dark rounded-full flex items-center justify-center mb-6">
                <PhoneCall size={32} className="md:w-10 md:h-10" />
              </div>
              <h3 className="font-serif text-xl md:text-2xl font-bold mb-2 text-royal-brown/40">No Enquiry Selected</h3>
              <p className="max-w-xs text-xs md:text-sm italic">Click on a message from the list to view its full details.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
