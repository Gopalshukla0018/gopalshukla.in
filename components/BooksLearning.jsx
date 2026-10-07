import { Card, CardContent } from "@/components/ui/card";
import { BookMarked } from "lucide-react";

export default function BooksLearning() {
  const books = [
    {
      title: "Can't Hurt Me",
      author: "David Goggins",
      status: "Read-",
      coverImage: "https://m.media-amazon.com/images/I/81VpFFpZTtL._SY466_.jpg"
    },
    {
      title: "Build Don't Talk",
      author: "Raj Shamani",
      status: "Read",
      coverImage: "https://m.media-amazon.com/images/I/41oDvNmEO3L._SY445_SX342_QL70_FMwebp_.jpg"
    },
    {
      title: "The Richest Man in Babylon",
      author: "George S. Clason",
      status: "Read",
      coverImage: "https://m.media-amazon.com/images/I/51Xgt-ewiRL._SY445_SX342_FMwebp_.jpg"
    },
    {
      title: "Rich Dad Poor Dad",
      author: "Robert T. Kiyosaki",
      status: "Read",
      coverImage: "https://m.media-amazon.com/images/I/41uDWzFbpIL._SY445_SX342_FMwebp_.jpg"
    },
    {
      title: "The Almanack of Naval Ravikant",
      author: "Eric Jorgenson",
      status: "Currently Reading",
      coverImage: "https://m.media-amazon.com/images/I/31PP4h6lu4L._SY445_SX342_FMwebp_.jpg"
    }
  ];

  return (
    <section id="books" className="py-20 relative bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 animate-fade-in-up">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium border border-emerald-500/20 mb-4">
              <BookMarked size={14} />
              <span>Continuous Learning</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
              Books That <span className="gradient-text">Shaped My Thinking</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md md:text-right">
            I believe in lifelong learning. Here are some of the books that have profoundly impacted my mindset and career.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {books.map((book, i) => (
            <Card key={i} className="glass-card border-0 hover:-translate-y-2 transition-all duration-300 group overflow-hidden">
              {book.coverImage ? (
                <div className="aspect-[2/3] w-full relative">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-white/10 mix-blend-overlay border-r border-white/5 z-10"></div>
                </div>
              ) : (
                <div className={`aspect-[2/3] w-full bg-gradient-to-br ${book.coverColor} relative flex items-center justify-center p-6 text-center shadow-inner`}>
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="relative z-10 w-full">
                    <h4 className="font-bold text-white dark:text-white text-lg md:text-xl leading-snug mb-2 font-serif">{book.title}</h4>
                    <p className="text-white/80 dark:text-white/80 text-sm">{book.author}</p>
                  </div>
                  {/* Book spine simulation effect */}
                  <div className="absolute left-0 top-0 bottom-0 w-4 bg-white/10 mix-blend-overlay border-r border-white/5"></div>
                </div>
              )}
              <CardContent className="p-4 bg-secondary/30">
                <span className={`text-xs font-semibold px-2 py-1 rounded-sm ${book.status === 'Currently Reading'
                  ? 'bg-amber-500/20 text-amber-500'
                  : 'bg-emerald-500/20 text-emerald-500'
                  }`}>
                  {book.status}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
