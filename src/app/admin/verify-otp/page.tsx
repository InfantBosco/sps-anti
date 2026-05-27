"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2, ArrowRight } from "lucide-react";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("verify_email");
    if (!storedEmail) {
      router.push("/admin/signup");
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push("/admin/login");
      } else {
        setError(data.detail || "Verification failed");
      }
    } catch (err) {
      setError("Connection error. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-royal-brown-dark flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-luxury-gold/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-luxury-gold/20 p-10 rounded-[2.5rem] shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-luxury-gold/10 rounded-2xl flex items-center justify-center text-luxury-gold mx-auto mb-6 border border-luxury-gold/20 shadow-inner">
            <ShieldCheck size={32} />
          </div>
          <h1 className="font-serif text-3xl font-bold text-ivory mb-2">Verify Identity</h1>
          <p className="text-ivory/60 text-sm">We've sent a 6-digit code to <br/><span className="text-luxury-gold font-bold">{email}</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-luxury-gold uppercase tracking-[0.3em] text-center block mb-4">Verification Code</label>
            <input
              required
              type="text"
              maxLength={6}
              placeholder="0 0 0 0 0 0"
              className="w-full bg-ivory/5 border border-ivory/10 rounded-2xl py-6 text-center text-4xl font-mono tracking-[0.5em] text-luxury-gold outline-none focus:border-luxury-gold transition-all"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
            />
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20 text-center"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full py-4 bg-luxury-gold text-royal-brown-dark font-bold rounded-xl hover:bg-ivory transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-luxury-gold/20"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                Verify Code <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button className="text-ivory/40 text-sm hover:text-luxury-gold transition-colors">
            Didn't receive code? <span className="font-bold underline">Resend</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
