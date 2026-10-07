import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import FloatingContact from '@/components/FloatingContact';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
      <FloatingContact />
    </>
  );
}
