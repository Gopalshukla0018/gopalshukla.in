"use client";
import { useEffect } from "react";
import { usePathname as useLocation, useRouter as useNavigate } from "next/navigation";
import Link from "next/link";
import { MessageSquare, FileText, Home, LogOut, Users } from "lucide-react";

export default function AdminLayout({ children }) {
  const { pathname: location } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate.push("/gopaldashboardportfolio/login");
    }
  }, [location, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate.push("/gopaldashboardportfolio/login");
  };

  const navItems = [
    { label: "Dashboard Home", icon: Home, path: "/gopaldashboardportfolio/dashboard" },
    { label: "Chat Messages", icon: MessageSquare, path: "/gopaldashboardportfolio/chats" },
    { label: "Blog Management", icon: FileText, path: "/gopaldashboardportfolio/blogs" },
    { label: "Audience", icon: Users, path: "/gopaldashboardportfolio/audience" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-card border-r border-border p-4 flex flex-col">
        <div className="mb-8 px-2">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
            Admin Panel
          </h2>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-purple-500/10 text-purple-400"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-3 py-2 mt-auto text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
