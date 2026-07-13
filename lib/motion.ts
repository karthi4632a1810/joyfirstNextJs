import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const ease = {
  premium: "cubic-bezier(0.16, 1, 0.3, 1)",
  premiumInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
} as const;

export const duration = {
  fast: 0.3,
  medium: 0.7,
  slow: 1.4,
} as const;

let registered = false;

/** Registers GSAP plugins once, client-side only. Safe to call from every component that needs ScrollTrigger. */
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger };
