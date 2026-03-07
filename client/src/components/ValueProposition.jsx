import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, MonitorPlay, Code2, ArrowRight } from "lucide-react";

export default function ValueProposition() {
  const values = [
    {
      title: "Mentorship",
      description: "Helping college students avoid career mistakes and build real tech skills and career planning.",
      icon: Lightbulb,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
      linkText: "Book a call",
      link: "#contact"
    },
    {
      title: "Content Creation",
      description: "Sharing practical advice about BCA, coding, and tech careers on YouTube.",
      icon: MonitorPlay,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      linkText: "Watch videos",
      link: "https://youtube.com/@gopalshukla0018"
    },
    {
      title: "Development",
      description: "Building real-world web applications using modern technologies like the MERN stack.",
      icon: Code2,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      linkText: "View projects",
      link: "#projects"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            How I Can <span className="gradient-text">Help You</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you are a student looking for guidance or a business needing a robust web application.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <Card key={i} className="glass-card border-0 hover:-translate-y-2 transition-transform duration-300 group shadow-xl hover:shadow-2xl">
              <CardContent className="p-8">
                <div className={`w-14 h-14 rounded-2xl ${v.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <v.icon className={`w-7 h-7 ${v.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">{v.title}</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed min-h-[80px]">
                  {v.description}
                </p>
                <a 
                  href={v.link} 
                  target={v.link.startsWith("http") ? "_blank" : "_self"}
                  rel={v.link.startsWith("http") ? "noopener noreferrer" : ""}
                  className={`inline-flex items-center text-sm font-semibold ${v.color} hover:opacity-80 transition-opacity uppercase tracking-wider`}
                >
                  {v.linkText} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
