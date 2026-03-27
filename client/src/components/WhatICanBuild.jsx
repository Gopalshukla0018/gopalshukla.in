import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Server, LayoutDashboard, CreditCard, LineChart, Globe } from "lucide-react";

export default function WhatICanBuild() {
  const skills = [
    {
      title: "SaaS Platforms",
      description: "End-to-end B2B and B2C SaaS applications ready to handle active users.",
      icon: Rocket,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "High-Conversion Websites",
      description: "Performance-optimized landing pages and websites designed to actually increase conversions.",
      icon: LineChart,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      title: "Full-Stack Web Apps",
      description: "Custom web applications built from scratch with complete frontend-backend parity.",
      icon: Globe,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "REST APIs",
      description: "Robust, optimized backends using Node.js and Express.",
      icon: Server,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Real-time Dashboards",
      description: "Complex admin panels and data-rich dashboards with real-time sync.",
      icon: LayoutDashboard,
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
    },
    {
      title: "Payment Integration",
      description: "Stripe, Cashfree, and webhook integrations with zero dispute architecture.",
      icon: CreditCard,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
  ];

  return (
    <section className="py-20 relative bg-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-primary/10 text-emerald-primary text-sm font-medium border border-emerald-primary/20 mb-4">
            <Server size={14} />
            <span>Core Capabilities</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            What I Can <span className="gradient-text">Build</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            These are the foundational systems I build out of the box to power production-ready web applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, i) => (
            <Card key={i} className="glass-card border-0 hover:-translate-y-2 transition-transform duration-300 group shadow-lg">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl ${skill.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}>
                  <skill.icon className={`w-8 h-8 ${skill.color}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{skill.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {skill.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
