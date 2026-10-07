import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import WhatICanBuild from '@/components/WhatICanBuild';
import Projects from '@/components/sections/Projects';
import ValueProposition from '@/components/ValueProposition';
import SocialProof from '@/components/sections/SocialProof';
import ContentSection from '@/components/ContentSection';
import BooksLearning from '@/components/BooksLearning';
import Testimonials from '@/components/Testimonials';
import Recommendations from '@/components/Recommendations';
import ExternalPublications from '@/components/ExternalPublications';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <Hero />
      <About />
      <Skills />
      <WhatICanBuild />
      <Projects />
      
      <ValueProposition />
      <SocialProof />
      <ContentSection />
      <BooksLearning />
      <Testimonials />
      <Recommendations />
      <ExternalPublications />
      
      <Contact />
    </div>
  );
}
