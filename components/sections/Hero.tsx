"use client";

import dynamic from "next/dynamic";
import RevealText from "@/components/ui/RevealText";
import MagneticButton from "@/components/ui/MagneticButton";
import { hero } from "@/lib/content";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink text-ink-foreground"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(156,122,78,0.22),transparent_60%)]"
      />

      <div className="absolute inset-0">
        <HeroScene />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-b from-ink via-transparent to-ink/40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-full bg-gradient-to-r from-ink via-ink/75 to-transparent md:w-3/5"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40 md:px-10 md:pb-28">
        <span className="text-xs uppercase tracking-[0.3em] text-bronze-light">
          {hero.eyebrow}
        </span>

        <RevealText
          as="h1"
          className="font-serif-display mt-6 max-w-4xl text-5xl leading-[1.05] md:text-7xl lg:text-[5.5rem]"
        >
          {hero.headline}
        </RevealText>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-foreground/75 md:text-lg">
          {hero.subcopy}
        </p>

        <div className="mt-12 flex flex-wrap gap-4">
          <MagneticButton href={hero.primaryCta.href} variant="solid" className="bg-bronze text-ink hover:bg-bronze-light">
            {hero.primaryCta.label}
          </MagneticButton>
          <MagneticButton href={hero.secondaryCta.href} variant="ghost">
            {hero.secondaryCta.label}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
