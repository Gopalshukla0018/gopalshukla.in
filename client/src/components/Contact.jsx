import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, PlayCircle, Briefcase } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative z-10 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl aspect-[2/1] bg-gradient-to-r from-purple-primary/20 via-blue-primary/10 to-emerald-500/20 rounded-full blur-[100px] pointer-events-none -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-card rounded-3xl p-8 md:p-16 border border-border/50 shadow-2xl relative overflow-hidden group">
          
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          <div className="animate-fade-in-up relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight leading-tight">
              Ready to <span className="gradient-text">Level Up?</span>
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Whether you need mentorship to kickstart your tech career, or a developer to build your next big idea, I'm here to help.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Button
                asChild
                className="bg-foreground text-background hover:bg-foreground/90 px-8 py-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl w-full sm:w-auto flex items-center justify-center gap-2 group/btn relative overflow-hidden"
              >
                <a href="mailto:hello@gopalshukla.in">
                  <span className="relative z-10 flex items-center">
                    Work With Me <ArrowRight size={20} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </a>
              </Button>
              
              <Button
                variant="outline"
                asChild
                className="glass-card px-8 py-6 rounded-xl font-bold text-lg hover:bg-secondary/80 transition-all duration-300 transform hover:-translate-y-1 border-border w-full sm:w-auto flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
              >
                <a href="https://youtube.com/@gopalshukla0018" target="_blank" rel="noopener noreferrer">
                  Follow My Content <PlayCircle size={20} className="ml-2 text-red-500" />
                </a>
              </Button>

            </div>

            <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground font-medium">
              <a href="mailto:hello@gopalshukla.in" className="flex items-center gap-2 hover:text-foreground transition-colors group/link">
                <div className="p-2 rounded-full bg-secondary group-hover/link:bg-purple-primary/10 transition-colors">
                  <Mail size={16} className="group-hover/link:text-purple-primary transition-colors" />
                </div>
                hello@gopalshukla.in
              </a>
              <span className="hidden sm:block text-border">•</span>
              <a href="https://linkedin.com/in/gopalshukla0018" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-foreground transition-colors group/link">
                <div className="p-2 rounded-full bg-secondary group-hover/link:bg-blue-primary/10 transition-colors">
                  <Briefcase size={16} className="group-hover/link:text-blue-primary transition-colors" />
                </div>
                Connect on LinkedIn
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
