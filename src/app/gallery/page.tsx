"use client";

import { useState, useEffect } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import RoyalImageEffect from "@/components/ui/RoyalImageEffect";
import ImageReveal from "@/components/ui/ImageReveal";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

type GalleryItem = {
  _id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
};

const fallbackImages = [
  "/hero-bg.png",
  "/about-bg.png",
  "/infra-bg.png",
  "/hero-bg.png",
  "/about-bg.png",
  "/infra-bg.png",
];

export default function GalleryPage() {
  const [images, setImages] = useState<string[]>(fallbackImages);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const res = await fetch(`${apiUrl}/api/gallery/`);
        if (res.ok) {
          const data: GalleryItem[] = await res.json();
          if (data && data.length > 0) {
            setImages(data.map(item => item.image_url));
          }
        }
      } catch (err) {
        console.error("Failed to fetch gallery", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGallery();
  }, []);

  return (
    <main className="min-h-screen bg-ivory">
            
      {/* Header */}
      <section className="pt-40 pb-20 bg-royal-brown-dark text-ivory">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <SectionHeading 
            title="Life at Senthil" 
            subtitle="Gallery" 
            light={true} 
          />
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-luxury-gold w-12 h-12" />
            </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {images.map((src, idx) => (
                <div key={idx} className="break-inside-avoid relative">
                  <ImageReveal delay={(idx % 3) * 0.2}>
                    <div style={{ height: idx % 2 === 0 ? '500px' : '400px' }} className="w-full relative shadow-sm hover:shadow-xl transition-shadow duration-500 rounded-3xl overflow-hidden">
                      <RoyalImageEffect 
                        src={src} 
                        alt={`Gallery Image ${idx + 1}`} 
                        className="w-full h-full"
                        overlayText="View Fullscreen"
                      />
                    </div>
                  </ImageReveal>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      </main>
  );
}

