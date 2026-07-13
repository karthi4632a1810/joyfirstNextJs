"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGsap } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { process } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    registerGsap();
    if (reduced || !sectionRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const distance = track.scrollWidth - window.innerWidth;
      if (distance <= 0) return;

      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="process" ref={sectionRef} className="relative bg-ink text-ink-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-28 md:px-10">
        <SectionHeading
          eyebrow="How We Deliver"
          heading="From drawing to handover, in four disciplined stages."
          tone="dark"
        />
      </div>

      <div
        ref={trackRef}
        className={`mt-16 flex w-max gap-6 px-6 pb-28 md:gap-10 md:px-10 ${
          reduced ? "overflow-x-auto" : "overflow-x-hidden"
        }`}
      >
        {process.map((phase) => (
          <article
            key={phase.id}
            className="flex h-[52vh] w-[85vw] shrink-0 flex-col justify-between rounded-[2px] border border-ink-foreground/10 bg-ink-soft p-8 md:w-[38vw] md:p-12 lg:w-[30vw]"
          >
            <span className="font-serif-display text-7xl text-bronze/40 md:text-8xl">
              {phase.index}
            </span>
            <div>
              <h3 className="font-serif-display text-3xl">{phase.name}</h3>
              <p className="mt-4 text-ink-foreground/70">{phase.summary}</p>
              <ul className="mt-6 space-y-2 border-t border-ink-foreground/10 pt-6 text-sm text-ink-foreground/60">
                {phase.responsibilities.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-bronze" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
