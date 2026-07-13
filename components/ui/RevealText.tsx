"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap, prefersReducedMotion } from "@/lib/motion";

type RevealTextProps = {
  children: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  delay?: number;
};

export default function RevealText({
  children,
  as = "p",
  className = "",
  delay = 0,
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    registerGsap();
    const el = containerRef.current;
    if (!el || prefersReducedMotion()) return;

    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    gsap.set(words, { yPercent: 110 });

    const ctx = gsap.context(() => {
      gsap.to(words, {
        yPercent: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.035,
        delay,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay]);

  const words = children.split(" ");
  const wrapClassName = `${className} flex flex-wrap gap-x-[0.28em]`;
  const ref = containerRef as React.RefObject<HTMLElement>;

  const content = words.map((word, i) => (
    <span key={i} className="inline-block overflow-hidden pb-[0.15em]">
      <span data-word className="inline-block will-change-transform">
        {word}
      </span>
    </span>
  ));

  switch (as) {
    case "h1":
      return (
        <h1 ref={ref as React.RefObject<HTMLHeadingElement>} className={wrapClassName}>
          {content}
        </h1>
      );
    case "h3":
      return (
        <h3 ref={ref as React.RefObject<HTMLHeadingElement>} className={wrapClassName}>
          {content}
        </h3>
      );
    case "p":
      return (
        <p ref={ref as React.RefObject<HTMLParagraphElement>} className={wrapClassName}>
          {content}
        </p>
      );
    case "h2":
    default:
      return (
        <h2 ref={ref as React.RefObject<HTMLHeadingElement>} className={wrapClassName}>
          {content}
        </h2>
      );
  }
}
