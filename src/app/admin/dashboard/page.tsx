"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  GraduationCap, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  Clock,
  ArrowUpRight,
  ChevronRight,
  Loader2
} from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { label: "Total Students", value: "0", change: "+0%", icon: GraduationCap, color: "bg-blue-500" },
    { label: "Active Faculty", value: "0", change: "+0%", icon: Users, color: "bg-emerald-500" },
    { label: "Pending Enquiries", value: "0", change: "+0%", icon: MessageSquare, color: "bg-amber-500" },
    { label: "Admission Requests", value: "0", change: "+0%", icon: TrendingUp, color: "bg-purple-500" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        
        // Fetch all relevant data counts
        const [facRes, enqRes, admRes, couRes] = await Promise.all([
          fetch(`${apiUrl}/api/faculty/`),
          fetch(`${apiUrl}/api/contact/`),
          fetch(`${apiUrl}/api/admissions/`),
          fetch(`${apiUrl}/api/student_council/`)
        ]);

        const [faculty, enquiries, admissions, council] = await Promise.all([
          facRes.json(),
          enqRes.json(),
          admRes.json(),
          couRes.json()
        ]);

        setStats([
          { label: "Total Students", value: "1,240", change: "+12%", icon: GraduationCap, color: "bg-blue-500" }, // Dummy for students
          { label: "Active Faculty", value: faculty.length.toString(), change: "+5%", icon: Users, color: "bg-emerald-500" },
          { label: "Total Enquiries", value: enquiries.length.toString(), change: "+24%", icon: MessageSquare, color: "bg-amber-500" },
          { label: "Admissions", value: admissions.length.toString(), change: "+42%", icon: TrendingUp, color: "bg-purple-500" },
        ]);
      } catch (err) {
        console.error("Stats fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const recentActivity = [
    { id: 1, type: "Admission", title: "New application from Rajesh Kumar", time: "2 hours ago", status: "Pending" },
    { id: 2, type: "Result", title: "Class XII Physics results uploaded", time: "5 hours ago", status: "Published" },
    { id: 3, type: "Enquiry", title: "Query regarding transportation fees", time: "Yesterday", status: "Resolved" },
    { id: 4, type: "Feedback", title: "VIP Testimonial from Dr. S. K. Gupta", time: "2 days ago", status: "New" },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="font-serif text-4xl font-bold text-royal-brown">Dashboard Overview</h1>
          <p className="text-royal-brown-light/70 mt-2">Welcome back to the Senthil Public School administration portal.</p>
        </div>
        
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-royal-brown/5 shadow-sm">
          <div className="bg-luxury-gold/10 p-3 rounded-xl text-luxury-gold">
            <Calendar size={20} />
          </div>
          <div className="pr-6">
            <p className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest">Academic Year</p>
            <p className="text-sm font-bold text-royal-brown">2026 - 2027</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 rounded-[2rem] border border-royal-brown/5 shadow-sm hover:shadow-xl hover:border-luxury-gold/20 transition-all duration-500 group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 ${stat.color}/10 rounded-2xl flex items-center justify-center text-ivory transition-transform group-hover:scale-110 duration-500`}>
                <stat.icon size={24} className={`text-${stat.color.split('-')[1]}-500`} />
              </div>
              <span className="flex items-center gap-1 text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded-full">
                {stat.change} <ArrowUpRight size={12} />
              </span>
            </div>
            <p className="text-royal-brown-light/60 text-xs font-bold uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-serif font-bold text-royal-brown">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-royal-brown">Recent Activity</h3>
            <button className="text-xs font-bold text-luxury-gold uppercase tracking-widest hover:underline flex items-center gap-1">
              View All Logs <ChevronRight size={14} />
            </button>
          </div>
          
          <div className="bg-white rounded-[2.5rem] border border-royal-brown/5 shadow-sm overflow-hidden">
            <div className="divide-y divide-royal-brown/5">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-6 flex items-center justify-between hover:bg-ivory/30 transition-colors">
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 rounded-full bg-ivory-dark flex items-center justify-center">
                      <Clock size={16} className="text-royal-brown/40" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-luxury-gold uppercase tracking-widest mb-1">{activity.type}</p>
                      <h4 className="text-royal-brown font-semibold">{activity.title}</h4>
                      <p className="text-[10px] text-royal-brown-light/60 mt-1 uppercase tracking-tighter">{activity.time}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                    activity.status === 'Published' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                    activity.status === 'Pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 
                    'bg-royal-brown/10 text-royal-brown border-royal-brown/20'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions / System Status */}
        <div className="space-y-6">
          <h3 className="font-serif text-2xl font-bold text-royal-brown">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4">
            <button className="p-6 bg-royal-brown-dark rounded-2xl text-ivory text-left group hover:bg-royal-brown transition-all">
              <p className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest mb-2">Publishing</p>
              <h4 className="font-serif text-xl font-bold mb-4">Post New Result</h4>
              <div className="flex justify-between items-center text-ivory/40">
                <span className="text-xs">Direct Link</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </button>
            
            <button className="p-6 bg-white rounded-2xl text-royal-brown text-left border border-royal-brown/5 shadow-sm group hover:border-luxury-gold/30 transition-all">
              <p className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest mb-2">Personnel</p>
              <h4 className="font-serif text-xl font-bold mb-4">Add Faculty Member</h4>
              <div className="flex justify-between items-center text-royal-brown/40">
                <span className="text-xs">Staff Management</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </button>

            <button className="p-6 bg-luxury-gold rounded-2xl text-royal-brown-dark text-left group hover:bg-ivory transition-all shadow-lg shadow-luxury-gold/20">
              <p className="text-[10px] font-bold text-royal-brown-dark/60 uppercase tracking-widest mb-2">Events</p>
              <h4 className="font-serif text-xl font-bold mb-4">Update Sports News</h4>
              <div className="flex justify-between items-center text-royal-brown-dark/40">
                <span className="text-xs">Scholastic Updates</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
