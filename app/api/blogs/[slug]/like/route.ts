import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    await connectDB();
    let blog;
    
    if (slug.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await Blog.findById(slug);
    } else {
      blog = await Blog.findOne({ slug });
      if (!blog) {
        blog = new Blog({
          title: slug,
          slug: slug,
          description: 'Static Blog Metric Tracker',
          content: 'N/A',
          status: 'Static',
          likes: 12
        });
      }
    }
    
    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }
    
    if (typeof blog.likes !== 'number') {
      blog.likes = Math.floor(Math.random() * 11) + 10;
    }
    
    blog.likes += 1;
    await blog.save();
    
    return NextResponse.json({ likes: blog.likes }, { status: 200 });
  } catch (error) {
    console.error('Error liking blog:', error);
    return NextResponse.json({ message: 'Server error liking blog' }, { status: 500 });
  }
}
