import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap, Code } from "lucide-react";

export default function About() {
  const experiences = [
    {
      title: "Full Stack Developer (Team Lead)",
      company: "TravelGrowIndia",
      companyUrl: "https://travelgrowindia.com",
      period: "Nov 2025 - Present",
      description: "Developing automated systems for lead distribution and managing a high-concurrency platform.",
      tags: ["Node.js", "MongoDB", "VPS"],
    },
    {
      title: "Frontend Developer Intern",
      company: "Huguen",
      companyUrl: "https://www.huguen.com",
      period: "Internship",
      description: "Built a production hotel dashboard using Next.js & TypeScript.",
      tags: ["Next.js", "TypeScript", "Tailwind"],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Computer Applications",
      school: "Greater Noida Institute of Management",
      year: "2022 - 2025",
    },
    {
      degree: "Class XII ",
      school: "GIC Inter College, Farrukhabad",
      year: "2021",
    },
  ];

  return (
    <section id="about" className="py-20 relative bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Personal Story */}
          <div className="lg:col-span-7 space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-primary/10 text-purple-primary text-sm font-medium border border-purple-primary/20">
              <Code size={14} />
              <span>My Story</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
              Learning to code changed my life. <br />
              <span className="text-muted-foreground">Now I help others do the same.</span>
            </h2>

            <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed space-y-6">
              <p>
                My journey started from scratch. Like many BCA students, I was confused about where to begin, which technologies to learn, and how to actually build things that work in the real world.
              </p>
              <p>
                Through a lot of trial and error, I taught myself full-stack development. Now, as a <strong className="text-foreground font-semibold">Full Stack Developer</strong> leading a tech team, I build scalable systems that solve real business problems.
              </p>
              <p>
                But coding is only half the picture. I saw so many students making the same career mistakes I almost made. That's why I started my <a href="https://youtube.com/@gopalshukla0018" target="_blank" rel="noopener noreferrer" className="text-purple-primary hover:text-purple-400 underline decoration-purple-500/30 underline-offset-4 font-medium transition-colors">YouTube channel</a>.
              </p>
              <p>
                My mission is simple: share <strong className="text-foreground font-semibold">practical, no-BS career advice</strong> and real tech skills with college students, so they can skip the confusion and land their first tech job faster.
              </p>
            </div>
          </div>

          {/* Quick Timeline (Experience & Education) */}
          <div className="lg:col-span-5 space-y-10 lg:pl-10 lg:border-l lg:border-border animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-3 text-foreground mb-8">
                <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                  <Briefcase size={22} />
                </div>
                Experience
              </h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[0.35rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {experiences.map((exp, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-3 h-3 rounded-full border-2 border-blue-500 bg-background absolute left-0 md:left-1/2 -translate-x-1/2 shadow shrink-0 md:order-1 group-hover:scale-125 transition-transform" />
                    <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] ml-[1.5rem] md:ml-0 p-4 rounded-xl glass-card border border-border group-hover:border-blue-500/30 transition-colors">
                      <div className="flex flex-col mb-1">
                        <h4 className="font-bold text-foreground text-lg">{exp.title}</h4>
                        <span className="text-sm text-blue-500 font-medium">
                          {exp.companyUrl ? <a href={exp.companyUrl} target="_blank" rel="noreferrer" className="hover:underline">{exp.company}</a> : exp.company}
                        </span>
                      </div>
                      <time className="text-xs font-mono text-muted-foreground mb-2 block">{exp.period}</time>
                      <p className="text-sm text-muted-foreground">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold flex items-center gap-3 text-foreground mb-8">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                  <GraduationCap size={22} />
                </div>
                Education
              </h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[0.35rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {education.map((edu, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    <div className="flex items-center justify-center w-3 h-3 rounded-full border-2 border-emerald-500 bg-background absolute left-0 md:left-1/2 -translate-x-1/2 shadow shrink-0 md:order-1 group-hover:scale-125 transition-transform" />
                    <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] ml-[1.5rem] md:ml-0 p-4 rounded-xl glass-card border border-border group-hover:border-emerald-500/30 transition-colors">
                      <h4 className="font-bold text-foreground text-lg mb-1">{edu.degree}</h4>
                      <div className="text-sm text-emerald-500 font-medium mb-1">{edu.school}</div>
                      <time className="text-xs font-mono text-muted-foreground">{edu.year}</time>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
