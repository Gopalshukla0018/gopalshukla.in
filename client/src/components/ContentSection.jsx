import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, PlayCircle, Layers, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

export default function ContentSection() {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/blogs`);
        if (res.ok) {
          const dbBlogs = await res.json();
          // Filter published blogs
          const published = dbBlogs.filter(b => b.status !== 'Static');

          // Map to match the expected format and take top 2
          const mapped = published.slice(0, 2).map(blog => ({
            id: blog._id,
            slug: blog.slug,
            title: blog.title,
            excerpt: blog.description || "Read more about this topic...",
            date: new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            category: "Writing",
            readTime: "5 min read",
            type: "standard-article"
          }));

          setLatestBlogs(mapped);
        }
      } catch (err) {
        console.error("Error fetching recent blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, []);

  return (
    <section id="content" className="py-20 relative bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-primary/10 text-red-500 text-sm font-medium border border-red-500/20 mb-4">
            <PlayCircle size={14} />
            <span>Content & Education</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Learn with my <span className="gradient-text">Free Content</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practical advice, career guidance, and technical deep dives to help you land your first role and build real skills.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <PlayCircle className="text-red-500" /> YouTube Channel
              </h3>
              <a
                href="https://youtube.com/@gopalshukla0018"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors"
              >
                Subscribe <ExternalLink size={14} />
              </a>
            </div>

            <a href="https://youtube.com/@gopalshukla0018" target="_blank" rel="noopener noreferrer" className="block group">
              <Card className="glass-card border-0 overflow-hidden shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-10 flex flex-col items-center justify-center text-center bg-gradient-to-br from-red-500/10 to-background min-h-[300px]">
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center text-white dark:text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-500/20">
                    <Youtube size={40} className="ml-2 fill-white" />
                  </div>
                  <h4 className="text-3xl font-bold text-foreground mb-3 group-hover:text-red-500 transition-colors">
                    Join 1,700+ Students
                  </h4>
                  <p className="text-muted-foreground max-w-sm mb-6">
                    Get weekly practical videos on BCA, web development, and tech career advice.
                  </p>
                  <Button className="bg-red-500 hover:bg-red-600 text-white dark:text-white rounded-full px-8">
                    Watch Playlist Vdeos Now
                  </Button>
                </CardContent>
              </Card>
            </a>

            {/* Original Video Embed - Commented out for now
            <Card className="glass-card border-0 overflow-hidden shadow-xl group">
              <div className="relative aspect-video w-full bg-black/20 rounded-t-xl overflow-hidden">
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/videoseries?list=UUAUZIYQGPnj7ufuf1e8dbee0LxKvaW8kgTd46R_n3RvvJuZPW4i4FWhGnxYSdeZICNAOfg5OmLyT0qi3nqz6ajWCC5pC2Xk1v7xhZEfLN8pTQuB8AXBU0MNWcXrVRuEweQvdjlFv76QNeAA" 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>
              <CardContent className="p-6">
                <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-red-500 transition-colors">
                  Is BCA Useless/Worth It in 2024 | Jobs After BCA
                </h4>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  A comprehensive analysis of the BCA degree's relevance and worth in today's job market, exploring job prospects and career paths.
                </p>
                <div className="flex gap-2">
                  <span className="text-xs bg-red-500/10 text-red-500 px-2 py-1 rounded font-medium border border-red-500/20">BCA Roadmap</span>
                  <span className="text-xs bg-secondary text-muted-foreground px-2 py-1 rounded font-medium">Career Advice</span>
                </div>
              </CardContent>
            </Card>
            */}
          </div>

          {/* Blog Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <BookOpen className="text-blue-500" /> Recent Writing
              </h3>
              <Link to="/blogs" className="text-sm font-medium text-blue-500 hover:text-blue-400 flex items-center gap-1 transition-colors">
                View All <ExternalLink size={14} />
              </Link>
            </div>

            <div className="space-y-6">
              {latestBlogs.map((blog) => (
                <Link key={blog.id} to={`/blogs/${blog.slug}`} className={`block ${blog.type === 'coming-soon' ? 'pointer-events-none' : ''}`}>
                  <Card className="glass-card border-0 hover:-translate-y-1 transition-all duration-300 group h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="text-xs font-medium text-blue-500 mb-2 uppercase tracking-wider">{blog.category}</div>
                      <h4 className="text-lg font-bold text-foreground mb-3 group-hover:text-blue-500 transition-colors line-clamp-2">
                        {blog.title}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-grow">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border mt-auto">
                        <span>{blog.date}</span>
                        <span className="flex items-center gap-1"><BookOpen size={12} /> {blog.readTime}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
