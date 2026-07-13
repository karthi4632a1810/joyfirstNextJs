"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import type { Service } from "@/lib/content";
import { useInView, usePrefersReducedMotion, useReveal3D } from "@/lib/hooks";

const MaterialSwatch = dynamic(() => import("@/components/three/MaterialSwatch"), {
  ssr: false,
  loading: () => null,
});

const IN_VIEW_OPTIONS: IntersectionObserverInit = { rootMargin: "150px" };

const materialTreatments: Record<Service["material"], string> = {
  glass: "bg-gradient-to-br from-white/40 via-white/10 to-transparent",
  steel: "bg-[repeating-linear-gradient(115deg,#cfc9ba_0px,#cfc9ba_2px,#b7b0a0_2px,#b7b0a0_4px)]",
  airflow: "bg-[linear-gradient(90deg,#e4ddcb,#c9c0aa,#e4ddcb)] bg-[length:200%_100%] animate-flow",
  conduit:
    "bg-[linear-gradient(180deg,transparent_48%,rgba(156,122,78,0.5)_50%,transparent_52%)] bg-[length:100%_18px]",
  beacon: "bg-gradient-to-br from-bronze/30 to-transparent",
  lattice:
    "bg-[linear-gradient(0deg,transparent_24%,rgba(74,64,51,0.15)_25%,rgba(74,64,51,0.15)_26%,transparent_27%,transparent_74%,rgba(74,64,51,0.15)_75%,rgba(74,64,51,0.15)_76%,transparent_77%),linear-gradient(90deg,transparent_24%,rgba(74,64,51,0.15)_25%,rgba(74,64,51,0.15)_26%,transparent_27%,transparent_74%,rgba(74,64,51,0.15)_75%,rgba(74,64,51,0.15)_76%,transparent_77%)] bg-[length:24px_24px]",
  blueprint:
    "bg-ink bg-[linear-gradient(rgba(199,160,107,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(199,160,107,0.18)_1px,transparent_1px)] bg-[length:16px_16px]",
};

export default function MaterialTile({ service, index }: { service: Service; index: number }) {
  const isBlueprint = service.material === "blueprint";
  const tileRef = useRef<HTMLDivElement>(null);
  const inView = useInView(tileRef, IN_VIEW_OPTIONS);
  const reduced = usePrefersReducedMotion();
  const showSwatch = inView && !reduced;
  useReveal3D(tileRef, index);

  return (
    <div
      ref={tileRef}
      data-cursor-hover
      className={`group relative flex min-h-[280px] flex-col justify-between overflow-hidden rounded-[2px] border p-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 ${
        isBlueprint ? "border-bronze/20" : "border-charcoal/10"
      }`}
    >
      <div
        aria-hidden
        className={`absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100 ${materialTreatments[service.material]}`}
      />

      {showSwatch && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-[62%] opacity-90 [mask-image:linear-gradient(to_bottom,black_65%,transparent_100%)]"
        >
          <MaterialSwatch material={service.material} />
        </div>
      )}

      {service.material === "beacon" && (
        <span aria-hidden className="absolute right-8 top-8 h-3 w-3 animate-beacon rounded-full bg-bronze" />
      )}

      {service.material === "glass" && (
        <span
          aria-hidden
          className="absolute inset-y-0 -left-1/2 w-1/4 skew-x-[-12deg] bg-white/50 opacity-0 transition-opacity duration-300 group-hover:animate-sweep group-hover:opacity-100"
        />
      )}

      <span
        className={`relative text-xs uppercase tracking-[0.2em] ${
          isBlueprint ? "text-bronze-light" : "text-bronze-deep"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative">
        <h3 className={`font-serif-display text-2xl ${isBlueprint ? "text-ink-foreground" : "text-charcoal"}`}>
          {service.name}
        </h3>
        <p
          className={`mt-3 text-sm leading-relaxed ${
            isBlueprint ? "text-ink-foreground/70" : "text-charcoal-soft"
          }`}
        >
          {service.description}
        </p>
      </div>
    </div>
  );
}
