import AdminLayout from "./AdminLayout";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Circle } from "lucide-react";

export default function ChatMessages() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [filter, setFilter] = useState("All");
  const { toast } = useToast();

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`http://localhost:5000/api/admin/chats?status=${filter}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setChats(data);
      }
    } catch (error) {
      console.error("Error fetching chats");
    }
  };

  useEffect(() => {
    fetchChats();
  }, [filter]);

  const handleSelectChat = async (chat) => {
    setSelectedChat(chat);
    if (chat.status === "Unread") {
      try {
        const token = localStorage.getItem("adminToken");
        await fetch(`http://localhost:5000/api/admin/chats/${chat._id}/read`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` }
        });
        // Update local state without refetching fully
        setChats(chats.map(c => c._id === chat._id ? { ...c, status: "Read" } : c));
        setSelectedChat({ ...chat, status: "Read" });
      } catch (error) {
        console.error("Failed to mark as read");
      }
    }
  };

  const handleDeleteChat = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm("Delete this conversation?")) return;

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`http://localhost:5000/api/admin/chats/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setChats(chats.filter(c => c._id !== id));
        if (selectedChat?._id === id) setSelectedChat(null);
        toast({ title: "Deleted", description: "Chat conversation deleted." });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Failed to delete" });
    }
  };

  return (
    <AdminLayout>
      <div className="h-[calc(100vh-6rem)] flex flex-col md:flex-row gap-4">
        {/* Left Sidebar - Chat List */}
        <div className="w-full md:w-1/3 bg-card border border-border rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border flex justify-between items-center bg-secondary/30">
            <h2 className="font-bold text-lg">Conversations</h2>
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="bg-background border border-border text-sm rounded px-2 py-1 outline-none"
            >
              <option value="All">All</option>
              <option value="Unread">Unread</option>
              <option value="Read">Read</option>
            </select>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {chats.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground text-sm">No conversations found.</div>
            ) : (
              chats.map((chat) => (
                <div 
                  key={chat._id}
                  onClick={() => handleSelectChat(chat)}
                  className={`p-4 border-b border-border hover:bg-secondary cursor-pointer transition-colors flex items-start justify-between ${selectedChat?._id === chat._id ? 'bg-secondary' : ''}`}
                >
                  <div className="flex-1 overflow-hidden pr-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm truncate">{chat.sessionId}</span>
                      {chat.status === "Unread" && <Circle className="w-2 h-2 fill-purple-500 text-purple-500" />}
                    </div>
                    <div className="text-xs text-muted-foreground truncate opacity-70">
                      {new Date(chat.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <button onClick={(e) => handleDeleteChat(chat._id, e)} className="text-muted-foreground hover:text-red-400 p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Panel - Conversation Transcript */}
        <div className="w-full md:w-2/3 bg-card border border-border rounded-xl flex flex-col overflow-hidden">
          {selectedChat ? (
            <>
              <div className="p-4 border-b border-border bg-secondary/30">
                <h2 className="font-bold text-lg">{selectedChat.sessionId}</h2>
                <div className="text-xs text-muted-foreground">Session Transcript</div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 bg-background">
                {/* We render raw HTML transcript saved from the bot email format */}
                <div dangerouslySetInnerHTML={{ __html: selectedChat.transcript }} className="space-y-4" />
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Select a conversation to view transcript
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
