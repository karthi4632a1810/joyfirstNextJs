"use client";

import { useEffect, useRef } from "react";
import { usePointerFine } from "@/lib/hooks";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const enabled = usePointerFine();

  useEffect(() => {
    if (!enabled) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dotRef.current?.style.setProperty(
        "transform",
        `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
      );
    };

    const tick = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ringRef.current?.style.setProperty(
        "transform",
        `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      );
      raf = requestAnimationFrame(tick);
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a, button, [data-cursor-hover]");
      ringRef.current?.classList.toggle("scale-150", Boolean(target));
      ringRef.current?.classList.toggle("border-bronze", Boolean(target));
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(tick);
    document.documentElement.classList.add("cursor-none");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("cursor-none");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-bronze"
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-9 w-9 rounded-full border border-charcoal/40 transition-[transform,border-color] duration-200 ease-out"
      />
    </div>
  );
}
