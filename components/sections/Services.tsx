import SectionHeading from "@/components/ui/SectionHeading";
import MaterialTile from "@/components/ui/MaterialTile";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="bg-parchment-dim px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Services"
          heading="Seven trades, one accountable team."
          description="Every service below is delivered under a single point of contact — so nothing gets lost between the fit-out crew and the electrician."
        />

        <div className="mt-20 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <MaterialTile key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
