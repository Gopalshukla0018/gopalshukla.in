import { Button } from "@/components/ui/button";
import { Github, Linkedin, Youtube, ChevronDown } from "lucide-react";
import { SiReact, SiJavascript } from "react-icons/si";
import Gopal_Shukla_Picture from "@/assets/Gopal_Shukla_Picture.jpg";

const profileImage = Gopal_Shukla_Picture;

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
      className="min-h-screen flex items-center justify-center relative pt-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Profile Picture */}
          <div className="mb-8 relative">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden floating-element glass-card p-2">
              <img
                src={profileImage}
                alt="Gopal Shukla - Full Stack Developer"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Floating tech icons */}
            <div
              className="absolute -top-4 -right-8 glass-card rounded-lg p-3 floating-element"
              style={{ animationDelay: "1s" }}
            >
              <SiReact className="text-2xl text-blue-primary" />
            </div>
            <div
              className="absolute -bottom-4 -left-8 glass-card rounded-lg p-3 floating-element"
              style={{ animationDelay: "2s" }}
            >
              <SiJavascript className="text-2xl text-accent-amber" />
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold">
              <span className="gradient-text">Gopal Shukla</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Full Stack Developer building scalable, user-centric web
              applications with{" "}
              <span className="text-purple-primary font-semibold">
                MERN Stack
              </span>{" "}
              and modern technologies
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-purple-primary to-blue-primary hover:from-purple-600 hover:to-blue-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View My Work
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="glass-card px-8 py-4 rounded-full font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-300 transform hover:scale-105 border-glass-border"
              >
                Let's Connect
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mt-8">
              <a
                href="https://github.com/Gopalshukla0018"
                className="text-2xl hover:text-purple-primary transition-colors duration-300 transform hover:scale-110"
              >
                <Github />
              </a>
              <a
                href="https://linkedin.com/in/gopalshukla0018"
                className="text-2xl hover:text-blue-primary transition-colors duration-300 transform hover:scale-110"
              >
                <Linkedin />
              </a>
              <a
                href="https://youtube.com/@gopalshukla0018"
                className="text-2xl hover:text-red-500 transition-colors duration-300 transform hover:scale-110"
              >
                <Youtube />
              </a>
            </div>

            {/* YouTube Stats */}
            <div className="mt-8">
              <p className="text-muted-foreground text-lg">
                YouTube Channel:{" "}
                <span className="font-semibold text-red-500">125K+ Views</span>
              </p>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => scrollToSection("about")}
              className="animate-bounce text-muted-foreground hover:text-purple-primary transition-colors duration-300"
            >
              <ChevronDown size={32} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
