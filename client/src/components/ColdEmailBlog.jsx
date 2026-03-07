import React, { useState } from "react";
import {
  Copy,
  Check,
  Target,
  Zap,
  ArrowRight,
  User,
  Briefcase,
  AlertTriangle,
  Heart,
  Youtube
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Accepts dynamic blog data from the CMS
const ColdEmailBlog = ({ data, liked, likesCount, handleLike }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  if (!data || !data.content) {
    return <div className="p-20 text-center">Content not available.</div>;
  }

  const { templates, detailTitle, detailTitleHighlight, updatedAt } =
    data.content;

  const handleCopy = (text, index) => {
    const textToCopy = text.split("Example:")[0].trim();
    navigator.clipboard.writeText(textToCopy);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto pt-12 px-6">
        <Badge variant="outline" className="mb-4 border-primary text-primary">
          {data.category}
        </Badge>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-2 mb-6 leading-tight">
          {detailTitle}{" "}
          <span className="text-primary">{detailTitleHighlight}</span>
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10 border-b border-border pb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              GS
            </div>
            <span className="font-medium text-foreground">Gopal Shukla</span>
          </div>
          <span>•</span>
          <span>Updated {updatedAt}</span>
        </div>
        
        {data.coverImageUrl && (
          <div className="relative w-full h-[300px] md:h-[450px] mb-12 rounded-2xl overflow-hidden shadow-2xl border border-border">
            <img src={data.coverImageUrl} alt={detailTitle} className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 space-y-12 text-lg leading-relaxed text-muted-foreground">
        {/* The Hook: The Black Hole */}
        <div className="space-y-4">
          <p>You've applied to 50 companies. Maybe 100.</p>
          <p>
            Naukri, Internshala, LinkedIn Easy Apply—you've tried everything.
            And you've got nothing. No calls. No replies. Just automated
            rejections.
          </p>
          <div className="bg-card border-l-4 border-destructive p-6 rounded-r-xl shadow-sm italic text-card-foreground my-6">
            "Here's why: You're competing with thousands of people for one job.
            Your resume goes into an ATS (Applicant Tracking System), gets
            scanned by a bot, and if it doesn't match the exact keywords, it's
            rejected—before a human even sees it. That's the black hole."
          </div>
          <p className="font-medium text-foreground">
            But there's another way. A way that skips the crowd, skips the ATS,
            and puts you directly in front of the person who makes hiring
            decisions.
          </p>
          <p className="text-xl font-bold text-primary">
            Cold emails and LinkedIn DMs.
          </p>
        </div>

        {/* Why it works */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Why Cold Emails Work (When Job Portals Don't)
          </h2>
          <div className="grid gap-4">
            <Card className="bg-card/50 hover:bg-card transition-colors">
              <CardContent className="flex gap-4 p-4 items-start pt-6">
                <Target className="text-blue-500 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground">
                    Skipping the Crowd
                  </h3>
                  <p className="text-sm">
                    While everyone else is applying through portals, you're in
                    their inbox.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 hover:bg-card transition-colors">
              <CardContent className="flex gap-4 p-4 items-start pt-6">
                <Zap className="text-yellow-500 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground">
                    Showing Initiative
                  </h3>
                  <p className="text-sm">
                    Most freshers are too scared to reach out. You're not.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 hover:bg-card transition-colors">
              <CardContent className="flex gap-4 p-4 items-start pt-6">
                <Briefcase className="text-green-500 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-foreground">
                    Proving Work Upfront
                  </h3>
                  <p className="text-sm">
                    Instead of hoping your resume gets noticed, you're showing
                    what you've built.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* The Rule */}
        <div className="bg-yellow-500/10 text-yellow-800 dark:text-yellow-400 p-6 rounded-xl border border-yellow-500/20 flex gap-4 items-start">
          <AlertTriangle className="shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg mb-2">
              Before You Start: One Rule
            </h3>
            <p className="mb-2">This only works if you have skills.</p>
            <p className="text-sm opacity-90">
              If you're applying for a frontend role, you should have real
              hands-on experience... Agar skill nahi hai, pehle wo seekho. But
              if you DO have skills and you're still not getting calls, then
              keep reading.
            </p>
          </div>
        </div>

        {/* 3 Step Process */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-foreground border-b border-border pb-2">
            The 3-Step Process
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Step 1: Find the Right Companies
              </h3>
              <p>
                Don't cold email TCS or Infosys. Focus on startups and small
                product companies.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 marker:text-primary">
                <li>
                  Let investors do the work for you. Check portfolios of{" "}
                  <strong>
                    YC India, Sequoia India, Rainmatter, Kalaari Capital
                  </strong>
                  .
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Step 2: Find the Right Person
              </h3>
              <p>
                Go to the company's LinkedIn page → Click "People" → Search for:{" "}
                <strong>
                  Founder, CTO, Engineering Lead, or Head of Product
                </strong>
                .
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Step 3: Send the Email/DM
              </h3>
              <p>
                Don't write a 10-paragraph essay. Keep it short. Show your work.
                Have a clear ask.
              </p>
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            The Templates You Need
          </h2>
          <p className="text-muted-foreground mb-8">
            These are the exact formats I used. Customize them with your
            projects.
          </p>

          <div className="space-y-12">
            {templates.map((t, i) => (
              <div
                key={i}
                className="border border-border rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-all group"
              >
                <div className="bg-muted/30 p-4 border-b border-border flex justify-between items-center gap-4">
                  <div>
                    <h3 className="font-bold text-foreground">{t.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t.desc}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant={copiedIndex === i ? "default" : "outline"}
                    onClick={() => handleCopy(t.body, i)}
                    className="gap-2 shrink-0"
                  >
                    {copiedIndex === i ? (
                      <Check size={14} />
                    ) : (
                      <Copy size={14} />
                    )}
                    {copiedIndex === i ? "Copied" : "Copy Template"}
                  </Button>
                </div>

                <div className="p-6 font-mono text-sm bg-card text-card-foreground whitespace-pre-wrap leading-relaxed">
                  {t.subject !== "N/A" && (
                    <div className="mb-6 pb-4 border-b border-dashed border-border/50">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                        Subject Line
                      </span>
                      <div className="font-medium mt-1 text-primary">
                        {t.subject}
                      </div>
                    </div>
                  )}
                  {t.body}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <section className="bg-secondary/20 p-8 rounded-2xl space-y-6 border border-border/50">
          <h3 className="font-bold text-xl text-foreground flex items-center gap-2">
            <Zap className="text-yellow-500" size={20} /> Quick Tips to Improve
            Your Response Rate
          </h3>
          <ul className="grid gap-4 sm:grid-cols-2">
            <li className="flex gap-2 text-sm">
              <Check className="text-green-500 shrink-0" size={16} />{" "}
              <span>
                <strong>Keep It Short:</strong> 5-7 lines max.
              </span>
            </li>
            <li className="flex gap-2 text-sm">
              <Check className="text-green-500 shrink-0" size={16} />{" "}
              <span>
                <strong>Live Links:</strong> A live project is proof.
              </span>
            </li>
            <li className="flex gap-2 text-sm">
              <Check className="text-green-500 shrink-0" size={16} />{" "}
              <span>
                <strong>Personalize:</strong> Mention what they're building.
              </span>
            </li>
            <li className="flex gap-2 text-sm">
              <Check className="text-green-500 shrink-0" size={16} />{" "}
              <span>
                <strong>Grammarly:</strong> No spelling mistakes.
              </span>
            </li>
            <li className="flex gap-2 text-sm">
              <Check className="text-green-500 shrink-0" size={16} />{" "}
              <span>
                <strong>Follow Up:</strong> Send a polite nudge after 4-5 days.
              </span>
            </li>
            <li className="flex gap-2 text-sm">
              <Check className="text-green-500 shrink-0" size={16} />{" "}
              <span>
                <strong>Don't Give Up:</strong> You only need one Yes.
              </span>
            </li>
          </ul>
        </section>

        {/* Final Thoughts CTA */}
        <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center mt-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              "Sharam chhodo. Besharam hokar DM karo."
            </h3>
            <p className="mb-8 opacity-90 max-w-xl mx-auto text-lg">
              Cold emailing feels uncomfortable at first. But all it takes is
              one reply to change everything. I sent 15 cold emails. Got 3
              replies. Had 2 interviews. Got 1 offer.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 mt-6">
              <div className="relative group cursor-pointer inline-block" onClick={() => window.open("https://youtu.be/SnnLK6dfSGs", "_blank")}>
                {/* Glowing Background Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                
                {/* Button container */}
                <div className="relative flex items-center gap-3 bg-card border border-red-500/30 text-card-foreground px-8 py-4 rounded-2xl shadow-2xl transition-all duration-300 group-hover:-translate-y-1">
                  <div className="bg-red-600 text-white dark:text-white p-2.5 rounded-full flex items-center justify-center">
                    <Youtube size={26} className="fill-white" />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-xs font-bold text-red-500 uppercase tracking-widest mb-0.5">Watch Video Guide</span>
                    <span className="text-lg md:text-xl font-extrabold flex items-center gap-2">
                      From 0 Replies to 10 Interview Calls <ArrowRight size={18} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Like Section */}
        <div className="mt-16 flex flex-col items-center justify-center border-t border-border pt-10 pb-4">
          <h3 className="text-xl font-bold mb-4">Did you find this strategy helpful?</h3>
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

        {/* About Author */}
        <div className="border-t border-border pt-12 mt-12 pb-20">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center shrink-0 border border-border">
              <User size={32} className="text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">
                About Gopal Shukla
              </h3>
              <p className="text-muted-foreground leading-relaxed mt-2">
                I am a <strong>full-stack developer and tech lead</strong> at a
                product-based startup. I enjoy helping students by sharing my
                real journey, mentoring on platforms like Unstop, and guiding
                70+ juniors through college and career challenges. I'm also a
                BCA graduate who knows how tough it is to land that first job.
              </p>
              <p className="mt-4 font-medium text-foreground">
                Want more real, no-BS career advice?{" "}
                <a
                  href="https://youtube.com/@gopalshukla0018"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline"
                >
                  Subscribe to my YouTube channel
                </a>{" "}
                where I share honest guidance on placements, coding, and
                internships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColdEmailBlog;
