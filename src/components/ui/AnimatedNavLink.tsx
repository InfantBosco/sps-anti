"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface AnimatedNavLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export default function AnimatedNavLink({
  href,
  children,
  className = "",
  target,
  rel,
  onClick,
}: AnimatedNavLinkProps) {
  return (
    <Link href={href} target={target} rel={rel} onClick={onClick}>
      <motion.div
        className={`relative overflow-hidden cursor-pointer inline-block group ${className}`}
        whileHover="hover"
        initial="initial"
      >
        {/* Scale animation container */}
        <motion.div
          variants={{
            initial: { scale: 1 },
            hover: { scale: 1.08 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="inline-block"
        >
          {/* Text slide animation */}
          <motion.span
            variants={{
              initial: { y: 0, opacity: 1 },
              hover: { y: -24, opacity: 0 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="inline-block"
          >
            {children}
          </motion.span>
          <motion.span
            variants={{
              initial: { y: 24, opacity: 0 },
              hover: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 top-0 text-luxury-gold inline-block"
          >
            {children}
          </motion.span>
        </motion.div>

        {/* Gold underline animation */}
        <motion.div
          variants={{
            initial: { width: 0, opacity: 0 },
            hover: { width: "100%", opacity: 1 },
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 h-[2px] bg-luxury-gold"
        />
      </motion.div>
    </Link>
  );
}
