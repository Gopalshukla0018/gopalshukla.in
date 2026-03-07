import Hero from "@/components/Hero.jsx";
import SocialProof from "@/components/SocialProof.jsx";
import About from "@/components/About.jsx";
import Skills from "@/components/Skills.jsx";
import ValueProposition from "@/components/ValueProposition.jsx";
import Projects from "@/components/Projects.jsx";
import ContentSection from "@/components/ContentSection.jsx";
import BooksLearning from "@/components/BooksLearning.jsx";
import Testimonials from "@/components/Testimonials.jsx";
import Recommendations from "@/components/Recommendations.jsx";
import ExternalPublications from "@/components/ExternalPublications.jsx";
import Contact from "@/components/Contact.jsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <Hero />
      <SocialProof />
      <About />
      <Skills />
      <ValueProposition />
      <Projects />
      <ContentSection />
      <BooksLearning />
      <Testimonials />
      <Recommendations />
      <ExternalPublications />
      <Contact />
    </div>
  );
}
