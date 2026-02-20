// client/src/data/blogsData.js

export const blogsData = [
  {
    id: "1",
    slug: "cold-email-hack",
    title:
      "How I Landed My First Internship & Job via LinkedIn DMs & Cold Emails",
    excerpt:
      "Stop applying to black holes. Use this exact 'Cold Email' strategy to get replies from Founders and CTOs.",
    date: "Jan 10, 2025",
    readTime: "5 min read",
    category: "Career Strategy",
    type: "custom-templates", // 🔥 UI component map
    content: {
      detailTitle: "Cold Email Templates That Actually Get Replies",
      detailTitleHighlight: "(For Freshers & Students)",
      updatedAt: "Jan 2025",
      templates: [
        {
          title: "Template 1: LinkedIn Connection Request",
          desc: "LinkedIn gives you 300 characters. Use them smartly.",
          subject: "N/A (Connection Note)",
          body: `Hi [Name], I noticed you're building [Company Name]. I'm a [Your Role] and I've worked on [Brief Project Description]. Would love to connect!\n\nExample:\nHi Amit, I noticed you're building TechFlow. I'm a full-stack developer and I've built an expense tracking app with payment integration. Would love to connect!`,
        },
        {
          title: "Template 2: LinkedIn DM (After They Accept)",
          desc: "Once they accept your request, send this DM within 24 hours.",
          subject: "N/A (Direct Message)",
          body: `Hi [Name], thanks for connecting!\nI saw [Company Name] is hiring for [Role]. Instead of just sending my resume, here's my work:\n\n[Project Name] – [One line what it does] – [Live Link]\n[Project Name] – [One line] – [Live Link]\n\nOpen to a quick 10-min chat?\n\nBest,\n[Your Name]\n\nExample:\nHi Sneha, thanks for connecting!\nI saw DevStack is hiring for a Backend Intern. Instead of just sending my resume, here's my work:\nBlog API – RESTful API with authentication – [yourproject.com]\nReal-time Chat – Built with WebSocket & Node.js – [chatapp.com]\nOpen to a quick 10-min chat?`,
        },
        {
          title: "Template 3: Cold Email for Internship",
          desc: "Use this when you find someone's email (use Hunter.io or Clearbit).",
          subject: "Frontend Developer Intern – [Your Name]",
          body: `Hi [Name],\n\nI'm [Your Name], a final-year [Your Degree] student skilled in [Tech Stack]. I came across [Company Name] and I'm impressed by [What They're Building].\n\nHere's my recent work:\n[Project 1]: [Brief description] – [Live Link]\n[Project 2]: [Brief description] – [Live Link]\n\nI'm looking for an internship starting [Month] and would love to contribute to [Specific Team/Product].\n\nCan we schedule a quick call this week?\n\nBest,\n[Your Name]\n[LinkedIn Profile]\n[Phone Number]`,
        },
        {
          title: "Template 4: Cold Email for Entry-Level Job",
          desc: "For when you have graduated and need a full-time role.",
          subject: "React Developer – Built [Your Best Project Name]",
          body: `Hi [Name],\n\nI'm [Your Name], a recent graduate with [X months] of experience in [Tech Stack]. I saw [Company Name] is working on [Product] and I'm genuinely interested.\n\nHere's what I've built:\n[Project Name]: [What it does] – [Live Link]\n[Project Name]: [What it does] – [GitHub Link]\n\nI'm available to start immediately. Can we chat for 10 minutes this week?\n\nThanks,\n[Your Name]\n[LinkedIn]\n[Phone]`,
        },
        {
          title: "Template 5: Follow-Up Email",
          desc: "If no reply after 4-5 days. This is where the magic happens.",
          subject: "Re: [Original Subject]",
          body: `Hi [Name],\n\nJust following up on my previous email. I'm still very interested in [Company Name] and the [Role] position.\n\nWould love to chat for 10 minutes about how I can help.\n\nBest,\n[Your Name]`,
        },
      ],
    },
  },
  {
    id: "2",
    slug: "js-interview-cheatsheet",
    title: "Coming Soon: JS Interview Cheatsheet",
    excerpt: "The top questions asked in Interview.",
    date: "Coming Soon",
    readTime: "-",
    category: "Tech",
    type: "coming-soon", // Disables routing click for upcoming articles
    content: null,
  },
];
