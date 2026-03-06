import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Send, Bot, BrainCircuit, Sparkles, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "bot",
      text: "Hello! 👋 I'm Gopal's AI Assistant.\n\nMay I know your name?",
    },
  ]);
  const [step, setStep] = useState(0);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [leadData, setLeadData] = useState({
    name: "",
    email: "",
    subject: "Chatbot Inquiry",
    message: "",
  });
  const scrollRef = useRef(null);

  // Auto-scroll logic
  useEffect(() => {
    if (messages.length > 1 || isTyping) {
      scrollRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [messages, isTyping]);

  const projectOptions = [
    "Hire Me / Work Opportunity",
    "Project Collaboration",
    "Freelance Work",
    "Ask About My Projects",
    "Other Question",
  ];

  const handleSend = async (manualInput = null) => {
    const currentInput = manualInput || input;
    if (!currentInput.trim()) return;

    setMessages((prev) => [...prev, { role: "user", text: currentInput }]);
    setInput("");

    setIsTyping(true);
    const thinkingTime = Math.min(
      1500,
      Math.max(800, currentInput.length * 30),
    );

    setTimeout(async () => {
      let replyText = "";
      let nextStep = step;

      // 1. Form Logic
      if (step === 0) {
        // Name Validation
        if (currentInput.length < 2 || /\d/.test(currentInput)) {
          replyText =
            "That doesn't look like a real name. Please enter your full name.";
        } else {
          setLeadData((prev) => ({ ...prev, name: currentInput }));
          replyText = `Nice to meet you, ${currentInput}! 🚀\n\nWhat is your professional **Email address**?`;
          nextStep = 1;
        }
      } else if (step === 1) {
        // Email Validation
        if (!/\S+@\S+\.\S+/.test(currentInput)) {
          replyText =
            "Invalid email format. Please try again (e.g., name@company.com).";
        } else {
          setLeadData((prev) => ({ ...prev, email: currentInput }));
          replyText =
            "Got it! ✅ What brings you here today? (Select an option below)";
          nextStep = 2;
        }
      } else if (step === 2) {
        // Project Type from options
        setLeadData((prev) => ({ ...prev, subject: currentInput }));
        
        if (currentInput === "Other Question") {
           replyText = "Sure, please type your message below.";
           nextStep = 3; 
        } else {
           // Skip message and auto submit
           replyText = `Understood. Submitting your inquiry for "${currentInput}"...`;
           nextStep = 4;
           submitData(currentInput, currentInput, [
              ...messages,
              { role: "user", text: currentInput },
              { role: "bot", text: replyText }
           ]);
        }
      } else if (step === 3) {
        // Custom message Description & Submit
        if (currentInput.length < 5) {
          replyText =
            "Please provide a bit more detail so Gopal can understand your needs.";
        } else {
          replyText = "Submitting your message...";
          nextStep = 4;
          submitData(leadData.subject, currentInput, [
              ...messages,
              { role: "user", text: currentInput },
              { role: "bot", text: replyText }
           ]);
        }
      }

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: replyText,
          isOptions: nextStep === 2,
        },
      ]);
      setStep(nextStep);

    }, thinkingTime);
  };
  
  const submitData = async (subject, message, fullChatHistory) => {
      setIsTyping(true);
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...leadData,
            subject: subject,
            message: message,
            chatHistory: fullChatHistory,
          }),
        });

        if (response.ok) {
          setMessages((prev) => [
            ...prev,
            { role: "bot", text: "All done! 🎉 Your message is sent. Gopal will reply shortly via email." }
          ]);
          setStep(5);
        } else {
          throw new Error("Failed to send");
        }
      } catch (e) {
        console.error(e);
        setMessages((prev) => [
            ...prev,
            { role: "bot", text: "⚠️ Error sending message. Please email directly: hello@gopalshukla.in" }
        ]);
        setStep(5);
      } finally {
        setIsTyping(false);
        setTimeout(() => {
          scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
      }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };
  
  // HELPER: Render Text with Clickable Links ---
  const renderMessageWithLinks = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-cyan-400 underline hover:opacity-80 transition-colors break-all font-medium"
          >
            {part}
          </a>
        );
      }
      // Bold markdown simulation (text)
      const parts = part.split(/(\*\*.*?\*\*)/g);
      return parts.map((subPart, i) => {
        if (subPart.startsWith("**") && subPart.endsWith("**")) {
          return (
            <strong key={i} className="font-bold text-gray-900 dark:text-white">
              {subPart.slice(2, -2)}
            </strong>
          );
        }
        return subPart;
      });
    });
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              className="mb-4 w-[90vw] sm:w-[380px] h-[550px] max-h-[85vh] glass-card border rounded-2xl overflow-hidden flex flex-col shadow-2xl relative
                 bg-white border-gray-200 dark:bg-[#050505] dark:border-white/10"
            >
              {/* --- Header --- */}
              <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-3 flex items-center justify-between shadow-lg z-10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20 relative">
                    <BrainCircuit className="text-white" size={20} />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-cyan-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-white font-bold text-xs tracking-wide flex items-center gap-2">
                      Gopal's AI Agent{" "}
                      <Sparkles size={12} className="text-yellow-400" />
                    </p>
                    <p className="text-cyan-100 text-[10px] font-medium opacity-80">
                      Powered by Portfolio Data
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>

              {/* --- Chat Body --- */}
              <div
                className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-white/10
                bg-gray-50/50 dark:bg-transparent"
              >
                {messages.map((m, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {m.role === "bot" && (
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-white/10 flex items-center justify-center mr-2 mt-1 shrink-0 border border-blue-200 dark:border-white/10">
                        <Bot size={14} className="text-blue-600 dark:text-gray-300" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed shadow-sm whitespace-pre-line border
                      ${
                        m.role === "user"
                          ? "bg-blue-600 text-white border-blue-600 rounded-tr-none"
                          : "bg-white text-gray-800 border-gray-200 dark:bg-[#1a1a1a] dark:text-gray-100 dark:border-white/10 rounded-tl-none"
                      }`}
                    >
                      {renderMessageWithLinks(m.text)}

                      {/* Form Options (Buttons inside chat) */}
                      {m.isOptions &&
                        step === 2 &&
                        i === messages.length - 1 &&
                        !isTyping && (
                          <div className="mt-3 flex flex-col gap-2">
                            {projectOptions.map((opt) => (
                              <button
                                key={opt}
                                onClick={() => handleSend(opt)}
                                className="px-3 py-2 text-left rounded-lg text-xs transition-all border
                            bg-gray-100 border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600
                            dark:bg-white/5 dark:border-white/10 dark:text-gray-300 dark:hover:bg-cyan-500/20 dark:hover:border-cyan-500 dark:hover:text-cyan-100 flex justify-between items-center"
                              >
                                {opt} <ChevronRight size={12} className="opacity-50" />
                              </button>
                            ))}
                          </div>
                        )}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-white/10 flex items-center justify-center mr-2 mt-1 shrink-0 border border-blue-200 dark:border-white/10">
                      <Bot size={14} className="text-blue-600 dark:text-gray-300" />
                    </div>
                    <div className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 rounded-2xl rounded-tl-none p-3 flex items-center gap-1 w-16">
                      <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"></span>
                    </div>
                  </motion.div>
                )}
                <div ref={scrollRef} className="h-1" />
              </div>

              {/* --- Input Area --- */}
              {step < 4 ? (
                <div
                  className={`p-3 border-t flex gap-2 shrink-0 transition-colors relative z-20
                  bg-white border-gray-200 
                  dark:bg-[#0a0a0a] dark:border-white/10 ${step === 2 && !isTyping ? "opacity-50 pointer-events-none" : ""}`}
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isTyping || step === 2}
                    placeholder={
                      step === 2
                        ? "Select an option above..."
                        : "Type your message..."
                    }
                    className="flex-1 rounded-xl px-4 py-2 text-sm outline-none focus:ring-1 transition-all disabled:opacity-50
                  bg-gray-100 text-gray-900 border-transparent focus:ring-blue-500 focus:bg-white placeholder:text-gray-400
                  dark:bg-white/5 dark:text-white dark:border-white/10 dark:focus:ring-cyan-500 dark:placeholder:text-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => handleSend()}
                    disabled={isTyping || !input.trim() || step === 2}
                    className="p-2.5 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95
                  bg-blue-600 hover:bg-blue-700 text-white
                  dark:bg-cyan-600 dark:hover:bg-cyan-700"
                  >
                    <Send size={16} />
                  </button>
                </div>
              ) : (
                <div className="p-4 text-center border-t shrink-0 bg-gray-50 border-gray-200 dark:bg-[#0a0a0a] dark:border-white/10">
                   <p className="text-xs text-muted-foreground mb-2">Thank you! Your inquiry has been submitted.</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`h-14 w-14 rounded-full shadow-2xl shadow-primary/40 hover:scale-110 transition-transform duration-300 ${isOpen ? 'mt-4' : ''}`}
          size="icon"
        >
          {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-7 w-7 text-white" />}
          <span className="sr-only">Contact Me</span>
          {!isOpen && <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 border-2 border-background animate-pulse"></span>}
        </Button>
      </div>
    </>
  );
};

export default FloatingContact;
