import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Github,
  Linkedin,
  Youtube,
  Twitter,
} from "lucide-react";
import ChatBotContact from "./ChatBotContact";

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@gopalshukla.in",
      href: "mailto:hello@gopalshukla.in",
      color: "text-purple-primary",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 9696658804",
      href: "tel:+919696658804",
      color: "text-blue-primary",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Farrukhabad, India",
      href: null,
      color: "text-accent-emerald",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/Gopalshukla0018",
      color: "hover:text-purple-primary",
    },
    {
      icon: Linkedin,
      href: "https://linkedin.com/in/gopalshukla0018",
      color: "hover:text-blue-primary",
    },
    {
      icon: Youtube,
      href: "https://youtube.com/@gopalshukla0018",
      color: "hover:text-red-500",
    },
    { icon: Twitter, href: "#", color: "hover:text-blue-400" },
  ];

  return (
    <section id="contact" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to bring your ideas to life? Use the AI Assistant to start a
            project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* LEFT COLUMN: Contact Info & Resume */}
          <div className="space-y-8">
            <Card className="glass-card border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-purple-primary mb-6">
                  Get in Touch
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <ContactInfoItem key={index} {...info} />
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-border">
                  <p className="text-muted-foreground mb-4">
                    Follow me on social media
                  </p>
                  <div className="flex space-x-4">
                    {socialLinks.map((link, index) => (
                      <SocialLink key={index} {...link} />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-0 text-center">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-accent-amber mb-4">
                  Download Resume
                </h3>
                <p className="text-muted-foreground mb-6">
                  Get a detailed overview of my skills and experience
                </p>
                <Button
                  className="bg-gradient-to-r from-accent-amber to-orange-500 hover:from-amber-600 hover:to-orange-600 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
                  asChild
                >
                  <a
                    href="https://drive.google.com/file/d/1CgPjbmIZyyFllFAt56V4an8lj7R4Mqqk/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-3" size={16} />
                    View CV
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN: AI Chatbot (Replaced Form) */}
          <div className="w-full">
            <ChatBotContact />
          </div>
        </div>
      </div>
    </section>
  );
}

// Helper Components 
function ContactInfoItem({ icon: Icon, label, value, href, color }) {
  const content = (
    <div className="flex items-center space-x-4">
      <div
        className={`w-12 h-12 ${color.replace(
          "text-",
          "bg-",
        )} bg-opacity-20 rounded-full flex items-center justify-center`}
      >
        <Icon className={color} size={20} />
      </div>
      <div>
        <p className="text-muted-foreground">{label}</p>
        <p
          className={`text-foreground ${
            href
              ? "hover:" +
                color.replace("text-", "text-") +
                " transition-colors duration-300"
              : ""
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}

function SocialLink({ icon: Icon, href, color }) {
  return (
    <Button variant="ghost" size="icon" asChild>
      <a
        href={href}
        className={`glass-card rounded-full transition-all duration-300 transform hover:scale-110 ${color}`}
      >
        <Icon size={20} />
      </a>
    </Button>
  );
}
