import Blog from '../models/Blog.js';

export const getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: { $in: ['Published', 'published', 'Static'] } }).sort({ createdAt: -1 });
    
    // Auto-initialize likes for older blogs
    for (const blog of blogs) {
      if (typeof blog.likes !== 'number') {
        blog.likes = Math.floor(Math.random() * 11) + 10;
        await blog.save();
      }
    }

    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching published blogs:', error);
    res.status(500).json({ message: 'Server error fetching blogs' });
  }
};

export const getPublishedBlogBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const blog = await Blog.findOne({ slug, status: { $in: ['Published', 'published', 'Static'] } });

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    if (typeof blog.likes !== 'number') {
      blog.likes = Math.floor(Math.random() * 11) + 10;
      await blog.save();
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching published blog by slug:', error);
    res.status(500).json({ message: 'Server error fetching blog' });
  }
};

export const likeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    let blog;
    
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(id);
    } else {
      // Setup tracking mechanism lazily for static/custom template blogs via slug
      blog = await Blog.findOne({ slug: id });
      if (!blog) {
        blog = new Blog({
          title: id,
          slug: id,
          description: 'Static Blog Metric Tracker',
          content: 'N/A',
          status: 'Static',
          likes: 12 // Default starting point based on blogsData
        });
      }
    }
    
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    
    if (typeof blog.likes !== 'number') {
      blog.likes = Math.floor(Math.random() * 11) + 10;
    }
    
    blog.likes += 1;
    await blog.save();
    
    res.status(200).json({ likes: blog.likes });
  } catch (error) {
    console.error('Error liking blog:', error);
    res.status(500).json({ message: 'Server error liking blog' });
  }
};
