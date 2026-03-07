import { MessageSquareQuote, Heart, ThumbsUp, MessageCircle, MoreVertical } from "lucide-react";
import { motion } from "framer-motion";

export default function Testimonials() {
  const comments = [
    { username: "Yogesh_SSC", text: "My fear is gone 😊", style: "tweet" },
    { username: "prashantjadhav6938", text: "Good and practical information. Got the very good information.", style: "youtube" },
    { username: "Techgenie123", text: "Deserves more views and subscribers.", style: "bubble" },
    { username: "Shivangi3245", text: "Bhaiya mere mai kaise BCA course online se kar sakte hu", style: "quote" },
    { username: "Faizkhan", text: "First of all congratulations for your success ✨ I'm currently in 2th year but coding samajh main nahi aarahi.", style: "youtube" },
    { username: "RahulVermaTech", text: "Finally kisi ne BCA ke bare me itna practical guide diya hai. Bahut helpful video.", style: "youtube" },
    { username: "LuckySharma-le8ht", text: "Bilkul sahi kaha 1st year ka to pata hi nahi chala expectations to bilkul hi nahi hai.", style: "quote" },
    { username: "kkrofficial75", text: "Bhai main Bihar se hu main yaha koi local hi college se kar raha hu koi dikkat to nahi hogi na??", style: "tweet" },
    { username: "jibanmndal88", text: "Python sikhenge toh nahi hoga kya 2nd year me please bolo.", style: "bubble" },
    { username: "user--rs.7500", text: "Bro mujhe ek baar puchni hai ki ma BCA specialization karu ya sirf BCA.", style: "tweet" },
    { username: "Tarun Parihari", text: "Bhaiya aapki BCA ki 3 year ki journey pe ek video banao plz.", style: "tweet" },
    { username: "AmanKumar", text: "Bhai aapke videos dekh ke hi maine web development start kiya hai. Thanks for the guidance.", style: "quote" },
    { username: "SandeepLearning", text: "Honestly aapka channel BCA students ke liye gold hai. Clear aur honest advice dete ho.", style: "tweet" },
    { username: "RitikaSharma", text: "Bhaiya aapki videos dekh ke clarity milti hai career ke bare me. Please aise hi videos banate rahiye.", style: "youtube" },
    { username: "MADMAXFF_69", text: "Tx bhai ❤️", style: "bubble" }
  ];

  return (
    <section id="testimonials" className="py-24 relative bg-secondary/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-sm font-medium border border-amber-500/20 mb-4">
            <MessageSquareQuote size={14} />
            <span>Community Proof</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight mb-4">
            Real Comments From <br className="md:hidden" />My <span className="gradient-text">YouTube Community</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            What students are saying about the guidance and content I share.
          </p>
        </div>

        {/* Masonry-like grid using CSS columns for modern layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {comments.map((comment, index) => {
            const isLeft = index % 2 === 0;
            const motionProps = {
              initial: { opacity: 0, x: isLeft ? -100 : 100 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true, margin: "-50px" },
              transition: { duration: 0.5, type: "spring", stiffness: 100, delay: (index % 4) * 0.1 }
            };

            if (comment.style === "youtube") {
              return (
                <motion.div {...motionProps} key={index} className="break-inside-avoid bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-bold shrink-0">
                      {comment.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-foreground">@{comment.username}</span>
                        <span className="text-xs text-muted-foreground">1 month ago</span>
                      </div>
                      <p className="text-foreground/90 text-sm mb-3">
                        {comment.text}
                      </p>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <button className="hover:text-foreground flex items-center gap-1"><ThumbsUp size={14} /> <span className="text-xs">{(Math.random() * 50 + 5).toFixed(0)}</span></button>
                        <button className="hover:text-foreground"><ThumbsUp size={14} className="rotate-180" /></button>
                        <button className="text-xs font-semibold hover:text-foreground">Reply</button>
                        {index % 3 === 0 && <Heart size={14} className="text-red-500 fill-red-500 ml-auto" />}
                      </div>
                    </div>
                    <MoreVertical size={16} className="text-muted-foreground ml-auto shrink-0" />
                  </div>
                </motion.div>
              );
            } else if (comment.style === "tweet") {
              return (
                <motion.div {...motionProps} key={index} className="break-inside-avoid glass-card rounded-2xl p-6 shadow-md hover:-translate-y-1 transition-transform border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-xl">
                      {comment.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground leading-tight">{comment.username}</h4>
                      <p className="text-xs text-muted-foreground">@{comment.username}</p>
                    </div>
                  </div>
                  <p className="text-foreground text-[15px] leading-relaxed mb-4">
                    "{comment.text}"
                  </p>
                  <div className="text-xs text-muted-foreground flex gap-4">
                    <span className="flex items-center gap-1 hover:text-blue-400 cursor-pointer"><MessageCircle size={14} /> 1</span>
                    <span className="flex items-center gap-1 hover:text-green-500 cursor-pointer">
                      <svg viewBox="0 0 24 24" aria-hidden="true" className="w-3 h-3 fill-current"><g><path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path></g></svg> {(Math.random() * 5).toFixed(0)}
                    </span>
                    <span className="flex items-center gap-1 hover:text-red-500 cursor-pointer"><Heart size={14} /> {(Math.random() * 30 + 10).toFixed(0)}</span>
                  </div>
                </motion.div>
              );
            } else if (comment.style === "quote") {
              return (
                <motion.div {...motionProps} key={index} className="break-inside-avoid bg-gradient-to-br from-purple-primary/20 to-blue-primary/20 rounded-2xl p-8 border border-purple-primary/30 relative shadow-lg">
                  <div className="absolute top-4 right-4 text-purple-primary/30">
                    <MessageSquareQuote size={40} />
                  </div>
                  <p className="text-xl font-medium text-foreground italic relative z-10 mb-6 font-serif">
                    "{comment.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-primary to-blue-primary p-0.5">
                      <div className="w-full h-full bg-background rounded-full flex items-center justify-center text-foreground font-bold text-sm">
                        {comment.username.slice(0, 2).toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-foreground text-sm">{comment.username}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        Subscriber <Heart size={10} className="text-red-500 fill-red-500" />
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            } else {
              // Bubble style
              return (
                <motion.div {...motionProps} key={index} className="break-inside-avoid flex gap-4 w-full justify-end my-2">
                  <div className="bg-foreground text-background rounded-2xl rounded-tr-sm p-4 shadow-lg max-w-[85%]">
                    <p className="text-sm font-medium mb-1 opacity-80">{comment.username}</p>
                    <p className="text-[15px]">{comment.text}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-secondary shrink-0 flex items-center justify-center text-foreground font-bold text-xs mt-auto ring-2 ring-border">
                    {comment.username.charAt(0).toUpperCase()}
                  </div>
                </motion.div>
              )
            }
          })}
        </div>
      </div>
    </section>
  );
}
