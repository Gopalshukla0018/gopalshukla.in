import { Card, CardContent } from "@/components/ui/card";
import {
  Briefcase,
  GraduationCap,
  Code,
  Youtube,
  Github,
  Zap,
} from "lucide-react";
import { useCounterAnimation } from "@/hooks/use-counter-animation.jsx";

export default function About() {
  const counters = [
    {
      target: 1700,
      label: "Subscribers",
      icon: Youtube,
      color: "text-red-500",
    },
    {
      target: 125000,
      label: "Total Views",
      icon: Youtube,
      color: "text-red-400",
    },
    {
      target: 80,
      label: "GitHub Streak",
      icon: Github,
      color: "text-purple-500",
    },
    { target: 99, label: "Uptime %", icon: Zap, color: "text-blue-500" },
  ];

  const experiences = [
    {
      title: "Full Stack Developer (Team Lead)",
      company: "TravelGrowIndia",
      companyUrl: "https://travelgrowindia.com",
      period: "Nov 2025 - Present",
      description:
        "Developed a system that automatically syncs leads from Google Sheets to agents, eliminating 100% of manual data entry. Managing the entire platform on a VPS to ensure 99.9% uptime and a fast experience for all users.",
      tags: ["Node.js", "MongoDB", "Google APIs", "VPS"],
    },
    {
      title: "Frontend Developer Intern",
      company: "Huguen",
      companyUrl: "https://www.huguen.com",
      period: "Internship",
      description:
        "Built production hotel dashboard using Next.js & TypeScript. Integrated NestJS APIs and optimized inventory management flow.",
      tags: ["Next.js", "TypeScript", "Tailwind", "NestJS"],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Computer Applications (BCA)",
      school: "Greater Noida Institute of Management",
      year: "2022 - 2025",
      desc: "Focused on DBMS, OOPS, and Software Engineering.",
    },
    {
      degree: "Intermediate (Class XII)",
      school: "GIC Inter College, Farrukhabad (UP Board)",
      year: "2021",
      desc: "Major in Science & Mathematics.",
    },
    {
      degree: "High School (Class X)",
      school: "GIC Inter College, Farrukhabad (UP Board)",
      year: "2019",
      desc: "Foundation in Science & Computer Basics.",
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-primary/10 text-purple-primary text-sm font-medium border border-purple-primary/20">
              <Code size={14} />
              <span>About Me</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Turning complex problems into{" "}
              <span className="gradient-text">simple code.</span>
            </h2>

            <div className="text-muted-foreground text-lg leading-relaxed space-y-4">
              <p>
                I'm a result-oriented{" "}
                <span className="text-foreground font-medium">
                  Full-Stack Engineer
                </span>{" "}
                experienced in architecting B2B SaaS solutions using the{" "}
                <span className="text-purple-400">MERN stack</span>. I
                specialize in backend automation that actually saves time.
              </p>
              <p>
                Currently leading tech at{" "}
                <span className="text-foreground font-medium">
                  {" "}
                  TravelGrowIndia
                </span>
                , building high-concurrency systems. Beyond code, I run an{" "}
                <span className="text-foreground font-medium">
                  educational YouTube channel
                </span>{" "}
                followed by{" "}
                <span className="text-foreground font-medium">
                  1.7K+ students
                </span>{" "}
                and enjoy helping others learn.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {counters.map((counter, index) => (
              <CounterCard key={index} {...counter} />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 pt-10 border-t border-border">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-accent-emerald">
                <Briefcase size={24} />
              </div>
              Work Experience
            </h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <Card
                  key={index}
                  className="glass-card border-0 card-hover group"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-bold text-foreground group-hover:text-purple-primary transition-colors">
                        {exp.title}
                      </h4>
                      <span className="text-xs font-mono bg-secondary px-2 py-1 rounded text-muted-foreground">
                        {exp.period}
                      </span>
                    </div>

                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg text-purple-400 font-medium mb-3 inline-flex items-center gap-2 hover:underline hover:text-purple-primary transition-colors"
                    >
                      {exp.company}
                    </a>

                    <div className="flex flex-wrap gap-2">
                      {exp.tags.map((t, i) => (
                        <span
                          key={i}
                          className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded border border-border group-hover:border-purple-500/30 transition-colors"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-primary">
                <GraduationCap size={24} />
              </div>
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <Card
                  key={index}
                  className="glass-card border-0 card-hover group"
                >
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-bold text-foreground group-hover:text-blue-primary transition-colors">
                        {edu.degree}
                      </h4>
                      <span className="text-xs font-mono bg-secondary px-2 py-1 rounded text-muted-foreground">
                        {edu.year}
                      </span>
                    </div>
                    <p className="text-foreground/80 mb-2">{edu.school}</p>
                    {/* <p className="text-sm text-gray-500">{edu.desc}</p> */}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CounterCard({ target, label, icon: Icon, color }) {
  const { count, elementRef } = useCounterAnimation(target);

  return (
    <Card ref={elementRef} className="glass-card border-0 card-hover group">
      <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
        <div
          className={`p-3 rounded-xl bg-secondary mb-3 group-hover:scale-110 transition-transform duration-300 ${color.replace("text-", "bg-").replace("500", "500/20").replace("400", "400/20")}`}
        >
          <Icon size={24} className={color} />
        </div>
        <div className="text-3xl font-bold text-foreground mb-1">
          {count}
          {label.includes("%") ? "" : "+"}
        </div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          {label}
        </p>
      </CardContent>
    </Card>
  );
}
