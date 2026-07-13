import SectionHeading from "@/components/ui/SectionHeading";
import StatBadge from "@/components/ui/StatBadge";
import { about, company } from "@/lib/content";

export default function Intro() {
  return (
    <section id="about" className="bg-parchment px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow={about.eyebrow} heading={about.heading} />

        <div className="mt-20 grid gap-16 md:grid-cols-2 md:gap-24">
          <p className="font-serif-display text-2xl italic leading-relaxed text-charcoal md:text-3xl">
            &ldquo;{about.vision}&rdquo;
          </p>

          <div className="flex flex-col gap-6 text-base leading-relaxed text-charcoal-soft md:text-lg">
            <p>{about.mission}</p>
            <p>{about.story}</p>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-8 border-t border-stone pt-10 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-3">
            {about.values.map((value) => (
              <StatBadge key={value} label={value} />
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {company.certifications.map((cert) => (
              <StatBadge key={cert} label={cert} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
