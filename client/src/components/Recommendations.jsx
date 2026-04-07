import { Quote, Linkedin, CheckCircle2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export default function Recommendations() {
  const recommendations = [
    {
      name: "Raj Gupta",
      role: "Technical Lead - Cloud Security",
      company: "SecPod",
      quote: "I can confidently say he's one of the most thoughtful and technically skilled people I've collaborated with. His ability to analyze complex problems, think critically, and come up with efficient coding solutions truly stands out. Gopal is also a great team player always open to feedback, quick to help others, and proactive in sharing knowledge.",
      initials: "RG",
      date: "October 7, 2025"
    }
  ];

  return (
    <section id="recommendations" className="py-24 relative overflow-hidden bg-background">
      {/* Decorative background gradients */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 font-medium border border-blue-500/20 mb-4 text-sm">
            <Linkedin size={16} />
            <span>Professional Endorsements</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            LinkedIn <span className="gradient-text">Recommendations</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            What industry professionals and founders say about my work and technical skills.
          </p>
        </div>

        {/* Zigzag Vertical Layout */}
        <div className="flex flex-col gap-12 md:gap-16 relative w-full mx-auto max-w-5xl">
          {/* Subtle vertical connecting line */}
          <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-px bg-gradient-to-b from-transparent via-border to-transparent -translate-x-1/2 z-0 opacity-50"></div>

          {recommendations.map((rec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`glass-card flex flex-col hover:-translate-y-2 transition-transform duration-300 rounded-[2rem] p-7 md:p-9 border shadow-xl relative w-full md:w-[85%] lg:w-[80%] ${
                index % 2 === 0 
                  ? 'md:mr-auto md:ml-0 border-blue-500/20 bg-blue-500/5' 
                  : 'md:ml-auto md:mr-0 border-red-500/20 bg-red-500/5'
              }`}
            >
              {/* Giant Background Number */}
              <div 
                className={`absolute opacity-[0.03] font-black text-[10rem] leading-none pointer-events-none select-none z-0 ${
                  index % 2 === 0 ? '-top-4 -right-4 text-blue-500' : '-top-4 -left-4 text-red-500'
                }`}
              >
                0{index + 1}
              </div>

              {/* Header: Author Info & LinkedIn Icon */}
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-border/50 flex items-center justify-center text-foreground font-bold text-xl shadow-sm shrink-0 backdrop-blur-sm">
                    {rec.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg leading-tight">{rec.name}</h4>
                    <p className="text-sm text-foreground/80 font-medium mt-1">
                       {rec.role}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5 uppercase tracking-wider font-semibold">
                       {rec.company}
                    </p>
                  </div>
                </div>
                <a 
                  href="https://www.linkedin.com/in/gopal-shukla-dev/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500/80 hover:text-blue-400 transition-colors bg-blue-500/10 p-2 rounded-full border border-blue-500/20"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={22} className="fill-current" />
                </a>
              </div>

              {/* Quote Content */}
              <div className="relative z-10 flex-grow mb-8">
                <div className="absolute -top-4 -left-4 text-blue-500/20">
                  <Quote size={40} className="fill-current" />
                </div>
                <p className="text-[15px] md:text-base text-muted-foreground font-medium leading-relaxed relative z-10 px-2 text-left indent-4">
                  "{rec.quote}"
                </p>
              </div>

              {/* Footer: Date and Verified Tag */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-auto border-t border-border/50 pt-6 gap-4 sm:gap-0 relative z-10">
                <p className="text-xs md:text-sm text-muted-foreground font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span> {rec.date}
                </p>
                <a
                  href="https://www.linkedin.com/in/gopal-shukla-dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all text-xs font-bold border border-blue-500/20 group w-full sm:w-auto justify-center"
                >
                  <CheckCircle2 size={14} className="shrink-0" />
                  <span>Verified Recommendation</span>
                  <ExternalLink size={12} className="shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
