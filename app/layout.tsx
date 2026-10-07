import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';
import SmoothScroll from '@/components/SmoothScroll';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Gopal Shukla | Software Engineer',
  description: 'Gopal Shukla is a Software Engineer specializing in scalable MERN stack applications.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <SmoothScroll>
            {children}
            <Toaster />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}

