import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Newspaper } from "lucide-react";

export default function ExternalPublications() {
  return (
    <section id="publications" className="py-20 relative bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-sm font-medium border border-purple-500/20 mb-4">
            <Newspaper size={14} />
            <span>Featured Writing</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            As Featured <span className="gradient-text">On</span>
          </h2>
        </div>

        <a
          href="https://unstop.com/blog/is-bca-degree-enough-to-get-a-good-job-reality-check"
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <Card className="glass-card border-0 hover:border-purple-primary/40 transition-all duration-300 overflow-hidden group-hover:-translate-y-2 group-hover:shadow-2xl shadow-xl">
            <div className="grid md:grid-cols-5 h-full">
              {/* Image/Brand section */}
              <div className="md:col-span-2 bg-gradient-to-br from-indigo-600 to-purple-800 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden h-48 md:h-auto">
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 text-white dark:text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm shadow-sm flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div> Active
                  </span>
                </div>

                {/* Unstop stylized logo/text */}
                <img 
                  src="https://d8it4huxumps7.cloudfront.net/uploads/images/unstop/svg/unstop-logo.svg" 
                  alt="Unstop Logo" 
                  className="h-12 md:h-16 w-auto z-10 group-hover:scale-110 transition-transform duration-500 brightness-0 invert" 
                />
                
                {/* Decorative circles */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
              </div>

              {/* Content section */}
              <div className="md:col-span-3 p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-purple-primary uppercase tracking-wider">Tech Career Advice</span>
                  </div>
                  <h4 className="text-2xl font-bold text-foreground mb-3 leading-snug group-hover:text-purple-primary transition-colors">
                    Is A BCA Degree Enough To Get A Good Job In 2026? The Hard Truth
                  </h4>
                  <p className="text-muted-foreground mb-6 line-clamp-2 md:line-clamp-3">
                    A reality check on the current tech landscape. Discover what companies are actually looking for beyond your BCA degree and how to build the skills that get you hired.
                  </p>
                </div>

                <div className="mt-auto flex items-center font-semibold text-purple-primary group-hover:text-purple-600 transition-colors">
                  Read Full Article <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </div>
          </Card>
        </a>
      </div>
    </section>
  );
}
