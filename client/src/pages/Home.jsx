import Hero from "@/components/Hero.jsx";
import About from "@/components/About.jsx";
import Skills from "@/components/Skills.jsx";
import Projects from "@/components/Projects.jsx";

import FloatingElements from "@/components/FloatingElements.jsx";
import Testimonials from "../components/Testimonials";
// import Resources from "../components/Resources";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-navy text-foreground relative overflow-x-hidden">
      <FloatingElements />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Testimonials />
      <Contact />
    </div>
  );
}
