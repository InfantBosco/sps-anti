"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Users, BookOpen, GraduationCap, DollarSign } from "lucide-react";

export default function AdminHomePage() {
  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    // We could decode the JWT token here if we want to show the specific email
    const token = Cookies.get("admin_token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.sub) {
          // split email "name@domain.com" -> "name" -> Capitalize First Letter
          const namePart = payload.sub.split('@')[0];
          setUserName(namePart.charAt(0).toUpperCase() + namePart.slice(1));
        }
      } catch (e) {}
    }
  }, []);

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#8B7355]/10 bg-gradient-to-br from-white to-[#FDFBF7]">
        <h2 className="text-3xl font-serif font-bold text-[#4A3B32]">Welcome back, {userName}!</h2>
        <p className="mt-2 text-[#8B7355]">This is your central dashboard for managing the Senthil Public School website.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#8B7355]/10 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#8B7355] uppercase tracking-wider">Total Students</h3>
            <Users className="text-[#D4AF37] group-hover:scale-110 transition-transform" size={24} />
          </div>
          <p className="text-4xl font-bold text-[#4A3B32] mt-4">1,245</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#8B7355]/10 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#8B7355] uppercase tracking-wider">Faculty Members</h3>
            <BookOpen className="text-[#D4AF37] group-hover:scale-110 transition-transform" size={24} />
          </div>
          <p className="text-4xl font-bold text-[#4A3B32] mt-4">86</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#8B7355]/10 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#8B7355] uppercase tracking-wider">New Admissions</h3>
            <GraduationCap className="text-[#D4AF37] group-hover:scale-110 transition-transform" size={24} />
          </div>
          <p className="text-4xl font-bold text-[#4A3B32] mt-4">32</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#8B7355]/10 hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#8B7355] uppercase tracking-wider">Revenue Focus</h3>
            <DollarSign className="text-[#D4AF37] group-hover:scale-110 transition-transform" size={24} />
          </div>
          <p className="text-4xl font-bold text-[#4A3B32] mt-4">Growth</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#8B7355]/10 h-64 flex items-center justify-center">
            <p className="text-[#8B7355]/50">Analytics Chart Placeholder</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#8B7355]/10 h-64 flex flex-col">
            <h3 className="font-bold text-lg text-[#4A3B32] border-b border-[#8B7355]/10 pb-4 mb-4">Recent Activity</h3>
            <ul className="space-y-4 overflow-y-auto flex-1">
                <li className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-[#D4AF37]"></div>
                    <div>
                        <p className="text-sm font-medium text-[#4A3B32]">System Admin logged in</p>
                        <p className="text-xs text-[#8B7355]">Just now</p>
                    </div>
                </li>
                <li className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-[#D4AF37]"></div>
                    <div>
                        <p className="text-sm font-medium text-[#4A3B32]">New admission inquiry received</p>
                        <p className="text-xs text-[#8B7355]">2 hours ago</p>
                    </div>
                </li>
                <li className="flex items-start gap-3">
                    <div className="w-2 h-2 mt-2 rounded-full bg-[#D4AF37]"></div>
                    <div>
                        <p className="text-sm font-medium text-[#4A3B32]">Gallery updated with "Sports Day" photos</p>
                        <p className="text-xs text-[#8B7355]">Yesterday</p>
                    </div>
                </li>
            </ul>
        </div>
      </div>
    </div>
  );
}

