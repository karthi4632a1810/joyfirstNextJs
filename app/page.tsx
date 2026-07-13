import Hero from "@/components/sections/Hero";
import Intro from "@/components/sections/Intro";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Projects from "@/components/sections/Projects";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import Reach from "@/components/sections/Reach";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Intro />
      <Services />
      <Process />
      <Projects />
      <WhyChooseUs />
      <Testimonials />
      <Reach />
    </main>
  );
}
