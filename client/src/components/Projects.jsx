import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Github,
  Layers,
  FileText,
  ShoppingCart,
  Users,
} from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "TravelGrowIndia Marketplace",
      description:
        "A production-grade B2B marketplace built to automate lead distribution and agent workflows.",
      features: [
        "Automated & Manual Lead Assignment Engine",
        "Agent Wallet & Purchase History with PDF Invoicing",
        "Role-Based Access Control (RBAC) for Admins",
        "Real-time Lead Inventory Management",
      ],
      tags: ["MERN Stack", "Cashfree", "REST API", "Google Sheets Automation"],
      liveLink: "https://agent.travelgrowindia.com/",
      repoLink: null,
      color: "border-purple-500/50",
    },
    {
      title: "SkillsMittra EdTech Platform",
      description:
        "Scalable e-learning marketplace with automated student enrollment and instructor-led course management.",
      features: [
        "User-friendly Course Dashboard",
        "Secure Student Authentication",
        "Content Management System",
        "Payment Integration with Cashfree",
        "Responsive UI Design",
      ],
      tags: [
        "React.js",
        "Node.js",
        "Tailwind CSS",
        "MongoDB",
        "Cashfree",
        "Redux",
      ],
      liveLink: "https://skillsmittra.gopalshukla.in/",
      repoLink: "https://github.com/Gopalshukla0018/lms",
      color: "border-blue-500/50",
    },
    {
      title: "Huguen Hotel Dashboard",
      description:
        "Production-level inventory management dashboard for hotel operations with real-time data sync.",
      features: [
        "Real-time Inventory Updates",
        "Complex Data Visualization",
        "NestJS API Integration",
        "TypeScript Type Safety",
      ],
      tags: ["Next.js", "TypeScript", "NestJS", "Recharts", "Axios"],
      liveLink: "https://www.huguen.com/",
      repoLink: null,
      color: "border-emerald-500/50",
    },
  ];

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-primary/10 text-blue-primary text-sm font-medium border border-blue-primary/20 mb-4">
            <Layers size={14} />
            <span>Real World Work</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From B2B SaaS architectures to interactive dashboards.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`glass-card ${project.color} border-t-4 hover:border-t-4 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col`}
            >
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground mb-2">
                  {project.title}
                </CardTitle>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs font-mono bg-secondary text-secondary-foreground px-2 py-1 rounded border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-8 space-y-2 flex-1">
                  {project.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start text-sm text-muted-foreground"
                    >
                      <span className="mr-2 text-purple-400 mt-1">▹</span>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-auto pt-6 border-t border-border">
                  {project.liveLink && (
                    <Button
                      asChild
                      className="flex-1 bg-secondary hover:bg-purple-600 hover:text-white border border-border text-foreground transition-all"
                    >
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} className="mr-2" /> Live Demo
                      </a>
                    </Button>
                  )}
                  {project.repoLink && (
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 border-border text-foreground hover:bg-secondary hover:text-foreground"
                    >
                      <a
                        href={project.repoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github size={16} className="mr-2" /> Code
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
