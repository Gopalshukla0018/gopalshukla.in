"use client";
import { FiGithub as Github, FiLinkedin as Linkedin, FiYoutube as Youtube, FiTwitter as Twitter } from 'react-icons/fi';
import { Mail, Heart, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-20 pb-10 border-t border-border overflow-hidden
      bg-gray-50 dark:bg-[#050505]">
      {/* Top Glow Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-purple-primary/50 to-transparent"></div>

      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Gopal <span className="text-purple-primary">Shukla</span>
            </h2>
            <p className="text-muted-foreground max-w-sm leading-relaxed text-sm">
              Helping students build real skills and skip career mistakes. Full Stack Developer building scalable apps.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 pt-4">
              <SocialIcon
                href="https://github.com/Gopalshukla0018"
                icon={Github}
              />
              <SocialIcon
                href="https://linkedin.com/in/gopalshukla0018"
                icon={Linkedin}
              />
              <SocialIcon
                href="https://youtube.com/@gopalshukla0018"
                icon={Youtube}
              />
              <SocialIcon href="mailto:hello@gopalshukla.in" icon={Mail} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground font-semibold mb-6 tracking-wide">
              Navigation
            </h3>
            <ul className="space-y-3">
              {["Home", "About", "Skills", "Projects", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-muted-foreground hover:text-purple-primary transition-colors duration-300 text-sm flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-primary/50 scale-0 group-hover:scale-100 transition-transform"></span>
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact & Status */}
          <div>
            <h3 className="text-foreground font-semibold mb-6 tracking-wide">
              Get in Touch
            </h3>
            <p className="text-muted-foreground text-sm mb-2">Farrukhabad, India</p>
            <a
              href="mailto:hello@gopalshukla.in"
              className="text-muted-foreground hover:text-foreground transition-colors block mb-6 text-sm font-mono"
            >
              hello@gopalshukla.in
            </a>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                Open for Work
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs text-center md:text-left">
            © {currentYear} Gopal Shukla. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground bg-secondary/50 px-4 py-2 rounded-full border border-border">
            <span>Built with</span>
            <Heart
              size={12}
              className="text-red-500 fill-red-500 animate-pulse"
            />
            <span>using React &amp; Tailwind</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-full bg-secondary/50 hover:bg-purple-primary hover:text-white transition-all duration-300 text-muted-foreground border border-border shadow-lg hover:shadow-purple-500/25 group"
            aria-label="Scroll to top"
          >
            <ArrowUp
              size={16}
              className="group-hover:-translate-y-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ href, icon: Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2.5 rounded-xl bg-secondary/50 border border-border hover:bg-purple-primary/10 hover:border-purple-primary/50 hover:text-purple-primary text-muted-foreground transition-all duration-300 hover:-translate-y-1"
    >
      <Icon size={18} />
    </a>
  );
}
