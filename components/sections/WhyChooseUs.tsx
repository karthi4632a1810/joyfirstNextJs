import SectionHeading from "@/components/ui/SectionHeading";
import { whyChooseUs } from "@/lib/content";

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-parchment-dim px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Why Choose Us" heading="Four reasons clients come back." />

        <div className="mt-20 divide-y divide-stone border-y border-stone">
          {whyChooseUs.map((item, index) => (
            <div
              key={item.title}
              className="grid gap-4 py-10 transition-colors duration-300 md:grid-cols-[80px_1fr_1.2fr] md:items-center md:gap-10"
            >
              <span className="font-serif-display text-2xl text-bronze-deep">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif-display text-3xl text-charcoal md:text-4xl">{item.title}</h3>
              <p className="text-base leading-relaxed text-charcoal-soft md:text-lg">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
