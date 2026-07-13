"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { gsap, registerGsap } from "./motion";

/** SSR-safe media query hook: renders `false` on the server and syncs to the real value after hydration, without a manual effect + setState. */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query]
  );
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = useCallback(() => false, []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

export function usePointerFine(): boolean {
  return useMediaQuery("(pointer: fine)");
}

/** Becomes true once, the first time the element scrolls into view — used to defer mounting expensive (WebGL) content. */
export function useInView<T extends Element>(
  ref: React.RefObject<T | null>,
  options?: IntersectionObserverInit
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setInView(true);
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, inView, options]);

  return inView;
}

/**
 * Tilts an element up into place (perspective + rotateX + scale) as it scrolls into view —
 * the "card settles into the page" reveal used across the tile/card grids. Pass the same
 * `staggerIndex` a card would use in its own grid so a row cascades in together.
 */
export function useReveal3D(
  ref: React.RefObject<HTMLElement | null>,
  staggerIndex = 0,
  staggerSize = 3
): void {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el || reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
          y: 70,
          rotationX: -35,
          scale: 0.92,
          transformPerspective: 900,
          transformOrigin: "50% 100%",
        },
        {
          autoAlpha: 1,
          y: 0,
          rotationX: 0,
          scale: 1,
          duration: 1.1,
          ease: "expo.out",
          delay: (staggerIndex % staggerSize) * 0.08,
          scrollTrigger: { trigger: el, start: "top 90%" },
          // The reveal leaves an inline transform, which (being higher specificity than a
          // class) would permanently block any CSS hover transform on the same element.
          onComplete: () => gsap.set(el, { clearProps: "transform" }),
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [ref, staggerIndex, staggerSize, reduced]);
}
