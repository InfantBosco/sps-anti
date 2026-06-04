"use client";

import { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'outline' | 'ghost';
}

export default function MagneticButton({
  children,
  className = "",
  variant = 'primary',
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary: "bg-luxury-gold text-royal-brown-dark hover:bg-luxury-gold-light border-transparent",
    outline: "bg-transparent border border-luxury-gold text-luxury-gold hover:bg-luxury-gold/10",
    ghost: "bg-transparent text-royal-brown hover:text-luxury-gold border-transparent",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      whileHover="hover"
      initial="initial"
      className={`relative overflow-hidden px-8 py-3 rounded-full font-medium tracking-wide transition-colors duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Scale animation */}
      <motion.div
        variants={{
          initial: { scale: 1 },
          hover: { scale: 1.08 },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
      />

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
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </motion.button>
  );
}
