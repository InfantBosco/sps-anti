"use client";

import { useState } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  onUpload: (url: string) => void;
  value?: string;
  label?: string;
}

export default function ImageUpload({ onUpload, value, label }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiUrl}/api/upload/`, {
        method: "POST", headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}` }, body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        onUpload(data.url);
      } else {
        alert(data.detail || "Upload failed");
      }
    } catch (err) {
      alert("Error uploading image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {label && <label className="text-xs font-bold text-royal-brown/40 uppercase tracking-widest">{label}</label>}
      
      <div className="relative group">
        {value ? (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-royal-brown/10 shadow-lg">
            <Image src={value} alt="Uploaded" fill className="object-cover" />
            <button 
              onClick={() => onUpload("")}
              className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full aspect-video bg-ivory border-2 border-dashed border-royal-brown/10 rounded-2xl cursor-pointer hover:border-luxury-gold/50 hover:bg-white transition-all group">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {loading ? (
                <Loader2 className="animate-spin text-luxury-gold mb-4" size={40} />
              ) : (
                <>
                  <div className="w-16 h-16 bg-luxury-gold/10 rounded-2xl flex items-center justify-center text-luxury-gold mb-4 group-hover:scale-110 transition-transform">
                    <Upload size={32} />
                  </div>
                  <p className="text-sm text-royal-brown font-bold mb-1">Upload Photo</p>
                  <p className="text-xs text-royal-brown-light/60">JPG, PNG or WEBP (Max 5MB)</p>
                </>
              )}
            </div>
            <input type="file" className="hidden" onChange={handleUpload} disabled={loading} />
          </label>
        )}
      </div>
    </div>
  );
}
