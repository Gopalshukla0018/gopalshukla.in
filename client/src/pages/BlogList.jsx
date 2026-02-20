import React from "react";
import { Link } from "wouter";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { blogsData } from "../data/blogsData";

const BlogList = () => {
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogsData.map((blog) => (
            <Link
              key={blog.id}
              href={blog.type === "coming-soon" ? "#" : `/blog/${blog.slug}`}
            >
              <a className="group block h-full">
                <Card className="h-full overflow-hidden border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-card">
                  <div className="h-48 bg-gradient-to-br from-gray-900 to-gray-800 group-hover:from-primary/20 group-hover:to-purple-900/20 transition-all duration-500 flex items-center justify-center relative">
                    <span className="text-4xl">🚀</span>
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
                    <p className="text-muted-foreground text-sm line-clamp-3">
                      {blog.excerpt}
                    </p>
                  </CardContent>

                  <CardFooter className="mt-auto border-t border-border/50 pt-4">
                    <div className="text-sm font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read Article <ArrowRight size={16} />
                    </div>
                  </CardFooter>
                </Card>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
