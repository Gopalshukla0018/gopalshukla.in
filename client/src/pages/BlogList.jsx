import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, Clock, Heart } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blogsData as staticBlogsData } from "../data/blogsData";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/blogs`);
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const dbBlogs = await res.json();

        const publishedDbBlogs = dbBlogs.filter(b => b.status !== 'Static');
        const staticDbBlogs = dbBlogs.filter(b => b.status === 'Static');

        // map DB blogs to Card UI format
        const mappedDbBlogs = publishedDbBlogs.map(blog => ({
          id: blog._id,
          slug: blog.slug,
          title: blog.title,
          excerpt: blog.description || "Read more about this topic...",
          date: new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          readTime: "5 min read",
          category: "Tech",
          type: "standard-article", // Treat DB blogs as standard articles
          content: { htmlBody: blog.content },
          coverImageUrl: blog.coverImageUrl || blog.coverImage || null,
          likes: blog.likes !== undefined ? blog.likes : 15
        }));

        // combine DB blogs with static ones and lock static likes to a fix payload rather than inline randomness
        const mappedStaticBlogs = staticBlogsData.map((blog, idx) => {
          const liveTrackMatch = staticDbBlogs.find(b => b.slug === blog.slug);
          let baseLikes;
          
          if (liveTrackMatch) {
            baseLikes = liveTrackMatch.likes;
          } else {
            baseLikes = blog.likes || (12 + (idx % 8)); // Stable static generation
            if (localStorage.getItem(`liked_blog_${blog.id}`)) {
              baseLikes += 1;
            }
          }
          
          return {
            ...blog,
            likes: baseLikes
          };
        });

        setBlogs([...mappedDbBlogs, ...mappedStaticBlogs]);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs");
        // Fallback to static data
        setBlogs(staticBlogsData.map((blog, idx) => {
          let baseLikes = blog.likes || (12 + (idx % 8));
          if (localStorage.getItem(`liked_blog_${blog.id}`)) {
            baseLikes += 1;
          }
          return { ...blog, likes: baseLikes };
        }));
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center md:text-left">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            Gopal's Library
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Wealth & <span className="text-primary">Career Strategies</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            No-nonsense guides for students and freshers to hack their career
            growth, build wealth, and master the MERN stack.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-muted-foreground">Loading blogs...</div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
              <Link
                key={blog.id}
                to={blog.type === "coming-soon" ? "#" : `/blogs/${blog.slug}`}
                className="group block h-full"
              >
                <Card className="h-full overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 group-hover:from-primary/10 group-hover:to-purple-100 dark:group-hover:from-primary/20 dark:group-hover:to-purple-900/20 transition-all duration-500 flex items-center justify-center relative overflow-hidden">
                    {blog.coverImageUrl ? (
                      <img src={blog.coverImageUrl} alt={blog.title} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl">🚀</span>
                    )}

                    <Badge className="absolute top-4 right-4 bg-background/80 text-foreground backdrop-blur-sm">
                      {blog.category}
                    </Badge>
                  </div>

                  <CardHeader>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {blog.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {blog.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                      {blog.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </CardContent>

                    <CardFooter className="mt-auto border-t border-border/50 pt-4 flex justify-between items-center">
                      <div className="text-sm font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read Article <ArrowRight size={16} />
                      </div>
                      {blog.type !== "coming-soon" && (
                        <div className="flex items-center gap-1.5 text-muted-foreground text-sm font-medium bg-secondary/50 px-2 py-1 rounded-full">
                          <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                          <span>{blog.likes}</span>
                        </div>
                      )}
                    </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
