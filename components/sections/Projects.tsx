"use client";

import { useRef } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import PlaceholderFrame from "@/components/ui/PlaceholderFrame";
import { useReveal3D } from "@/lib/hooks";
import { projects, type Project } from "@/lib/content";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  useReveal3D(ref, index);

  return (
    <article ref={ref} className="group flex flex-col gap-6">
      <PlaceholderFrame
        label={project.client}
        aspect="aspect-[4/5]"
        tone={project.status === "Coming Soon" ? "ink" : "bronze"}
        className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1"
      />
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-serif-display text-xl text-charcoal">{project.client}</h3>
          <span className="text-[10px] uppercase tracking-[0.2em] text-bronze-deep">
            {project.status}
          </span>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-charcoal-soft">{project.note}</p>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="bg-parchment px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Projects"
          heading="Work in progress, and work on the way."
          description="Joy First Interiors is actively building out its published case-study archive. Here's what's live today."
        />

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
