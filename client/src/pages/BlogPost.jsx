import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { blogsData } from "../data/blogsData";
import ColdEmailBlog from "../components/ColdEmailBlog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Download, Heart } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [leadEmail, setLeadEmail] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        // First check static data, usually these have specific UI requirements 
        const staticBlog = blogsData.find((b) => b.slug === slug);
        if (staticBlog) {
          // Peek into the DB to check if this static blog was already liked gloabally by anyone!
          try {
            const staticRes = await fetch(`http://localhost:5000/api/blogs/${slug}`);
            if (staticRes.ok) {
              const liveStatic = await staticRes.json();
              if (liveStatic && liveStatic.likes !== undefined) {
                staticBlog.likes = liveStatic.likes;
              }
            }
          } catch (e) {
            console.error("No active DB record for static blog yet", e);
          }

          setBlogData(staticBlog);
          let baseLikes = staticBlog.likes || 12;
          // Optimistically append user's un-refreshed single local like just in case
          if (localStorage.getItem(`liked_blog_${staticBlog.id}`) && !staticBlog.likes) {
            setLiked(true);
            baseLikes += 1;
          } else if (localStorage.getItem(`liked_blog_${staticBlog.id}`)) {
             setLiked(true);
          }
          setLikesCount(baseLikes);
          return;
        }

        // Fetch from API
        const res = await fetch(`http://localhost:5000/api/blogs/${slug}`);
        if (!res.ok) {
          throw new Error("Not found");
        }
        
        const dbBlog = await res.json();
        
        // Map to match structure expected by the UI
        setBlogData({
          id: dbBlog._id,
          slug: dbBlog.slug,
          title: dbBlog.title,
          date: new Date(dbBlog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
          readTime: "5 min read",
          category: "Tech",
          type: "standard-article",
          content: { htmlBody: dbBlog.content },
          hasFreebie: dbBlog.hasFreebie,
          resourceName: dbBlog.resourceName,
          resourceLink: dbBlog.resourceLink
        });
        
        setLikesCount(dbBlog.likes !== undefined ? dbBlog.likes : 15);
        if (localStorage.getItem(`liked_blog_${dbBlog._id}`)) {
          setLiked(true);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 text-center">
        <Loader2 className="animate-spin text-muted-foreground" size={32} />
      </div>
    );
  }

  if (!blogData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Article Not Found</h1>
        <p className="text-muted-foreground mb-8">The blog you are looking for doesn't exist or is not published.</p>
        <button onClick={() => navigate('/blog')} className="text-primary hover:underline">
          Go back to library
        </button>
      </div>
    );
  }

  const handleLike = async () => {
    if (liked || !blogData) return;
    
    setLiked(true);
    setLikesCount(prev => prev + 1);
    localStorage.setItem(`liked_blog_${blogData.id}`, 'true');

    try {
      const targetIdOrSlug = blogData.id && String(blogData.id).length > 5 ? blogData.id : blogData.slug;
      await fetch(`http://localhost:5000/api/blogs/${targetIdOrSlug}/like`, {
        method: 'PATCH',
      });
      toast({ title: "Thanks for the love! ❤️", description: "You liked this article." });
    } catch (err) {
      console.error("Error liking blog:", err);
    }
  };

  // 1. Route to Custom Template UI
  if (blogData.type === "custom-templates") {
    return <ColdEmailBlog data={blogData} liked={liked} likesCount={likesCount} handleLike={handleLike} />;
  }

  // 2. Route to Standard Article UI
  if (blogData.type === "standard-article") {

    const handleDownload = async (e) => {
      e.preventDefault();
      if (!leadEmail) return;
      setDownloading(true);
      try {
        const res = await fetch("http://localhost:5000/api/subscribers/download-resource", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: leadEmail, resourceName: blogData.resourceName, resourceLink: blogData.resourceLink })
        });
        const data = await res.json();
        if (res.ok) {
          toast({ title: "Success! 🎉", description: "Check your inbox for the download link." });
          setLeadEmail("");
        } else {
          toast({ variant: "destructive", title: "Error", description: data.message || "Failed to send resource." });
        }
      } catch (err) {
        toast({ variant: "destructive", title: "Error", description: "Network error." });
      } finally {
        setDownloading(false);
      }
    };

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
            className="prose dark:prose-invert prose-lg max-w-none text-foreground leading-relaxed mb-16"
            dangerouslySetInnerHTML={{ __html: blogData.content.htmlBody }}
          />

          {blogData.hasFreebie && (
            <Card className="border-primary/20 bg-primary/5 shadow-xl mt-12 mb-8">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold flex justify-center items-center gap-2">
                  🎁 Download Free Resource 
                </CardTitle>
                <CardDescription className="text-base">
                  Get instant access to: <strong className="text-foreground">{blogData.resourceName}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleDownload} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-4">
                  <input 
                    type="email" 
                    placeholder="Enter your best email" 
                    required
                    value={leadEmail}
                    onChange={(e) => setLeadEmail(e.target.value)}
                    className="flex-1 px-4 py-2 border border-border bg-background rounded-md outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button type="submit" disabled={downloading} className="bg-primary hover:bg-primary/90 text-white font-semibold">
                    {downloading ? <Loader2 className="animate-spin mr-2" size={18} /> : <Download className="mr-2" size={18} />}
                    Send it to me
                  </Button>
                </form>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  By downloading, you agree to receive occasional tech updates. No spam, ever.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Like Section */}
          <div className="mt-16 flex flex-col items-center justify-center border-t border-border pt-10 pb-4">
            <h3 className="text-xl font-bold mb-4">Did you find this article helpful?</h3>
            <Button 
              variant="outline" 
              size="lg" 
              className={`rounded-full gap-2 transition-all duration-300 ${liked ? 'border-red-500 bg-red-50 text-red-500 dark:bg-red-950/20' : 'hover:border-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20'}`}
              onClick={handleLike}
              disabled={liked}
            >
              <Heart 
                className={`transition-all duration-300 ${liked ? 'fill-red-500 text-red-500 scale-110' : 'text-muted-foreground'}`} 
              />
              <span className="font-semibold text-lg">{likesCount}</span>
              {liked && <span className="ml-2 font-normal">Thanks for the love!</span>}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default BlogPost;