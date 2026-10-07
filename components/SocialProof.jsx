"use client";
import { FiGithub as Github, FiLinkedin as Linkedin, FiYoutube as Youtube, FiTwitter as Twitter } from 'react-icons/fi';
import { Card, CardContent } from "@/components/ui/card";
import { Users, Compass, Code2 } from "lucide-react";

export default function SocialProof() {
  const stats = [
    {
      label: "YouTube Audience",
      value: "1.7K+",
      description: "Followers across platforms",
      icon: color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    {
      label: "Students Helped",
      value: "Thousands",
      description: "Through educational videos",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Career Guidance",
      value: "BCA & Tech",
      description: "Real, practical advice",
      icon: Compass,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      label: "Developer",
      value: "Practical",
      description: "Sharing tech knowledge",
      icon: Code2,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
  ];

  return (
    <section id="social-proof" className="py-12 md:py-16 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="glass-card border-0 hover:-translate-y-1 transition-transform duration-300 group"
            >
              <CardContent className="p-6 flex items-start space-x-4">
                <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{stat.value}</h3>
                  <p className="text-sm font-medium text-foreground">{stat.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
