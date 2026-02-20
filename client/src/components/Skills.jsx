import { Card, CardContent } from "@/components/ui/card";
import { Code, Server, Database, Cloud } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
  SiPostman,
  SiGooglecloud,
  SiPostgresql,
} from "react-icons/si";
import { Layers } from "lucide-react";

export default function Skills() {
  const skillCategories = [
  {
  title: "Frontend & UI",
  icon: Code,
  color: "from-purple-500 to-blue-500",
  skills: [
    { name: "React.js", icon: SiReact, color: "text-blue-400" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
    { name: "shadcn/ui", icon: null, color: "text-slate-300" },
  ]
}
,
    {
      title: "Backend Engineering",
      icon: Server,
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
        { name: "Express.js", icon: SiExpress, color: "text-gray-400" },
        { name: "REST APIs", icon: null, color: "text-orange-400" },
        { name: "JWT Auth", icon: null, color: "text-yellow-400" },
      ],
    },
    {
      title: "Database & Cloud",
      icon: Database,
      color: "from-blue-600 to-cyan-500",
      skills: [
        { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
        { name: "Mongoose", icon: null, color: "text-red-400" },
        {
          name: "VPS (CloudPanel)",
          icon: SiGooglecloud,
          color: "text-blue-400",
        },
        { name: "UptimeRobot", icon: null, color: "text-green-400" },
        { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-500" },
      ],
    },
    {
      title: "Tools & DevOps",
      icon: Cloud,
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "Git & GitHub", icon: null, color: "text-white" },
        { name: "Postman", icon: SiPostman, color: "text-orange-500" },
        { name: "Docker", icon: SiDocker, color: "text-blue-500" },
        { name: "Google APIs", icon: null, color: "text-yellow-500" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Tech Ecosystem
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My weapon of choice for building scalable B2B products
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <Card key={index} className="glass-card border-0 card-hover">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <category.icon className="text-2xl text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-white/5 px-3 py-1 rounded-full text-sm flex items-center gap-2 text-gray-300"
                    >
                      {skill.icon && <skill.icon className={skill.color} />}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
