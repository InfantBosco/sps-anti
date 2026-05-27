"use client";

import Image from "next/image";

export default function MorningAssemblyPage() {
  return (
    <main className="min-h-screen bg-ivory text-royal-brown-dark pb-20">
            
      <div className="container mx-auto px-6 md:px-12 pt-40">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-royal-brown mb-4">
            Morning <span className="text-luxury-gold">Assembly</span>
          </h1>
          <div className="w-24 h-1 bg-luxury-gold mx-auto rounded-full" />
        </div>

        {/* Parallel Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side: Extracted Content */}
          <div className="w-full lg:w-1/2 space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-royal-brown leading-tight">
                Energizing Communal Gathering <br/>
                <span className="text-luxury-gold text-2xl lg:text-3xl">A Positive Start Together</span>
              </h2>
              <p className="text-lg font-medium text-royal-brown-light pt-2">
                The Common Assembly is conducted every week:
              </p>
            </div>

            {/* Schedule Table / List */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-royal-brown/10">
              <ul className="space-y-4 text-royal-brown-dark">
                <li className="flex items-center gap-4 pb-4 border-b border-royal-brown/10">
                  <span className="font-bold w-24 shrink-0 text-luxury-gold-dark">Monday</span>
                  <span>(VI - VIII) - Lobby Assembly</span>
                </li>
                <li className="flex items-center gap-4 pb-4 border-b border-royal-brown/10">
                  <span className="font-bold w-24 shrink-0 text-luxury-gold-dark">Tuesday</span>
                  <span>(IX & X) - Lobby Assembly</span>
                </li>
                <li className="flex items-center gap-4 pb-4 border-b border-royal-brown/10">
                  <span className="font-bold w-24 shrink-0 text-luxury-gold-dark">Wednesday</span>
                  <span>(III - V) - Ground Assembly</span>
                </li>
                <li className="flex items-center gap-4 pb-4 border-b border-royal-brown/10">
                  <span className="font-bold w-24 shrink-0 text-luxury-gold-dark">Thursday</span>
                  <span>(VI - VIII) - Ground Assembly</span>
                </li>
                <li className="flex items-center gap-4 pb-4 border-b border-royal-brown/10">
                  <span className="font-bold w-24 shrink-0 text-luxury-gold-dark">Friday</span>
                  <span>MONT / (I & II) - Ground Assembly (Alternative weeks)</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="font-bold w-24 shrink-0 text-luxury-gold-dark">Saturday</span>
                  <span>(IX & X) / (XI & XII) - Ground Assembly (Alternative weeks)</span>
                </li>
              </ul>
            </div>

            <div className="bg-royal-brown-dark text-ivory p-6 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/10 rounded-full blur-2xl" />
              <p className="text-lg leading-relaxed relative z-10">
                Different Classes take turns to present the morning assembly. Every child is given a chance to participate and share stories, songs, play, facts, skills etc. This enables the children to overcome their stage fear and increase their confidence level.
              </p>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="w-full lg:w-1/2 relative h-[500px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl group order-1 lg:order-2">
            <Image
              src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1000"
              alt="Morning Assembly Gathering"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              unoptimized
            />
            {/* Elegant inner border */}
            <div className="absolute inset-4 border-2 border-white/20 rounded-2xl pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

        </div>
      </div>
    </main>
  );
}
