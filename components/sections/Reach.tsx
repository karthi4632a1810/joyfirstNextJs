import SectionHeading from "@/components/ui/SectionHeading";
import { company } from "@/lib/content";

export default function Reach() {
  return (
    <section className="relative overflow-hidden bg-parchment-dim px-6 py-28 md:px-10 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 bg-[linear-gradient(rgba(122,92,55,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(122,92,55,0.08)_1px,transparent_1px)] bg-[length:32px_32px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Where We Work"
          heading="Active across seven states."
          description="From our Chennai base, our project teams travel to wherever the work is."
        />

        <ol className="mt-20 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {company.reach.map((state, index) => (
            <li
              key={state}
              className="group flex items-baseline gap-4 border-b border-stone pb-4"
            >
              <span className="font-serif-display text-sm text-bronze-deep">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="font-serif-display text-xl text-charcoal transition-colors duration-300 group-hover:text-bronze-deep md:text-2xl">
                {state}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
