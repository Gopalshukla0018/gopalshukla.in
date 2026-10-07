"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, PlayCircle, Layers, Youtube } from "lucide-react";
import Link from "next/link";

export default function ContentSection() {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const res = await fetch(`/api/blogs`);
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
    <section id="content" className="relative py-20 bg-secondary/20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-16 text-center animate-fade-in-up">
          <div className="inline-flex items-center px-3 py-1 mb-4 space-x-2 text-sm font-medium text-red-500 border rounded-full bg-red-primary/10 border-red-500/20">
            <PlayCircle size={14} />
            <span>Content & Education</span>
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl text-foreground">
            Learn with my <span className="gradient-text">Free Content</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Practical advice, career guidance, and technical deep dives to help you land your first role and build real skills.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-7">
            <div className="flex items-center justify-between mb-6">
              <h3 className="flex items-center gap-2 text-2xl font-bold text-foreground">
                <PlayCircle className="text-red-500" /> YouTube Channel
              </h3>
              <a
                href="https://youtube.com/@gopalshukla0018"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-medium text-red-500 transition-colors hover:text-red-400"
              >
                Subscribe <ExternalLink size={14} />
              </a>
            </div>

            <a href="https://youtube.com/@gopalshukla0018" target="_blank" rel="noopener noreferrer" className="block group">
              <Card className="overflow-hidden transition-all duration-300 border-0 shadow-xl glass-card hover:-translate-y-1">
                <CardContent className="p-10 flex flex-col items-center justify-center text-center bg-gradient-to-br from-red-500/10 to-background min-h-[300px]">
                  <div className="flex items-center justify-center w-20 h-20 mb-6 text-white transition-transform duration-300 bg-red-500 rounded-full shadow-lg dark:text-white group-hover:scale-110 shadow-red-500/20">
                    <Youtube size={40} className="ml-2 fill-white" />
                  </div>
                  <h4 className="mb-3 text-3xl font-bold transition-colors text-foreground group-hover:text-red-500">
                    Join 1,700+ Students
                  </h4>
                  <p className="max-w-sm mb-6 text-muted-foreground">
                    Get weekly practical videos on BCA, web development, and tech career advice.
                  </p>
                  <Button className="px-8 text-white bg-red-500 rounded-full hover:bg-red-600 dark:text-white">
                    Watch Youtube Videos Now
                  </Button>
                </CardContent>
              </Card>
            </a>

            {/* Original Video Embed - Commented out for now
            <Card className="overflow-hidden border-0 shadow-xl glass-card group">
              <div className="relative w-full overflow-hidden aspect-video bg-black/20 rounded-t-xl">
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
                <h4 className="mb-2 text-xl font-bold transition-colors text-foreground group-hover:text-red-500">
                  Is BCA Useless/Worth It in 2024 | Jobs After BCA
                </h4>
                <p className="mb-4 text-muted-foreground line-clamp-2">
                  A comprehensive analysis of the BCA degree's relevance and worth in today's job market, exploring job prospects and career paths.
                </p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 text-xs font-medium text-red-500 border rounded bg-red-500/10 border-red-500/20">BCA Roadmap</span>
                  <span className="px-2 py-1 text-xs font-medium rounded bg-secondary text-muted-foreground">Career Advice</span>
                </div>
              </CardContent>
            </Card>
            */}
          </div>

          {/* Blog Section */}
          <div className="space-y-6 lg:col-span-5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="flex items-center gap-2 text-2xl font-bold text-foreground">
                <BookOpen className="text-blue-500" /> Recent Writing
              </h3>
              <Link href="/blogs" className="flex items-center gap-1 text-sm font-medium text-blue-500 transition-colors hover:text-blue-400">
                View All <ExternalLink size={14} />
              </Link>
            </div>

            <div className="space-y-6">
              {latestBlogs.map((blog) => (
                <Link key={blog.id} href={`/blogs/${blog.slug}`} className={`block ${blog.type === 'coming-soon' ? 'pointer-events-none' : ''}`}>
                  <Card className="h-full transition-all duration-300 border-0 glass-card hover:-translate-y-1 group">
                    <CardContent className="flex flex-col h-full p-6">
                      <div className="mb-2 text-xs font-medium tracking-wider text-blue-500 uppercase">{blog.category}</div>
                      <h4 className="mb-3 text-lg font-bold transition-colors text-foreground group-hover:text-blue-500 line-clamp-2">
                        {blog.title}
                      </h4>
                      <p className="flex-grow mb-4 text-sm text-muted-foreground line-clamp-2">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 mt-auto text-xs border-t text-muted-foreground border-border">
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



