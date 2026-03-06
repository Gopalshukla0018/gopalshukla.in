import Blog from '../models/Blog.js';
import ChatConversation from '../models/ChatConversation.js';

// --- BLOG MANAGEMENT ---

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Server error fetching blogs' });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, slug, description, coverImageUrl, coverImage, content, status, hasFreebie, resourceName, resourceLink } = req.body;
    const finalCover = coverImageUrl || coverImage || '';
    
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({ message: 'Blog with this slug already exists' });
    }

    const newBlog = await Blog.create({ title, slug, description, coverImageUrl: finalCover, content, status, hasFreebie, resourceName, resourceLink });
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Server error creating blog' });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, description, coverImageUrl, coverImage, content, status, hasFreebie, resourceName, resourceLink } = req.body;
    const finalCover = coverImageUrl || coverImage || '';

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, slug, description, coverImageUrl: finalCover, content, status, hasFreebie, resourceName, resourceLink },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Server error updating blog' });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ message: 'Server error deleting blog' });
  }
};

// --- CHAT MESSAGES MANAGEMENT ---

export const getChats = async (req, res) => {
  try {
    const { status } = req.query; // 'All', 'Read', 'Unread'
    let query = {};
    if (status && status !== 'All') {
      query.status = status;
    }

    const chats = await ChatConversation.find(query).sort({ createdAt: -1 });
    res.status(200).json(chats);
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ message: 'Server error fetching chats' });
  }
};

export const getChatById = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await ChatConversation.findById(id);

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error('Error fetching chat:', error);
    res.status(500).json({ message: 'Server error fetching chat' });
  }
};

export const markChatRead = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await ChatConversation.findByIdAndUpdate(
      id,
      { status: 'Read' },
      { new: true }
    );

    if (!chat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error('Error marking chat read:', error);
    res.status(500).json({ message: 'Server error marking chat read' });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChat = await ChatConversation.findByIdAndDelete(id);

    if (!deletedChat) {
      return res.status(404).json({ message: 'Chat not found' });
    }

    res.status(200).json({ message: 'Chat deleted successfully' });
  } catch (error) {
    console.error('Error deleting chat:', error);
    res.status(500).json({ message: 'Server error deleting chat' });
  }
};
