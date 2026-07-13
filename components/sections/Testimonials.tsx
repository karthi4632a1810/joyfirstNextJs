import SectionHeading from "@/components/ui/SectionHeading";
import Marquee from "@/components/ui/Marquee";
import { testimonials } from "@/lib/content";

export default function Testimonials() {
  return (
    <section className="bg-parchment py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Clients" heading="What it's like to work with us." />
      </div>

      <div className="mt-20">
        <Marquee>
          {testimonials.map((t) => (
            <blockquote
              key={t.name}
              className="flex w-[22rem] shrink-0 flex-col justify-between rounded-[2px] border border-charcoal/10 bg-parchment-dim p-8 md:w-[26rem]"
            >
              <p className="font-serif-display text-xl italic leading-relaxed text-charcoal">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="mt-8 text-sm text-charcoal-soft">
                <span className="font-medium text-charcoal">{t.name}</span>
                <span className="block text-xs uppercase tracking-[0.14em] text-bronze-deep">
                  {t.affiliation}
                </span>
              </footer>
            </blockquote>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
