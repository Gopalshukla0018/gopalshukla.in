// @ts-nocheck
"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, BookOpen, LayoutGrid } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  const location = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    setMounted(true);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (location !== "/") {
      router.push("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          setIsOpen(false);
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    }
  };

  const navItems = ["home", "about", "skills", "projects", "contact"];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "navbar-blur" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <span className="text-2xl font-bold gradient-text">GS</span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="text-muted-foreground hover:text-purple-primary transition-colors duration-300 capitalize font-medium"
                >
                  {item}
                </button>
              ))}

              <Link
                href="/blogs"
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white dark:hover:text-white rounded-full transition-all duration-300 font-bold text-sm border border-primary/20 cursor-pointer"
              >
                <LayoutGrid size={16} />
                <span className="hidden lg:inline">Blogs</span>
                <span className="lg:hidden">Blogs</span>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-foreground"
              >
                {mounted ? (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />) : <div className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Link href="/blogs">
              <span className="flex items-center justify-center text-primary w-9 h-9">
                <LayoutGrid size={20} />
              </span>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {mounted ? (theme === "dark" ? <Sun size={20} /> : <Moon size={20} />) : <div className="w-5 h-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 glass-card rounded-lg mt-2">
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-3 py-2 text-muted-foreground hover:text-purple-primary transition-colors duration-300 capitalize"
                >
                  {item}
                </button>
              ))}

              <Link
                href="/blogs"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 w-full text-left px-3 py-2 text-primary font-bold hover:bg-primary/10 transition-colors duration-300 cursor-pointer"
              >
                <LayoutGrid size={16} />
                Blogs
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}









