import React, { useState } from "react";
import { MessageCircle, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const FloatingContact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      toast({
        title: "Message Sent Successfully! 🚀",
        description: "I'll get back to you within 24 hours.",
        className: "bg-green-600 text-white border-none",
        duration: 5000,
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsDialogOpen(false); // Close after successful submission
    } catch (error) {
      console.error("Submission Error:", error);
      toast({
        title: "Failed to send",
        description: "Server connection failed. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full shadow-2xl shadow-primary/40 hover:scale-110 transition-transform duration-300"
            size="icon"
          >
            <MessageCircle className="h-7 w-7 text-white" />
            <span className="sr-only">Contact Me</span>
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 border-2 border-background animate-pulse"></span>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <span className="text-primary">👋</span> Let's Chat
            </DialogTitle>
            <DialogDescription>
              Have a project in mind? Fill this out and I'll reply within 24
              hours.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input
                required
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="bg-secondary/50 border-border focus:border-primary"
              />
            </div>
            <div className="grid gap-2">
              <Input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
                className="bg-secondary/50 border-border focus:border-primary"
              />
            </div>
            <div className="grid gap-2">
              <Input
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject (Optional)"
                className="bg-secondary/50 border-border focus:border-primary"
              />
            </div>
            <div className="grid gap-2">
              <Textarea
                required
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="How can I help you?"
                className="min-h-[120px] bg-secondary/50 border-border focus:border-primary resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full font-bold text-md mt-2 bg-gradient-to-r from-purple-primary to-blue-primary hover:from-purple-600 hover:to-blue-600"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Message <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingContact;
