import React from "react";
import { useParams, useLocation } from "wouter";
import { Badge } from "@/components/ui/badge";
import { blogsData } from "../data/blogsData";
import ColdEmailBlog from "../components/ColdEmailBlog";

const BlogPost = () => {
  const { slug } = useParams();
  const [, setLocation] = useLocation();
  const blogData = blogsData.find((b) => b.slug === slug);

  if (!blogData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Article Not Found</h1>
        <p className="text-muted-foreground mb-8">The blog you are looking for doesn't exist.</p>
        <button onClick={() => setLocation('/blog')} className="text-primary hover:underline">
          Go back to library
        </button>
      </div>
    );
  }

  // 1. Route to Custom Template UI
  if (blogData.type === "custom-templates") {
    return <ColdEmailBlog data={blogData} />;
  }

  // 2. Route to Standard Article UI
  if (blogData.type === "standard-article") {
    return (
      <div className="min-h-screen bg-background text-foreground pt-32 px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4 border-primary text-primary">
            {blogData.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
            {blogData.title}
          </h1>
          <div className="flex gap-4 text-sm text-muted-foreground mb-10 border-b border-border pb-8">
            <span>{blogData.date}</span>
            <span>•</span>
            <span>{blogData.readTime}</span>
          </div>
          
          <div 
            className="prose prose-invert prose-lg max-w-none text-muted-foreground leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blogData.content.htmlBody }}
          />
        </div>
      </div>
    );
  }

  return null;
};

export default BlogPost;