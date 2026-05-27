"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  Trophy, 
  Users, 
  GraduationCap, 
  Dumbbell, 
  MessageSquare, 
  PhoneCall, 
  Briefcase,
  Settings,
  LogOut,
  ChevronRight,
  Palette,
  X
} from "lucide-react";

const menuItems = [
  { group: "Overview", items: [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  ]},
  { group: "Content Management", items: [
    { name: "Academic Results", href: "/admin/results", icon: Trophy },
    { name: "Faculty Staff", href: "/admin/faculty", icon: Users },
    { name: "Student Council", href: "/admin/council", icon: GraduationCap },
    { name: "Sports & Achievements", href: "/admin/sports", icon: Dumbbell },
    { name: "Co-Scholastic", href: "/admin/co-scholastic", icon: Palette },
  ]},
  { group: "Student Affairs", items: [
    { name: "Admissions", href: "/admin/admissions", icon: GraduationCap },
    { name: "Enquiries", href: "/admin/enquiries", icon: PhoneCall },
    { name: "Careers", href: "/admin/careers", icon: Briefcase },
    { name: "Feedback", href: "/admin/feedback", icon: MessageSquare },
  ]},
  { group: "System", items: [
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]}
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    window.location.href = "/admin/login";
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ 
          x: isOpen ? 0 : -300,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`w-72 h-screen bg-royal-brown-dark border-r border-luxury-gold/10 flex flex-col fixed left-0 top-0 z-[110] lg:translate-x-0 lg:static`}
      >
        {/* Sidebar Header */}
        <div className="p-8 border-b border-luxury-gold/10 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-luxury-gold rounded-xl flex items-center justify-center text-royal-brown-dark font-bold text-xl shadow-lg shadow-luxury-gold/20">
              S
            </div>
            <div>
              <h1 className="font-serif text-ivory font-bold leading-tight">Admin Panel</h1>
              <p className="text-[10px] text-luxury-gold uppercase tracking-[0.2em] font-bold">Dharmapuri</p>
            </div>
          </Link>
          <button 
            onClick={onClose}
            className="p-2 text-ivory/40 hover:text-luxury-gold lg:hidden"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 overflow-y-auto py-8 px-4 space-y-8 scrollbar-thin scrollbar-thumb-luxury-gold/20">
          {menuItems.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <h2 className="px-4 text-[10px] font-bold text-luxury-gold/40 uppercase tracking-[0.3em] mb-4">
                {group.group}
              </h2>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        if (window.innerWidth < 1024) onClose();
                      }}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                        isActive 
                          ? "bg-luxury-gold text-royal-brown-dark shadow-lg shadow-luxury-gold/10" 
                          : "text-ivory/50 hover:bg-ivory/5 hover:text-ivory"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon size={20} className={isActive ? "text-royal-brown-dark" : "text-luxury-gold/60 group-hover:text-luxury-gold transition-colors"} />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      {isActive && (
                        <motion.div layoutId="active-pill">
                          <ChevronRight size={16} />
                        </motion.div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-luxury-gold/10">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-red-400 hover:bg-red-400/10 transition-all font-bold text-sm"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </motion.div>
    </>
  );
}
