import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    await connectDB();
    const blog = await Blog.findOne({ slug, status: { $in: ['Published', 'published', 'Static'] } });

    if (!blog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    if (typeof blog.likes !== 'number') {
      blog.likes = Math.floor(Math.random() * 11) + 10;
      await blog.save();
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error('Error fetching published blog by slug:', error);
    return NextResponse.json({ message: 'Server error fetching blog' }, { status: 500 });
  }
}
