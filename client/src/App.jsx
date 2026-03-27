import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { queryClient } from "./lib/queryClient.js";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider.jsx";
import Home from "@/pages/Home.jsx";
import NotFound from "@/pages/not-found.jsx";
import ColdEmailBlog from "./components/ColdEmailBlog.jsx";
import Footer from "./components/Footer.jsx";
import Navigation from "./components/Navigation.jsx";
import BlogList from "./pages/BlogList.jsx";
import FloatingContact from "./components/FloatingContact.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import { useEffect } from "react";
import BlogPost from "./pages/BlogPost.jsx";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import DashboardHome from "./pages/admin/DashboardHome.jsx";
import ChatMessages from "./pages/admin/ChatMessages.jsx";
import BlogManagement from "./pages/admin/BlogManagement.jsx";
import AudienceManagement from "./pages/admin/AudienceManagement.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function MainLayout() {
  const { pathname } = useLocation();
  const isAdminRoute = pathname.startsWith("/gopaldashboardportfolio");

  return (
    <SmoothScroll>
      <ScrollToTop />
      {!isAdminRoute && <Navigation />}
      <div className={!isAdminRoute ? "min-h-screen pt-16" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />

          {/* Admin Routes */}
          <Route path="/gopaldashboardportfolio/login" element={<AdminLogin />} />
          <Route path="/gopaldashboardportfolio/dashboard" element={<DashboardHome />} />
          <Route path="/gopaldashboardportfolio/chats" element={<ChatMessages />} />
          <Route path="/gopaldashboardportfolio/blogs" element={<BlogManagement />} />
          <Route path="/gopaldashboardportfolio/audience" element={<AudienceManagement />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <FloatingContact />}
    </SmoothScroll>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <MainLayout />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
