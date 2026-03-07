import { Button } from "@/components/ui/button";
import { Github, Linkedin, Youtube, ChevronDown, ArrowRight } from "lucide-react";
import Gopal_Shukla_Picture from "@/assets/Gopal_Shukla_Picture.jpg";

export default function Hero() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative pt-24 pb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Main Content (Left) */}
          <div className="flex-1 space-y-8 animate-fade-in-up text-left order-2 md:order-1">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl md:text-2xl font-medium text-purple-primary tracking-wide">
                  Gopal Shukla
                </h2>
                <div className="inline-flex items-center rounded-full border border-purple-primary/30 bg-purple-primary/10 px-4 py-1.5 text-sm md:text-base font-medium text-purple-primary">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  Full Stack Developer (MERN) | Open to work
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground tracking-tight">
                Helping BCA Students <br className="hidden md:block" />
                Avoid <span className="gradient-text pb-2">Career Mistakes</span> <br className="hidden md:block" />
                and Build Real Tech Skills
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                I share practical advice on BCA, web development, and tech careers to help students avoid mistakes and build real skills.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6 rounded-xl font-medium text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl w-full sm:w-auto flex items-center justify-center gap-2"
              >
                Work With Me <ArrowRight size={20} />
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection("projects")}
                className="glass-card px-8 py-6 rounded-xl font-medium text-lg hover:bg-secondary/50 transition-all duration-300 transform hover:-translate-y-1 border-border w-full sm:w-auto"
              >
                View My Work
              </Button>
            </div>

            {/* Social Links & Trust */}
            <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 border-t border-border">
              <div className="flex space-x-5">
                <a
                  href="https://youtube.com/@gopalshukla0018"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-red-500 hover:bg-red-500/10 hover:scale-110 transition-all duration-300"
                >
                  <Youtube size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/gopalshukla0018"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-blue-500 hover:bg-blue-500/10 hover:scale-110 transition-all duration-300"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://github.com/Gopalshukla0018"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground hover:bg-secondary/80 hover:scale-110 transition-all duration-300"
                >
                  <Github size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Profile Picture (Right) */}
          <div className="flex-1 w-full max-w-md mx-auto relative order-1 md:order-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative aspect-square rounded-[2rem] overflow-hidden glass-card p-3 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-primary/20 to-blue-primary/20 z-0"></div>
              <img
                src={Gopal_Shukla_Picture}
                alt="Gopal Shukla - Full Stack Developer & Tech Mentor"
                className="w-full h-full object-cover rounded-[1.5rem] relative z-10"
              />
            </div>
            
            {/* Minimalist floating elements */}
            <div className="absolute -top-6 -right-6 glass-card p-4 rounded-2xl shadow-xl floating-element">
              <span className="font-bold text-lg">💻 Dev</span>
            </div>
            <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl shadow-xl floating-element" style={{ animationDelay: '1.5s' }}>
              <span className="font-bold text-lg">🎥 Creator</span>
            </div>
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:block hidden">
          <button
            onClick={() => scrollToSection("social-proof")}
            className="animate-bounce flex flex-col items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300"
          >
            <span className="text-xs font-medium tracking-widest uppercase mb-2">Scroll</span>
            <ChevronDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
