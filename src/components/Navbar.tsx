"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import AnimatedNavLink from "./ui/AnimatedNavLink";
import AnimatedButton from "./ui/AnimatedButton";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { 
    name: "Academics", 
    dropdown: [
      { name: "Montessori", href: "/academics/montessori" },
      { name: "CBSE", href: "/academics/cbse" },
      { name: "Exam Cell", href: "/academics/exam-cell" }
    ]
  },
  { name: "Results", href: "/results" },
  { name: "Infrastructure", href: "/infrastructure" },
  { name: "Admissions", href: "/admissions" },
  { 
    name: "School Activities", 
    dropdown: [
      { name: "Sports", href: "/activities/sports" },
      { name: "Co-Scholastic Activities", href: "/activities/co-scholastic" },
      { name: "Student Council", href: "/activities/student-council" },
      { name: "NIE", href: "/activities/nie" },
      { name: "Morning Assembly", href: "/activities/morning-assembly" }
    ]
  },
  { name: "Gallery", href: "/gallery" },
  { 
    name: "Feedback", 
    dropdown: [
      { name: "VIP Feedback", href: "/feedback/vip" },
      { name: "Parents Feedback", href: "/feedback/parents" },
      { name: "Submit Feedback", href: "/feedback/submit" }
    ]
  },
  { 
    name: "Contact", 
    dropdown: [
      { name: "Reach Us", href: "/contact/reach-us" },
      { name: "Enquiry", href: "/contact/enquiry" },
      { name: "Careers", href: "/contact/careers" }
    ]
  },
  { name: "Mandatory Disclosure", href: "/mandatory_disclosure.pdf" },
];

function MobileNavItem({ link, setMobileMenuOpen }: { link: any, setMobileMenuOpen: any }) {
  const [isOpen, setIsOpen] = useState(false);

  if (link.dropdown) {
    return (
      <div className="flex flex-col">
        <motion.button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between font-serif text-2xl text-royal-brown hover:text-luxury-gold transition-colors py-3 w-full text-left"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          {link.name}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="text-luxury-gold" />
          </motion.div>
        </motion.button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden pl-6 flex flex-col gap-3 mt-2 border-l-2 border-luxury-gold/30"
            >
              {link.dropdown.map((sublink: any) => (
                <motion.div
                  key={sublink.name}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={sublink.href}
                    className="font-serif text-lg text-royal-brown-light hover:text-luxury-gold transition-colors block py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {sublink.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <motion.div
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={link.href}
        target={link.name === "Mandatory Disclosure" ? "_blank" : undefined}
        rel={link.name === "Mandatory Disclosure" ? "noopener noreferrer" : undefined}
        className="font-serif text-2xl text-royal-brown hover:text-luxury-gold transition-colors block py-3"
        onClick={() => setMobileMenuOpen(false)}
      >
        {link.name}
      </Link>
    </motion.div>
  );
}

import { usePathname } from "next/navigation";
import Magnetic from "./ui/Magnetic";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine navbar appearance based on scroll and page location
  const isNavSolid = scrolled || !isHomePage;
  const navTextColor = (scrolled || !isHomePage) ? "text-royal-brown" : "text-ivory";
  const navLogoColor = (scrolled || !isHomePage) ? "text-royal-brown" : "text-ivory";
  const navSubtextColor = (scrolled || !isHomePage) ? "text-luxury-gold" : "text-luxury-gold-light";

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
          isNavSolid
            ? "py-3 bg-ivory/90 backdrop-blur-xl border-b border-luxury-gold/20 shadow-2xl shadow-black/5"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link href="/" className="group flex items-center gap-4 relative">
            <div className="relative w-14 h-14 md:w-16 md:h-16 transition-transform duration-700 group-hover:scale-110">
              <Image 
                src="/logo.png" 
                alt="Senthil Public School Logo" 
                fill 
                className="object-contain drop-shadow-lg"
                priority
                unoptimized
              />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-2 border border-luxury-gold/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" 
              />
            </div>
            <div className="hidden lg:flex flex-col">
              <span className={`font-serif font-bold text-xl leading-tight tracking-wide transition-colors duration-500 ${navLogoColor}`}>
                Senthil Public School
              </span>
              <span className={`text-[10px] tracking-[0.4em] font-bold uppercase mt-1 transition-colors duration-500 ${navSubtextColor}`}>
                Dharmapuri
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4">
            {navLinks.map((link) => (
              <Magnetic key={link.name} strength={0.2}>
                <div className="relative group px-2">
                  {link.href ? (
                    <AnimatedNavLink
                      href={link.href}
                      target={link.name === "Mandatory Disclosure" ? "_blank" : undefined}
                      rel={link.name === "Mandatory Disclosure" ? "noopener noreferrer" : undefined}
                      className={`text-[13px] font-bold uppercase tracking-widest py-4 flex items-center gap-1 relative ${navTextColor}`}
                    >
                      {link.name}
                    </AnimatedNavLink>
                  ) : (
                    <motion.div
                      className={`cursor-pointer text-[13px] font-bold uppercase tracking-widest py-4 flex items-center gap-1 relative ${navTextColor}`}
                      whileHover={{ color: "var(--color-luxury-gold)" }}
                    >
                      {link.name}
                      <motion.div
                        initial={{ rotate: 0 }}
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={12} />
                      </motion.div>
                    </motion.div>
                  )}

                  {link.dropdown && (
                    <motion.div
                      className="absolute top-[100%] left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-50"
                      initial={{ opacity: 0, y: 16 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-ivory/95 backdrop-blur-2xl border border-luxury-gold/20 shadow-2xl rounded-2xl overflow-hidden min-w-[260px] flex flex-col py-3">
                        {link.dropdown.map((sublink) => (
                          <motion.div
                            key={sublink.name}
                            whileHover={{ x: 4, backgroundColor: "var(--color-luxury-gold)" }}
                            transition={{ duration: 0.2 }}
                            className="px-6 py-3"
                          >
                            <Link
                              href={sublink.href}
                              className="text-[13px] font-semibold text-royal-brown hover:text-ivory transition-colors duration-300 flex items-center justify-between group/sub"
                            >
                              {sublink.name}
                              <motion.div
                                initial={{ width: 0 }}
                                whileHover={{ width: 16 }}
                                transition={{ duration: 0.2 }}
                                className="h-[1px] bg-ivory"
                              />
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </Magnetic>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden xl:block ml-4">
            <Link href="/admissions">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-500 relative overflow-hidden group ${
                  isNavSolid 
                    ? "bg-royal-brown text-ivory shadow-lg shadow-royal-brown/20" 
                    : "bg-ivory/20 backdrop-blur-md text-ivory border border-ivory/30"
                }`}
              >
                {/* Gold underline animation */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4 }}
                  className={`absolute bottom-0 left-0 h-[2px] ${isNavSolid ? "bg-luxury-gold" : "bg-ivory"}`}
                />
                <span className="relative z-10">Enroll Now</span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-3 rounded-full transition-colors ${
              isNavSolid ? "bg-royal-brown/10 text-royal-brown" : "bg-ivory/10 text-ivory backdrop-blur-md"
            }`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-royal-brown-dark/40 backdrop-blur-md md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-ivory shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 flex justify-between items-center border-b border-luxury-gold/10">
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-xl text-royal-brown">Senthil Public</span>
                  <span className="text-[10px] tracking-[0.3em] font-bold uppercase text-luxury-gold">Dharmapuri</span>
                </div>
                <button
                  className="p-3 bg-royal-brown/5 rounded-full text-royal-brown hover:text-luxury-gold transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-10 py-10 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.2 }}
                  >
                    <MobileNavItem link={link} setMobileMenuOpen={setMobileMenuOpen} />
                  </motion.div>
                ))}
              </div>
              <div className="p-8 border-t border-luxury-gold/10 bg-ivory-dark/30">
                <Link href="/admissions" onClick={() => setMobileMenuOpen(false)}>
                  <motion.button
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-royal-brown text-ivory font-bold uppercase tracking-widest rounded-xl relative overflow-hidden group"
                  >
                    {/* Gold underline */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.4 }}
                      className="absolute bottom-0 left-0 h-[2px] bg-luxury-gold"
                    />
                    <span className="relative z-10">Admissions 2026-27</span>
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
