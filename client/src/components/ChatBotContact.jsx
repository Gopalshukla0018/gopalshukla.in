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
      text: "Hello! 👋 I'm Gopal's AI Assistant.\n\nYou can tap the topics below to learn about my work, or just chat with me directly! First, may I know your name?",
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

  

  const quickTopics = [
    {
      id: "stack",
      label: "🛠️ Tech Stack",
      icon: <Code2 size={14} />,
      keywords: ["tech stack", "technologies", "skills", "react", "node"],
      answer:
        "🚀 **Tech Stack:**\n• **Frontend:** React.js, Next.js, Tailwind, Framer Motion\n• **Backend:** Node.js, Express, Hono\n• **DB:** MongoDB, PostgreSQL\n• **DevOps:** Docker, VPS, CloudPanel",
    },
    {
      id: "projects",
      label: "📂 Projects",
      icon: <Briefcase size={14} />,
      keywords: ["projects", "portfolio", "work", "built", "case study"],
      answer:
        "📂 **Key Projects:**\n1. **TravelGrowIndia** (Leads Marketplace)\n2. **Skills Mittra** (LMS with Payments)\n3. **AI Lead Gen Chatbot** (This one!)\n\nCheck code: https://github.com/gopalshukla0018/",
    },
    {
      id: "experience",
      label: "💼 Experience",
      icon: <UserCheck size={14} />,
      keywords: ["experience", "background", "history", "years", "work"],
      answer:
        "💼 **Experience:**\nGopal is currently the **Tech Lead at TravelGrowIndia**,managing automation systems. Previously, he was a Frontend Intern at Huguen. He focuses on shipping production-ready code, not just counting years.",
    },
    {
      id: "pricing",
      label: "💰 Pricing",
      icon: <DollarSign size={14} />,
      keywords: ["price", "cost", "charge", "rate", "money", "budget", "quote"],
      answer:
        "💰 **Pricing:**\nRates depend on complexity. A landing page is cheaper than a SaaS. If you complete this chat, Gopal will send you a **Free Quote** tailored to your needs.",
    },
    {
      id: "hire",
      label: "🔥 Why Hire?",
      icon: <Sparkles size={14} />,
      keywords: ["hire", "job", "resume", "cv", "why hire"],
      answer:
        "🔥 **Why Hire Gopal?**\nUnlike average devs, Gopal builds **Business Assets**. He understands Sales, ROI, and Automation. He doesn't just write code; he solves expensive problems.",
    },
    {
      id: "socials",
      label: "🌐 Socials",
      icon: <Globe size={14} />,
      keywords: [
        "socials",
        "contact",
        "github",
        "linkedin",
        "youtube",
        "insta",
      ],
      answer:
        "🌐 **Connect with Gopal:**\n• LinkedIn: https://www.linkedin.com/in/gopalshukla0018/\n• GitHub: https://github.com/gopalshukla0018/\n• YouTube: https://www.youtube.com/@gopalshukla0018",
    },
  ];

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

  // ---  SMART LOGIC ---

  const handleSmallTalk = (text) => {
    if (/\b(thank|thx|thanks)\b/i.test(text))
      return "You're welcome! Let's continue. 😊";
    if (/\b(bye|goodbye)\b/i.test(text))
      return "Goodbye! Hope to connect soon. 👋";
    if (/\b(hi|hello|hey|greetings)\b/i.test(text))
      return "Hello again! How can I help? 🚀";
    return null;
  };

  const findAnswer = (text) => {
    const lowerText = text.toLowerCase();
    const match = quickTopics.find(
      (topic) =>
        topic.keywords.some((k) => lowerText.includes(k)) ||
        lowerText.includes(topic.label.toLowerCase()),
    );
    return match ? match.answer : null;
  };

  const isGibberish = (text) => {
    const uniqueChars = new Set(text).size;
    if (text.length > 6 && uniqueChars < 3) return true;
    if (/^[b-df-hj-np-tv-z]+$/i.test(text) && text.length > 5) return true;
    return false;
  };

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
      let shouldNudge = false;
      let nextStep = step;

      // 1. Check Knowledge Base
      const kbAnswer = findAnswer(currentInput);

      if (kbAnswer) {
        replyText = kbAnswer;
        shouldNudge = true;
      } else if (isGibberish(currentInput)) {
        replyText = "I didn't quite catch that. Could you type clearly? 😅";
      } else if (handleSmallTalk(currentInput)) {
        replyText = handleSmallTalk(currentInput);
      } else {
        // 2. Form Logic
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
              "Got it! ✅ What brings you here today? (Select an option or ask a question)";
            nextStep = 2;
          }
        } else if (step === 2) {
          // Project Type
          setLeadData((prev) => ({ ...prev, subject: currentInput }));
          replyText =
            "Excellent. Could you describe your project or requirement in a few words?";
          nextStep = 3;
        } else if (step === 3) {
          // Description & Submit
          if (currentInput.length < 5) {
            replyText =
              "Please provide a bit more detail so Gopal can understand your needs.";
          } else {
            //  API CALL RESTORED HERE
            const fullChatHistory = [
              ...messages,
              { role: "user", text: currentInput },
            ];

            try {
              const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ...leadData,
                  message: currentInput,
                  chatHistory: fullChatHistory,
                }),
              });

              if (response.ok) {
                replyText =
                  "All done! 🎉 Your message is sent. Gopal will reply shortly via email.";
                nextStep = 4;
              } else {
                throw new Error("Failed to send");
              }
            } catch (e) {
              console.error(e);
              replyText =
                "⚠️ Error sending message. Please email directly: hello@gopalshukla.in";
              // Note: We don't advance step on error so they can try again or copy info
            }
          }
        }
      }

      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: replyText,
          isOptions: nextStep === 2 && !kbAnswer,
        },
      ]);
      setStep(nextStep);

      // Nudge logic
      if (shouldNudge && nextStep < 4) {
        setTimeout(() => {
          const prompts = [
            "Anyway, may I know your name to proceed?",
            "So, what is the best Email to reach you?",
            "Back to business—what kind of project is this?",
            "Could you add more details about your request?",
          ];
          setMessages((prev) => [
            ...prev,
            { role: "bot", text: prompts[step] },
          ]);
        }, 2000);
      }
    }, thinkingTime);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const projectOptions = [
    "Build a SaaS",
    "Website Dev",
    "Automation",
    "Hiring / Job",
    "General Inquiry",
    "Youtube Collab",
  ];

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

        {/* --- QUICK ACTIONS SYSTEM (Horizontal Scroll) --- */}
        <AnimatePresence>
          {step < 4 && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="px-3 pb-2 flex gap-2 overflow-x-auto scrollbar-hide mask-fade shrink-0"
            >
              {quickTopics.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => handleSend(topic.label)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full text-[11px] md:text-[12px] font-medium transition-all flex items-center gap-1.5 flex-shrink-0 border shadow-sm
                bg-gray-100 text-gray-600 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200
                dark:bg-white/5 dark:text-gray-400 dark:border-white/10 dark:hover:text-cyan-300 dark:hover:border-cyan-500/50 dark:hover:bg-cyan-500/10"
                >
                  {topic.icon} {topic.label}{" "}
                  <ChevronRight size={10} className="opacity-50" />
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      
        {/* --- Input Area --- */}
        {step < 4 ? (
          <div
            className="p-3 md:p-4 border-t flex gap-2 md:gap-3 shrink-0 transition-colors relative z-20
          bg-white border-gray-200 
          dark:bg-[#0a0a0a] dark:border-white/10"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              // 👇 FIX: Sirf tab disable hoga jab bot soch raha ho (isTyping). Step 2 pe ab open rahega.
              disabled={isTyping}
              placeholder={
                step === 2
                  ? "Select option or type here..."
                  : "Type your message..."
              }
              className="flex-1 rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 transition-all disabled:opacity-50
            bg-gray-100 text-gray-900 border-transparent focus:ring-blue-500 focus:bg-white placeholder:text-gray-400
            dark:bg-white/5 dark:text-white dark:border-white/10 dark:focus:ring-cyan-500 dark:placeholder:text-gray-600"
            />
            <button
              type="button"
              onClick={() => handleSend()}
            
              disabled={isTyping || !input.trim()}
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
