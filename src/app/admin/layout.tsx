"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { User, Bell, Search, Loader2, Menu } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Auth pages that don't need the sidebar layout
  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/signup" || pathname === "/admin/verify-otp";

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    const storedUser = localStorage.getItem("admin_user");

    if (!token && !isAuthPage) {
      router.push("/admin/login");
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, [pathname, router, isAuthPage]);

  // Handle window resize to close sidebar on large screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    
    handleResize(); // Init
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isAuthorized === null && !isAuthPage) {
    return (
      <div className="min-h-screen bg-royal-brown-dark flex items-center justify-center">
        <Loader2 className="animate-spin text-luxury-gold" size={40} />
      </div>
    );
  }

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-ivory flex overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col min-h-screen min-w-0 relative">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-royal-brown/5 flex items-center justify-between px-4 md:px-10 sticky top-0 z-40 backdrop-blur-md bg-white/80">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-royal-brown hover:bg-ivory rounded-lg lg:hidden"
            >
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center gap-4 bg-ivory-dark/30 px-4 py-2 rounded-full border border-royal-brown/5 w-64 md:w-96 group focus-within:border-luxury-gold/50 transition-all">
              <Search size={18} className="text-royal-brown/30 group-focus-within:text-luxury-gold transition-colors" />
              <input 
                type="text" 
                placeholder="Search records..." 
                className="bg-transparent border-none outline-none text-sm w-full text-royal-brown placeholder:text-royal-brown/30"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <button className="relative p-2 text-royal-brown/40 hover:text-luxury-gold transition-colors hidden xs:block">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            
            <div className="h-8 w-[1px] bg-royal-brown/10 mx-2 hidden md:block" />

            <div className="flex items-center gap-3 md:gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-royal-brown leading-none">{user?.name || "Admin User"}</p>
                <p className="text-[10px] text-luxury-gold uppercase tracking-widest mt-1 font-bold">Principal Office</p>
              </div>
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-luxury-gold/10 border border-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                <User size={20} />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-10 flex-grow overflow-x-hidden overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
