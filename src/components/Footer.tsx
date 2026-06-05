import Link from "next/link";
import Image from "next/image";
import { Globe, MessageSquare, Share2, Hash, MapPin, Phone, Mail } from "lucide-react";
import AnimatedCrest from "./ui/AnimatedCrest";

export default function Footer() {
  return (
    <footer className="bg-royal-brown-dark text-ivory-dark py-16 md:py-24 border-t border-luxury-gold/20 relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')]"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-4 mb-6 group cursor-pointer">
              <div className="relative w-16 h-16 group-hover:scale-105 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                <Image 
                  src="/logo.png" 
                  alt="Senthil Public School Logo" 
                  fill 
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl text-ivory group-hover:text-luxury-gold transition-colors duration-300">
                  Senthil Public School
                </span>
                <span className="text-xs font-bold tracking-[0.2em] text-luxury-gold uppercase mt-1">
                  Dharmapuri
                </span>
              </div>
            </div>
            <p className="text-sm text-ivory-dark/70 leading-relaxed mb-6">
              Empowering students to achieve excellence through discipline, 
              dedication, and a world-class educational environment.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-royal-brown flex items-center justify-center text-ivory hover:bg-luxury-gold hover:text-royal-brown-dark transition-colors">
                <Globe size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-royal-brown flex items-center justify-center text-ivory hover:bg-luxury-gold hover:text-royal-brown-dark transition-colors">
                <MessageSquare size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-royal-brown flex items-center justify-center text-ivory hover:bg-luxury-gold hover:text-royal-brown-dark transition-colors">
                <Share2 size={18} />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-royal-brown flex items-center justify-center text-ivory hover:bg-luxury-gold hover:text-royal-brown-dark transition-colors">
                <Hash size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-serif font-semibold text-lg text-ivory mb-6 border-b border-royal-brown/50 pb-2 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Academics', href: '/academics' },
                { name: 'Results', href: '/results' },
                { name: 'Admissions', href: '/admissions' },
                { name: 'Gallery', href: '/gallery' },
                { name: 'Careers', href: '/careers' },
                { name: 'Contact', href: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-ivory-dark/80 hover:text-luxury-gold transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-luxury-gold/50"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Locations */}
          <div className="col-span-1">
            <h4 className="font-serif font-semibold text-lg text-ivory mb-6 border-b border-royal-brown/50 pb-2 inline-block">
              Our Branches
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Senthil Public School, Salem", href: "https://www.senthilpublicschoolsalem.in" },
                { name: "Senthil Public School, Krishnagiri", href: "https://senthilpublicschoolkgiri.in" },
                { name: "Senthil Matric Hr. Sec. School, Krishnagiri", href: "https://senthilmatricschoolkgiri.in" },
                { name: "Senthil Matric Hr. Sec. School, Dharmapuri", href: "http://senthilmhss.ac.in/" },
                { name: "Senthil Matric Hr. Sec. School, Adhiyamankottai", href: "https://senthilmatricschoolamk.in/" }
              ].map((school) => (
                <li key={school.name}>
                  <a href={school.href} target="_blank" rel="noopener noreferrer" className="text-sm text-ivory-dark/80 hover:text-luxury-gold transition-colors flex items-center gap-2">
                    <svg className="w-3 h-3 text-luxury-gold/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                    {school.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="font-serif font-semibold text-lg text-ivory mb-6 border-b border-royal-brown/50 pb-2 inline-block">
              Get In Touch
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="text-luxury-gold shrink-0 mt-1" size={20} />
                <p className="text-sm text-ivory-dark/80 leading-relaxed">
                  Senthil Public School, <br />
                  Adhiyamaan Bypass Road, <br />
                  Dharmapuri, Tamil Nadu 636701, India
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="text-luxury-gold shrink-0" size={20} />
                <p className="text-sm text-ivory-dark/80">
                  +91 98765 43210 <br /> +91 87654 32109
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-luxury-gold shrink-0" size={20} />
                <p className="text-sm text-ivory-dark/80">
                  info@senthilpublicschool.in
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-royal-brown/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-ivory-dark/60 text-center md:text-left">
            &copy; {new Date().getFullYear()} Senthil Public School. All rights reserved.
          </p>

          <div className="flex flex-col items-center">
            <AnimatedCrest />
            <span className="text-[10px] font-bold tracking-[0.4em] text-luxury-gold mt-4 uppercase opacity-50">SPS Excellence</span>
          </div>

          <div className="flex gap-4 text-sm text-ivory-dark/60">
            <Link href="/privacy" className="hover:text-luxury-gold transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-luxury-gold transition-colors">Terms of Service</Link>
          </div>
        </div>

        {/* Minimal Credits Section */}
        <div className="mt-8 pt-6 border-t border-royal-brown/30 text-center">
          <p className="text-[11px] text-ivory-dark/40 tracking-wide font-light">
            Crafted with <span className="text-luxury-gold">⬥</span> Design & Development by <span className="text-luxury-gold/70">Kiro</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
