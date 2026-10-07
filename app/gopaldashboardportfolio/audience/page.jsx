"use client";
import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { useToast } from "@/hooks/use-toast";
import { Mail, Loader2, Send } from "lucide-react";

export default function AudienceManagement() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const [broadcastData, setBroadcastData] = useState({
    subject: "",
    htmlMessage: ""
  });

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/admin/audience`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSubscribers(data);
      }
    } catch (error) {
      console.error("Error fetching subscribers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleSendBroadcast = async (e) => {
    e.preventDefault();
    if (!broadcastData.subject || !broadcastData.htmlMessage) {
      toast({ variant: "destructive", title: "Error", description: "Subject and message are required." });
      return;
    }

    if (!window.confirm("Are you sure you want to send this broadcast email to all subscribers?")) return;

    try {
      setSending(true);
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/admin/audience`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(broadcastData)
      });
      const data = await res.json();
      
      if (res.ok) {
        toast({ title: "Broadcast Sent", description: data.message });
        setDialogOpen(false);
        setBroadcastData({ subject: "", htmlMessage: "" });
      } else {
        toast({ variant: "destructive", title: "Error", description: data.message });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Network error sending broadcast." });
    } finally {
      setSending(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Audience & Email List</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage subscribers who downloaded resources.</p>
        </div>
        <button 
          onClick={() => setDialogOpen(true)}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white dark:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Mail size={16} /> Send Broadcast
        </button>
      </div>

      {/* Broadcast Dialog Overlay */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-card w-full max-w-2xl border border-border shadow-2xl rounded-xl p-6 relative">
            <h2 className="text-2xl font-bold mb-4">Broadcast Email to {subscribers.length} Subscribers</h2>
            <form onSubmit={handleSendBroadcast} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input 
                  type="text" 
                  required
                  className="w-full p-2 bg-background border border-border rounded focus:ring-2 focus:ring-purple-500 outline-none" 
                  value={broadcastData.subject} 
                  onChange={e => setBroadcastData({...broadcastData, subject: e.target.value})} 
                  placeholder="Amazing new updates!"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message (HTML block / Formatted Text)</label>
                <textarea 
                  required
                  className="w-full p-3 bg-background border border-border rounded min-h-[250px] font-mono text-sm focus:ring-2 focus:ring-purple-500 outline-none" 
                  value={broadcastData.htmlMessage} 
                  onChange={e => setBroadcastData({...broadcastData, htmlMessage: e.target.value})}
                  placeholder="<p>Hi there,</p><br/><p>Here is some great news...</p>"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button 
                  type="button" 
                  onClick={() => setDialogOpen(false)}
                  disabled={sending}
                  className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex items-center gap-2 px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white dark:text-white rounded font-medium transition-colors"
                  disabled={subscribers.length === 0 || !broadcastData.subject || !broadcastData.htmlMessage || sending}
                >
                  {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />} 
                  {sending ? 'Sending...' : 'Send Now'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Subscribers Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden mt-6">
        {loading ? (
          <div className="p-8 flex justify-center text-muted-foreground">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/50 border-b border-border">
              <tr>
                <th className="p-4 font-medium">Email Address</th>
                <th className="p-4 font-medium">Subscribed Date</th>
                <th className="p-4 font-medium">Downloaded Resources</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan="3" className="p-8 text-center text-muted-foreground">
                    No subscribers yet. They will appear here when they download your resources.
                  </td>
                </tr>
              ) : (
                subscribers.map((sub) => (
                  <tr key={sub._id} className="border-b border-border hover:bg-secondary/20">
                    <td className="p-4 font-medium text-foreground">{sub.email}</td>
                    <td className="p-4 text-muted-foreground">
                      {new Date(sub.subscribedAt).toLocaleDateString()}{" at "}
                      {new Date(sub.subscribedAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {sub.downloadedResources && sub.downloadedResources.map((res, i) => (
                          <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {res}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
