import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Youtube, Download, Layers, Sparkles } from "lucide-react";

export default function Resources() {
  const templates = [
    {
      title: "Ultimate Developer Portfolio",
      description:
        "A high-performance, dark-themed portfolio template built with React, Tailwind CSS, and Framer Motion. Perfect for Full Stack Developers.",
      tags: ["React", "Tailwind", "Lucide Icons"],
      repoLink: "https://github.com/Gopalshukla0018/portfolio-v1",
      videoLink: "https://youtube.com/...",
      isNew: true,
    },
    {
      title: "SaaS Landing Page Kit",
      description:
        "Modern landing page structure with Hero, Features, Pricing, and Testimonials sections. Ready to deploy for your next startup idea.",
      tags: ["Next.js", "Shadcn UI", "TypeScript"],
      repoLink: "https://github.com/Gopalshukla0018",
      videoLink: "#",
      isNew: false,
    },
  ];

  return (
    <section id="resources" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-primary/10 text-purple-primary text-sm font-medium border border-purple-primary/20 mb-4">
            <Sparkles size={14} />
            <span>For the Community</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Free <span className="gradient-text">Templates & Resources</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Grab the source code of my projects and start building your own.
            Open source and free for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {templates.map((item, index) => (
            <Card
              key={index}
              className="glass-card border-0 hover:border-purple-500/30 transition-all duration-300 group"
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    {item.isNew && (
                      <span className="inline-block px-2 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-[10px] font-bold rounded-full mb-2 shadow-lg shadow-orange-500/20">
                        NEW DROP
                      </span>
                    )}
                    <CardTitle className="text-2xl font-bold text-white group-hover:text-purple-primary transition-colors">
                      {item.title}
                    </CardTitle>
                  </div>
                  <Layers className="text-gray-500 group-hover:text-purple-primary transition-colors" />
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-gray-400 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-gray-300 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-4 border-t border-white/5">
                  <Button
                    asChild
                    className="flex-1 bg-white hover:bg-gray-200 text-black font-semibold"
                  >
                    <a
                      href={item.repoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" /> Get Code
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 border-white/10 text-white hover:bg-white/10"
                  >
                    <a
                      href={item.videoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Youtube className="mr-2 h-4 w-4 text-red-500" /> Watch
                      Tutorial
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Want more templates?{" "}
            <a
              href="https://youtube.com/@gopalshukla0018"
              className="text-purple-primary hover:underline"
            >
              Subscribe to my YouTube channel
            </a>{" "}
            to get notified.
          </p>
        </div>
      </div>
    </section>
  );
}
