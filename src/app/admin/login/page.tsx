"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Mail, Loader2, LogIn, Sparkles } from "lucide-react";

export default function AdminLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        // Store token in localStorage
        localStorage.setItem("admin_token", data.access_token);
        localStorage.setItem("admin_user", JSON.stringify(data.user));
        router.push("/admin/dashboard");
      } else {
        setError(data.detail || "Login failed");
      }
    } catch (err) {
      setError("Connection error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-royal-brown-dark flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-luxury-gold/5 rounded-full blur-[120px]" />
      <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-luxury-gold/5 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-luxury-gold/20 p-10 rounded-[2.5rem] shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-luxury-gold/10 rounded-2xl flex items-center justify-center text-luxury-gold mx-auto mb-6 border border-luxury-gold/20 shadow-inner">
            <LogIn size={32} />
          </div>
          <h1 className="font-serif text-3xl font-bold text-ivory mb-2">Welcome Back</h1>
          <p className="text-ivory/60 text-sm tracking-widest uppercase flex items-center justify-center gap-2">
            <Sparkles size={14} className="text-luxury-gold" /> Secure Admin Access
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-luxury-gold uppercase tracking-widest ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/30 group-focus-within:text-luxury-gold transition-colors" size={20} />
              <input
                required
                type="email"
                placeholder="admin@senthil.in"
                className="w-full bg-ivory/5 border border-ivory/10 rounded-xl py-4 pl-12 pr-4 text-ivory outline-none focus:border-luxury-gold/50 transition-all"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-luxury-gold uppercase tracking-widest">Password</label>
              <Link href="#" className="text-[10px] text-ivory/40 hover:text-luxury-gold uppercase font-bold tracking-widest transition-colors">Forgot?</Link>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/30 group-focus-within:text-luxury-gold transition-colors" size={20} />
              <input
                required
                type="password"
                placeholder="••••••••"
                className="w-full bg-ivory/5 border border-ivory/10 rounded-xl py-4 pl-12 pr-4 text-ivory outline-none focus:border-luxury-gold/50 transition-all"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-luxury-gold text-royal-brown-dark font-bold rounded-xl hover:bg-ivory transition-all flex items-center justify-center gap-2 group shadow-lg shadow-luxury-gold/20"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Sign In to Dashboard"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-ivory/40 text-sm">
            Don't have an account?{" "}
            <Link href="/admin/signup" className="text-luxury-gold hover:underline font-bold">
              Register now
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
