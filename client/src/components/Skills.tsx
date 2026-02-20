import { Card, CardContent } from "@/components/ui/card";
import { Code, Palette, Database, Wrench } from "lucide-react";
import { SiReact, SiJavascript, SiHtml5, SiCss3, SiTailwindcss, SiGit, SiFirebase } from "react-icons/si";

export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      icon: Code,
      color: "from-purple-primary to-blue-primary",
      skills: [
        { name: "React.js", icon: SiReact, color: "text-blue-primary" },
        { name: "JavaScript", icon: SiJavascript, color: "text-accent-amber" },
        { name: "HTML5", icon: SiHtml5, color: "text-orange-500" },
        { name: "CSS3", icon: SiCss3, color: "text-blue-400" },
      ]
    },
    {
      title: "Styling",
      icon: Palette,
      color: "from-blue-primary to-accent-emerald",
      skills: [
        { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
        { name: "Responsive Design", icon: null, color: "text-pink-400" },
        { name: "Mobile-First", icon: null, color: "text-purple-400" },
        { name: "UI/UX Design", icon: null, color: "text-green-400" },
      ]
    },
    {
      title: "State Management",
      icon: Database,
      color: "from-accent-emerald to-accent-amber",
      skills: [
        { name: "Redux", icon: null, color: "text-purple-400" },
        { name: "Context API", icon: null, color: "text-blue-400" },
        { name: "React Router", icon: null, color: "text-green-400" },
        { name: "REST APIs", icon: null, color: "text-orange-400" },
      ]
    },
    {
      title: "Tools & Deployment",
      icon: Wrench,
      color: "from-accent-amber to-purple-primary",
      skills: [
        { name: "Git & GitHub", icon: SiGit, color: "text-orange-500" },
        { name: "Netlify/Vercel", icon: null, color: "text-blue-400" },
        { name: "Firebase", icon: SiFirebase, color: "text-orange-400" },
        { name: "UptimeRobot", icon: null, color: "text-green-400" },
      ]
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Skills & Technologies</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Tools and technologies I use to bring ideas to life
          </p>
        </div>
        
        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <SkillCategory key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCategory({ title, icon: Icon, color, skills }: {
  title: string;
  icon: any;
  color: string;
  skills: Array<{ name: string; icon: any; color: string }>;
}) {
  return (
    <Card className="glass-card border-0 card-hover">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <Icon className="text-2xl text-white" size={24} />
          </div>
          <h3 className="text-xl font-bold text-purple-primary">{title}</h3>
        </div>
        <div className="space-y-3">
          {skills.map((skill, index) => (
            <SkillBadge key={index} {...skill} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function SkillBadge({ name, icon: Icon, color }: {
  name: string;
  icon: any;
  color: string;
}) {
  return (
    <div className="skill-badge glass-card px-4 py-2 rounded-full text-center border-0">
      <span className="flex items-center justify-center">
        {Icon && <Icon className={`${color} mr-2`} />}
        {name}
      </span>
    </div>
  );
}
