import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';

export async function GET(req: Request) {
  try {
    await connectDB();
    const blogs = await Blog.find({ status: { $in: ['Published', 'published', 'Static'] } }).sort({ createdAt: -1 });
    
    let updated = false;
    for (const blog of blogs) {
      if (typeof blog.likes !== 'number') {
        blog.likes = Math.floor(Math.random() * 11) + 10;
        await blog.save();
        updated = true;
      }
    }

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error('Error fetching published blogs:', error);
    return NextResponse.json({ message: 'Server error fetching blogs' }, { status: 500 });
  }
}
