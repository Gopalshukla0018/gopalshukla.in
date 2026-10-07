"use client";
import AdminLayout from "./AdminLayout";
import { useEffect, useState } from "react";
import { Activity, MessageSquare, FileText } from "lucide-react";

export default function DashboardHome() {
  const [stats, setStats] = useState({ chats: 0, blogs: 0 });

  useEffect(() => {
    // Basic fetch to get count, just a placeholder structure
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const headers = { Authorization: `Bearer ${token}` };
        
        const [chatRes, blogRes] = await Promise.all([
          fetch(`${'' || 'http://localhost:5000/api'}/admin/chats`, { headers }),
          fetch(`${'' || 'http://localhost:5000/api'}/admin/blogs`, { headers })
        ]);

        if (chatRes.ok && blogRes.ok) {
          const chats = await chatRes.json();
          const blogs = await blogRes.json();
          setStats({ chats: chats.length, blogs: blogs.length });
        }
      } catch (error) {
        console.error("Failed to fetch stats");
      }
    };
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-heading">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Welcome back to your portfolio admin panel.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Total Chats</p>
              <MessageSquare className="h-4 w-4 text-purple-400" />
            </div>
            <div className="text-3xl font-bold">{stats.chats}</div>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">Total Blogs</p>
              <FileText className="h-4 w-4 text-blue-400" />
            </div>
            <div className="text-3xl font-bold">{stats.blogs}</div>
          </div>

          <div className="p-6 bg-card border border-border rounded-xl shadow-sm">
            <div className="flex items-center justify-between space-y-0 pb-2">
              <p className="text-sm font-medium text-muted-foreground">System Status</p>
              <Activity className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-bold text-emerald-400">Online</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

