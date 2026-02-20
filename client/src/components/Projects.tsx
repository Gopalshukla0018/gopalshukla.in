import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, BarChart3, Smartphone, Users } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "Swiggy Clone",
      description: "Fully responsive food delivery web app with live restaurant listings, dynamic menus, search functionality, and Redux-based cart system. Achieved 100% uptime with 212ms response time.",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      tags: ["React", "Redux", "Tailwind", "JSON Server"],
      liveUrl: "https://swiggy-opal-ten.vercel.app/",
      githubUrl: "https://github.com/Gopalshukla0018/Swiggy",
      stats: "100% Uptime • 212ms Response Time",
      icon: BarChart3,
      iconColor: "text-accent-emerald"
    },
    {
      title: "Portfolio Website",
      description: "Modern, responsive portfolio showcasing projects and skills with interactive animations, glassmorphism design, and optimized performance across all devices.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      tags: ["React", "Tailwind", "Framer Motion", "Vercel"],
      liveUrl: "#",
      githubUrl: "#",
      stats: "Fully Responsive • SEO Optimized",
      icon: Smartphone,
      iconColor: "text-purple-primary"
    },
    {
      title: "YouTube Channel",
      description: "Educational content helping BCA students with academic guidance and career development. Built an engaged community of 1.7K+ subscribers with 125K+ total views.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400",
      tags: ["Content Creation", "Education", "Career Guidance"],
      liveUrl: "https://youtube.com/@gopalshukla0018",
      githubUrl: null,
      stats: "1.7K+ Subscribers • 125K+ Views",
      icon: Users,
      iconColor: "text-red-400"
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Showcasing my journey through code - from concept to deployment
          </p>
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
        
        {/* More Projects Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="glass-card border-0 px-8 py-4 rounded-full font-semibold hover:bg-white hover:bg-opacity-10 transition-all duration-300 transform hover:scale-105"
            asChild
          >
            <a href="https://github.com/Gopalshukla0018" className="inline-flex items-center">
              <Github className="mr-3" size={20} />
              View More Projects
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  title,
  description,
  image,
  tags,
  liveUrl,
  githubUrl,
  stats,
  icon: Icon,
  iconColor
}: {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string | null;
  stats: string;
  icon: any;
  iconColor: string;
}) {
  return (
    <Card className="glass-card border-0 overflow-hidden project-card">
      <div className="relative">
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-purple-primary">{title}</h3>
          <div className="flex space-x-3">
            <Button variant="ghost" size="icon" asChild>
              <a href={liveUrl} className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                <ExternalLink size={16} />
              </a>
            </Button>
            {githubUrl && (
              <Button variant="ghost" size="icon" asChild>
                <a href={githubUrl} className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                  <Github size={16} />
                </a>
              </Button>
            )}
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-purple-primary bg-opacity-20 text-purple-primary px-3 py-1 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Icon className={`mr-2 ${iconColor}`} size={16} />
          {stats}
        </div>
      </CardContent>
    </Card>
  );
}
