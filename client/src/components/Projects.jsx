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
import imgLuxuryMilestone from "@/assets/projects/luxryMilestone.png";
import imgTG from "@/assets/projects/TG.png";
import imgGopalShukla from "@/assets/projects/gopalshukla.in.png";
import imgSkillsMittra from "@/assets/projects/skillsmittra.png";

export default function Projects() {
  const projects = [
    {
      title: "Luxury Milestone Tour & Travels",
      description: "A high-conversion travel agency platform offering custom Kashmir and Ladakh tour packages.",
      features: [
        "Designed a performance-optimized, SEO-friendly architecture",
        "Created an intuitive and dynamic tour package browsing system",
        "Built responsive UI with Vite and Tailwind CSS to maximize conversions"
      ],
      tags: ["React.js", "Tailwind CSS", "Vite", "SEO"],
      liveLink: "https://luxurymilestonetourandtravel.com/",
      repoLink: null,
      image: imgLuxuryMilestone,
      color: "border-amber-500/50",
    },
    {
      title: "TravelGrowIndia Marketplace",
      description: "A live B2B SaaS platform used by 100+ active travel agents daily.",
      features: [
        "Built 3 role-based dashboards (Agent, Admin, SuperAdmin) across 15+ screens",
        "Engineered 8+ RESTful APIs, cutting response time by ~40% via MongoDB indexing",
        "Integrated Cashfree webhooks with HMAC-SHA256 verification",
        "Automated lead ingestion via Google Sheets API, deduplicating 1,000+ leads"
      ],
      tags: ["React", "Express.js", "MongoDB", "Cashfree", "VPS"],
      liveLink: "https://agent.travelgrowindia.com/",
      repoLink: null,
      image: imgTG,
      color: "border-purple-500/50",
    },
    {
      title: "gopalshukla.in (Custom CMS)",
      description: "Full-stack portfolio with a custom Admin CMS and automated lead routing.",
      features: [
        "Secured CMS with OTP-based JWT login via Nodemailer",
        "Built Blog CRUD with slug generation and cover image handling",
        "Created Audience Manager for subscriber list and broadcast emails",
        "Automated resource downloads and chat transcript saving to MongoDB"
      ],
      tags: ["React", "Node.js", "MongoDB", "JWT", "Nodemailer"],
      liveLink: "https://gopalshukla.in/",
      repoLink: "https://github.com/Gopalshukla0018",
      image: imgGopalShukla,
      color: "border-emerald-500/50",
    },
    {
      title: "SkillsMittra EdTech LMS",
      description: "Scalable e-learning marketplace with automated student enrollment.",
      features: [
        "Multi-role platform for Instructors, Students, and Admins",
        "Integrated Google OAuth 2.0 and JWT standard auth",
        "Implemented Redux RTK Query caching to reduce redundant API calls",
        "Achieved 93% Accessibility and 83% SEO scores in Lighthouse"
      ],
      tags: ["React", "Node.js", "MongoDB", "RTK Query", "OAuth"],
      liveLink: "https://skillsmittra.gopalshukla.in/",
      repoLink: "https://github.com/Gopalshukla0018/lms",
      image: imgSkillsMittra,
      color: "border-blue-500/50",
    },
    {
      title: "Build Your Next SaaS",
      description: "Looking for a reliable MERN stack developer to build your next big idea? Let's collaborate.",
      features: [
        "End-to-end full stack development",
        "Scalable architecture and secure APIs",
        "Modern, high-conversion UI/UX",
        "Seamless deployment and maintenance"
      ],
      tags: ["Available", "Freelance", "Full-Time", "Contract"],
      liveLink: "#contact",
      liveLinkText: "Let's Talk!",
      repoLink: null,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600",
      color: "border-rose-500/50",
    },
  ];

  return (
    <section id="projects" className="py-20 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-primary/10 text-blue-primary text-sm font-medium border border-blue-primary/20 mb-4">
            <Layers size={14} />
            <span>Recent Work</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Recent <span className="gradient-text">Work</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of my best work, focusing on scalable architectures, real-time data sync, and solving concrete business problems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className={`glass-card ${project.color} border-t-4 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col shadow-lg hover:shadow-2xl`}
            >
              <CardHeader className="p-0">
                <div className="w-full h-48 overflow-hidden rounded-t-xl bg-secondary/50 relative group/img">
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                    {project.liveLink && (
                      <a href={project.liveLink} target={project.liveLink.startsWith("#") ? "_self" : "_blank"} rel="noopener noreferrer" className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white flex items-center gap-2 hover:bg-white/20 transition-all font-medium">
                        <ExternalLink size={16} /> {project.liveLinkText || "View Live"}
                      </a>
                    )}
                  </div>
                </div>
                <div className="p-6 pb-2">
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
                      className="flex-1 bg-secondary hover:bg-purple-600 hover:text-white dark:hover:text-white border border-border text-foreground transition-all"
                    >
                      <a
                        href={project.liveLink}
                        target={project.liveLink.startsWith("#") ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                      >
                        <ExternalLink size={16} className="mr-2" /> {project.liveLinkText || "Live Demo"}
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
