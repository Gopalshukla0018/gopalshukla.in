import { Card, CardContent } from "@/components/ui/card";
import { Quote, Linkedin, ExternalLink, BadgeCheck } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Aakash Bhardwaj",
      role: "Founder & Engineering Lead",
      company: "Huguen",
      text: "To Whom It May Concern, I am writing to recommend Mr. Gopal Shukla, who worked under my supervision as a Frontend Development Intern. During the internship, he worked primarily with Next.js for building and optimizing frontend interfaces, and handled API integrations with a NestJS backend. Gopal developed responsive, efficient, and reusable UI components, and showed good understanding of state management, routing, and asynchronous data handling. He consistently wrote clean, well-structured code, met deadlines, and adapted quickly to feedback. Overall, Gopal demonstrated solid technical skills and reliability in completing assigned development tasks.",
      initials: "AB",
      date: "November 13, 2025",
      profileUrl: "https://www.linkedin.com/in/aakash-bhardwaj-engine/",
    },
    {
      name: "Raj Gupta",
      role: "Technical Lead - Cloud Security",
      company: "SecPod",
      text: "I can confidently say he's one of the most thoughtful and technically skilled people I've collaborated with. His ability to analyze complex problems, think critically, and come up with efficient coding solutions truly stands out. Gopal is also a great team player always open to feedback, quick to help others, and proactive in sharing knowledge.",
      initials: "RG",
      date: "October 7, 2025",
      profileUrl: "https://www.linkedin.com/in/raj-gupta-cloud/",
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-20 relative overflow-hidden dark:bg-black/20 bg-muted/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0077b5]/10 text-[#0077b5] text-sm font-medium border border-[#0077b5]/20 mb-4">
            <Linkedin size={14} />
            <span>Verified Recommendations</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What <span className="text-[#0077b5]">Engineering Leaders Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Endorsements from{" "}
            <span className="text-foreground font-medium">Engineering Leads</span>{" "}
            and <span className="text-foreground font-medium">Founders</span> I've
            collaborated with.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t, index) => (
            <Card
              key={index}
              className="glass-card border-0 hover:border-[#0077b5]/30 transition-all duration-300 relative group h-full flex flex-col"
            >
              <CardContent className="p-8 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full border-2 border-border overflow-hidden flex-shrink-0">
                      {t.image ? (
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-lg">
                          {t.initials}
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-foreground font-bold text-lg leading-none mb-1">
                        {t.name}
                      </h4>
                      <p className="text-xs dark:text-purple-400 text-purple-600 font-medium mb-0.5">
                        {t.role}
                      </p>
                      <p className="text-xs text-muted-foreground font-semibold">
                        {t.company}
                      </p>
                    </div>
                  </div>
                  <Linkedin className="text-[#0077b5]" size={28} />
                </div>

                <div className="relative mb-6 flex-grow">
                  <Quote
                    className="absolute -top-2 -left-2 dark:text-white/5 text-black/5 transform -scale-x-100"
                    size={40}
                  />
                  <p className="dark:text-gray-300 text-foreground/90 leading-relaxed text-sm relative z-10 pl-2">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-6 border-t border-border flex justify-between items-center mt-auto">
                  <span className="text-xs text-muted-foreground font-mono">
                    {t.date}
                  </span>

                  <a
                    href="https://www.linkedin.com/in/gopalshukla0018/details/recommendations/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#0077b5] hover:text-white transition-colors bg-[#0077b5]/10 hover:bg-[#0077b5] px-3 py-1.5 rounded-full"
                  >
                    <BadgeCheck size={14} />
                    Verified Recommendation
                    <ExternalLink size={12} className="ml-1" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
