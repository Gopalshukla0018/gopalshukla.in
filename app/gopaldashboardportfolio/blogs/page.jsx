"use client";
import AdminLayout from "../AdminLayout";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit, Plus, Globe, Lock } from "lucide-react";

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    coverImageUrl: "",
    content: "",
    status: "Draft",
    hasFreebie: false,
    resourceName: "",
    resourceLink: ""
  });

  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/admin/blogs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleOpenNew = () => {
    setFormData({ title: "", slug: "", description: "", coverImageUrl: "", content: "", status: "Draft", hasFreebie: false, resourceName: "", resourceLink: "" });
    setCurrentBlog(null);
    setIsEditing(true);
  };

  const handleOpenEdit = (blog) => {
    setFormData({
      title: blog.title,
      slug: blog.slug,
      description: blog.description || "",
      coverImageUrl: blog.coverImageUrl || blog.coverImage || "",
      content: blog.content,
      status: blog.status,
      hasFreebie: blog.hasFreebie || false,
      resourceName: blog.resourceName || "",
      resourceLink: blog.resourceLink || ""
    });
    setCurrentBlog(blog);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setBlogs(blogs.filter(b => b._id !== id));
        toast({ title: "Deleted", description: "Blog deleted successfully." });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Delete failed" });
    }
  };

  const handleTogglePublish = async (blog) => {
    const newStatus = blog.status === "Published" ? "Draft" : "Published";
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`/api/admin/blogs/${blog._id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ ...blog, status: newStatus })
      });
      if (res.ok) {
        const updated = await res.json();
        setBlogs(blogs.map(b => b._id === updated._id ? updated : b));
        toast({ title: "Status Updated", description: `Blog ${newStatus.toLowerCase()}` });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Update failed" });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("adminToken");
      const method = currentBlog ? "PUT" : "POST";
      const url = currentBlog 
        ? `/api/admin/blogs/${currentBlog._id}` 
        : `/api/admin/blogs`;

      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast({ title: "Success", description: "Blog saved successfully." });
        setIsEditing(false);
        fetchBlogs();
      } else {
        toast({ variant: "destructive", title: "Error", description: data.message });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Network error" });
    }
  };

  if (isEditing) {
    return (
      <AdminLayout>
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{currentBlog ? "Edit Blog" : "Create New Blog"}</h2>
            <button 
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-border rounded text-sm hover:bg-secondary"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1">Title</label>
                <input required type="text" className="w-full p-2 bg-background border border-border rounded" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm mb-1">Slug</label>
                <input required type="text" className="w-full p-2 bg-background border border-border rounded" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="my-custom-blog-url" />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1">Blog Description (Summary)</label>
              <textarea 
                required 
                className="w-full p-2 bg-background border border-border rounded text-sm" 
                rows="3"
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Write a brief, catchy summary for the blog card..."
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Cover Image URL (optional)</label>
              <input type="text" className="w-full p-2 bg-background border border-border rounded" value={formData.coverImageUrl} onChange={e => setFormData({...formData, coverImageUrl: e.target.value})} placeholder="https://example.com/image.jpg" />
              {formData.coverImageUrl && (
                <div className="mt-2 h-32 w-48 rounded bg-secondary overflow-hidden border border-border">
                  <img src={formData.coverImageUrl} alt="Cover Preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                </div>
              )}
            </div>

            <div className="bg-secondary/30 p-4 border border-border rounded">
              <label className="flex items-center gap-2 text-sm font-medium mb-4 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border" checked={formData.hasFreebie} onChange={e => setFormData({...formData, hasFreebie: e.target.checked})} />
                Attach Free Resource (Lead Generation)
              </label>

              {formData.hasFreebie && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs mb-1 text-muted-foreground">Resource Name</label>
                    <input type="text" className="w-full p-2 bg-background border border-border rounded" value={formData.resourceName} onChange={e => setFormData({...formData, resourceName: e.target.value})} placeholder="e.g. Next.js Cheatsheet" required={formData.hasFreebie} />
                  </div>
                  <div>
                    <label className="block text-xs mb-1 text-muted-foreground">Resource Link (PDF/Drive)</label>
                    <input type="url" className="w-full p-2 bg-background border border-border rounded" value={formData.resourceLink} onChange={e => setFormData({...formData, resourceLink: e.target.value})} placeholder="https://drive.google.com/..." required={formData.hasFreebie} />
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm mb-1">Content (Raw HTML supported)</label>
              <p className="text-xs text-muted-foreground mb-2">Write full HTML tags like &lt;section&gt;, &lt;h1&gt;, inline styles, etc.</p>
              <textarea 
                required 
                className="w-full p-4 bg-background border border-border rounded font-mono text-sm min-h-[400px]" 
                value={formData.content} 
                onChange={e => setFormData({...formData, content: e.target.value})}
                placeholder="<div className='my-custom-layout'>...</div>"
              />
            </div>
            <div className="flex justify-end pt-4">
              <button type="submit" className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white dark:text-white rounded font-medium">
                Add Blog
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your custom HTML blogs.</p>
        </div>
        <button onClick={handleOpenNew} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white dark:text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus size={18} /> New Blog
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-secondary/50 border-b border-border">
            <tr>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Created Date</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr><td colSpan="4" className="p-4 text-center text-muted-foreground">No blogs found.</td></tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog._id} className="border-b border-border hover:bg-secondary/20">
                  <td className="p-4 font-medium">{blog.title}</td>
                  <td className="p-4">
                    <button 
                      onClick={() => handleTogglePublish(blog)}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${blog.status === 'Published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-orange-500/10 text-orange-500'}`}
                    >
                      {blog.status === 'Published' ? <Globe size={12} /> : <Lock size={12} />}
                      {blog.status}
                    </button>
                  </td>
                  <td className="p-4 text-muted-foreground">{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <button onClick={() => handleOpenEdit(blog)} className="p-2 text-blue-400 hover:bg-blue-400/10 rounded">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(blog._id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
