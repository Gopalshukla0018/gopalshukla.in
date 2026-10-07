"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function Providers({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) {
  // Suppress React 19 warning about script tags injected by next-themes
  if (typeof window !== "undefined") {
    const originalError = console.error;
    console.error = (...args: any[]) => {
      if (typeof args[0] === "string" && args[0].includes("Encountered a script tag while rendering React component")) {
        return;
      }
      originalError.call(console, ...args);
    };
  }
  return <NextThemesProvider attribute="class" defaultTheme="system" enableSystem {...props}>{children}</NextThemesProvider>;
}
