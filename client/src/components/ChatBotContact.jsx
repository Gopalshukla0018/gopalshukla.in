import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  RefreshCcw,
  Sparkles,
  BrainCircuit,
  ChevronRight,
  Briefcase,
  Code2,
  DollarSign,
  UserCheck,
  Globe,
} from "lucide-react";

const ChatBotContact = () => {
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



  const renderMessageWithLinks = (text) => {
    return text;
  };

  return (
    <div className="w-full flex justify-center">
      <div
        className="glass-card w-full max-w-2xl border rounded-2xl overflow-hidden flex flex-col h-[85vh] md:h-[600px] shadow-2xl relative transition-colors duration-300
      bg-white border-gray-200 
      dark:bg-[#050505] dark:border-white/10"
      >
        {/* --- Header --- */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-3 md:p-4 flex items-center gap-3 shadow-lg z-10 shrink-0">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/10 flex items-center justify-center border border-white/20 relative">
            <BrainCircuit className="text-white" size={20} />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-cyan-600 rounded-full"></div>
          </div>
          <div>
            <p className="text-white font-bold text-xs md:text-sm tracking-wide flex items-center gap-2">
              Gopal's AI Agent{" "}
              <Sparkles size={12} className="text-yellow-400" />
            </p>
            <p className="text-cyan-100 text-[10px] md:text-[11px] font-medium opacity-80">
              Powered by Portfolio Data
            </p>
          </div>
        </div>

        {/* --- Chat Body --- */}
        <div
          className="flex-1 overflow-y-auto p-3 md:p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-white/10
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
                className={`max-w-[85%] md:max-w-[80%] p-3 rounded-2xl text-[13px] md:text-[14px] leading-relaxed shadow-sm whitespace-pre-line border
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
                    <div className="mt-3 flex flex-wrap gap-2">
                      {projectOptions.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleSend(opt)}
                          className="px-3 py-2 rounded-lg text-xs transition-all border
                      bg-gray-100 border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600
                      dark:bg-white/5 dark:border-white/10 dark:text-gray-300 dark:hover:bg-cyan-500/20 dark:hover:border-cyan-500 dark:hover:text-cyan-100"
                        >
                          {opt}
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
        {step < 5 ? (
          <div
            className={`p-3 md:p-4 border-t flex gap-2 md:gap-3 shrink-0 transition-colors relative z-20
          bg-white border-gray-200 
          dark:bg-[#0a0a0a] dark:border-white/10 ${(step === 2 || step === 4) && !isTyping ? "opacity-50 pointer-events-none" : ""}`}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping || step === 2 || step === 4}
              placeholder={
                step === 2
                  ? "Select option above..."
                  : step === 4
                  ? "Submitting..."
                  : "Type your message..."
              }
              className="flex-1 rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 transition-all disabled:opacity-50
            bg-gray-100 text-gray-900 border-transparent focus:ring-blue-500 focus:bg-white placeholder:text-gray-400
            dark:bg-white/5 dark:text-white dark:border-white/10 dark:focus:ring-cyan-500 dark:placeholder:text-gray-600"
            />
            <button
              type="button"
              onClick={() => handleSend()}
              disabled={isTyping || !input.trim() || step === 2 || step === 4}
              className="p-3 rounded-xl transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed active:scale-95
            bg-blue-600 hover:bg-blue-700 text-white
            dark:bg-cyan-600 dark:hover:bg-cyan-700"
            >
              <Send size={18} />
            </button>
          </div>
        ) : (
          <div
            className="p-6 text-center border-t shrink-0
          bg-gray-50 border-gray-200 
          dark:bg-[#0a0a0a] dark:border-white/10"
          >
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="text-sm hover:underline flex items-center justify-center gap-2 font-medium
            text-blue-600 dark:text-cyan-400"
            >
              <RefreshCcw size={14} /> Start New Chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBotContact;
