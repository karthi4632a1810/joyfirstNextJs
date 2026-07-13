"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
};

export default function MagneticButton({
  href,
  children,
  variant = "solid",
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.2 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm uppercase tracking-[0.14em] transition-colors duration-300";
  const styles: Record<string, string> = {
    solid: "bg-charcoal text-parchment hover:bg-bronze",
    outline: "border border-charcoal/30 text-charcoal hover:border-bronze hover:text-bronze",
    ghost: "border border-white/30 text-white hover:border-bronze-light hover:text-bronze-light",
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      data-cursor-hover
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </motion.a>
  );
}
