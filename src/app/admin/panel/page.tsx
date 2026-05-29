"use client"

import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { Users, BookOpen, GraduationCap, DollarSign, Settings } from "lucide-react"

export default function AdminPanelHome() {
  const [adminName, setAdminName] = useState("Admin")

  useEffect(() => {
    const token = Cookies.get("admin_token")
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]))
        if (payload.sub) {
          const namePart = payload.sub.split("@")[0]
          setAdminName(namePart.charAt(0).toUpperCase() + namePart.slice(1))
        }
      } catch (e) {
        // ignore malformed token
      }
    }
  }, [])

  return (
    <div className="animate-fade-in-up space-y-6">
      <header className="bg-white p-8 rounded-2xl shadow-sm border border-[#8B7355]/10 bg-gradient-to-br from-white to-[#FDFBF7]">
        <h1 className="text-4xl font-serif font-bold text-[#4A3B32]">Welcome, {adminName}</h1>
        <p className="mt-2 text-[#8B7355]">Admin Control Center</p>
      </header>

      {/* Metrics grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Metric title="Total Users" value="1,245" Icon={Users} />
        <Metric title="Courses" value="86" Icon={BookOpen} />
        <Metric title="New Admissions" value="32" Icon={GraduationCap} />
        <Metric title="Revenue" value="Growth" Icon={DollarSign} />
      </div>

      {/* Quick actions */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-[#4A3B32] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ActionCard title="Settings" Icon={Settings} href="/admin/settings" />
          <ActionCard title="User Management" Icon={Users} href="/admin/users" />
          <ActionCard title="Course Catalog" Icon={BookOpen} href="/admin/courses" />
        </div>
      </section>
    </div>
  )
}

function Metric({ title, value, Icon }: { title: string; value: string; Icon: any }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#8B7355]/10 hover:shadow-md transition-all group">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm text-[#8B7355] uppercase tracking-wider">{title}</h3>
        <Icon className="text-[#D4AF37] group-hover:scale-110 transition-transform" size={24} />
      </div>
      <p className="text-4xl font-bold text-[#4A3B32] mt-4">{value}</p>
    </div>
  )
}

function ActionCard({ title, Icon, href }: { title: string; Icon: any; href: string }) {
  return (
    <a href={href} className="bg-white p-4 rounded-xl shadow hover:shadow-md transition flex items-center space-x-3 border border-[#8B7355]/10">
      <Icon className="text-[#8B7355]" size={20} />
      <span className="text-[#4A3B32] font-medium">{title}</span>
    </a>
  )
}
