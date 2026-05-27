"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Lock, Loader2, ArrowRight } from "lucide-react";

export default function AdminSignup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        // Redirect to OTP verification with email in state
        sessionStorage.setItem("verify_email", formData.email);
        router.push("/admin/verify-otp");
      } else {
        setError(data.detail || "Signup failed");
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
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-luxury-gold/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px] -ml-32 -mb-32" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-luxury-gold/20 p-10 rounded-[2.5rem] shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-luxury-gold/10 rounded-2xl flex items-center justify-center text-luxury-gold mx-auto mb-6 border border-luxury-gold/20 shadow-inner">
            <User size={32} />
          </div>
          <h1 className="font-serif text-3xl font-bold text-ivory mb-2">Admin Registration</h1>
          <p className="text-ivory/60 text-sm tracking-widest uppercase">Create your master account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-luxury-gold uppercase tracking-widest ml-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-ivory/30 group-focus-within:text-luxury-gold transition-colors" size={20} />
              <input
                required
                type="text"
                placeholder="Enter your name"
                className="w-full bg-ivory/5 border border-ivory/10 rounded-xl py-4 pl-12 pr-4 text-ivory outline-none focus:border-luxury-gold/50 transition-all"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

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
            <label className="text-xs font-bold text-luxury-gold uppercase tracking-widest ml-1">Password</label>
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
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                Register Account <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-ivory/40 text-sm">
            Already have an account?{" "}
            <Link href="/admin/login" className="text-luxury-gold hover:underline font-bold">
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
