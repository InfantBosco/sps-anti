"use client";

import { useState, useEffect } from "react";
import InfrastructureSection from "@/components/InfrastructureSection";
import RoyalImageEffect from "@/components/ui/RoyalImageEffect";
import { Loader2 } from "lucide-react";

type Facility = {
  _id: string;
  title: string;
  description: string;
  category: string;
  image_url: string;
};

const fallbackImages = [
  { src: "/infra-bg.png", alt: "Modern Laboratory", title: "Advanced Science Labs" },
  { src: "/about-bg.png", alt: "Grand Library", title: "Resource Center" },
  { src: "/infra-bg.png", alt: "Sports Complex", title: "Indoor Sports Complex" },
  { src: "/hero-bg.png", alt: "Smart Classrooms", title: "Smart Classrooms" },
];

export default function InfrastructurePage() {
  const [facilities, setFacilities] = useState<any[]>(fallbackImages);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInfra = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        // Standardized backend route with /api/ prefix
        const res = await fetch(`${apiUrl}/api/infrastructure/`);
        if (res.ok) {
          const data: Facility[] = await res.json();
          if (data && data.length > 0) {
            setFacilities(data.map(item => ({
              src: item.image_url || "/infra-bg.png",
              alt: item.title,
              title: item.title
            })));
          }
        }
      } catch (err) {
        console.error("Failed to fetch infrastructure:", err);
        // Page continues to use fallbackImages set in useState default
      } finally {
        setIsLoading(false);
      }
    };
    fetchInfra();
  }, []);

  return (
    <main className="min-h-screen bg-ivory">
            
      {/* Header handled by the InfrastructureSection component modified for full width */}
      <InfrastructureSection />

      {/* Facilities Grid */}
      <section className="py-24 bg-ivory-light border-t border-royal-brown/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h3 className="font-serif text-3xl font-bold text-royal-brown mb-6">A Glimpse into Our Campus</h3>
            <p className="text-royal-brown-light/80 text-lg leading-relaxed">
              Every corner of Senthil Public School is designed to foster creativity, focus, and physical well-being.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="animate-spin text-luxury-gold w-10 h-10" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {facilities.map((img, idx) => (
                <div key={idx} className="h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-md">
                  <RoyalImageEffect 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full"
                    overlayText={img.title}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      </main>
  );
}

