import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon, BookOpen, LayoutGrid } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider.jsx";
import { Link, useLocation } from "wouter";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    if (location !== "/") {
      setLocation("/");
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
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "navbar-blur" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex-shrink-0 cursor-pointer"
            onClick={() => setLocation("/")}
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

              {/* Link points to /blog n*/}
              <Link href="/blog">
                <a className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-full transition-all duration-300 font-bold text-sm border border-primary/20 cursor-pointer">
                  <LayoutGrid size={16} />
                  <span className="hidden lg:inline">Blogs</span>
                  <span className="lg:hidden">Blogs</span>
                </a>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-foreground"
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* UPDATED: Mobile Header Icon points to /blog */}
            <Link href="/blog">
              <Button variant="ghost" size="icon" className="text-primary">
                <LayoutGrid size={20} />
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
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

              {/* UPDATED: Mobile Menu Link points to /blog */}
              <Link href="/blog">
                <a
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2 w-full text-left px-3 py-2 text-primary font-bold hover:bg-primary/10 transition-colors duration-300 cursor-pointer"
                >
                  <LayoutGrid size={16} />
                  Blogs
                </a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
