"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function AnimatedButton({
  children,
  className = "",
  onClick,
  type = "button",
}: AnimatedButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`relative overflow-hidden group ${className}`}
      whileHover="hover"
      whileTap="tap"
      initial="initial"
    >
      {/* Scale animation wrapper */}
      <motion.div
        variants={{
          initial: { scale: 1 },
          hover: { scale: 1.08 },
          tap: { scale: 0.92 },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative z-20 w-full h-full flex items-center justify-center"
      >
        {/* Gold underline animation */}
        <motion.div
          variants={{
            initial: { width: 0, opacity: 0 },
            hover: { width: "100%", opacity: 1 },
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 h-[2px] bg-luxury-gold pointer-events-none"
        />

        {/* Content */}
        <span className="relative z-10">{children}</span>
      </motion.div>
    </motion.button>
  );
}
