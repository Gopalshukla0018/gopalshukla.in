import { createContext, useContext, useEffect, useState } from "react";

const ThemeProviderContext = createContext();

export function ThemeProvider({
  children,
  defaultTheme = "dark",
}) {
  const [theme, setTheme] = useState(() => {
    // Always start with dark theme on first load
    if (typeof window === "undefined") return defaultTheme;
    
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    
    // Remove all theme classes first
    root.classList.remove("light", "dark");
    body.classList.remove("light", "dark");
    
    // Add the current theme
    root.classList.add(theme);
    body.classList.add(theme);
    
    // Store theme preference
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Set initial theme on mount
  useEffect(() => {
    const root = window.document.documentElement;
    const body = window.document.body;
    
    // Ensure dark mode is applied initially
    root.classList.add("dark");
    body.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};