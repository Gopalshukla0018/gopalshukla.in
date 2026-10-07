import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import { verifyAuth } from '@/lib/server/authMiddleware';

export async function GET(req: Request) {
  try {
    await connectDB();
    const authError = await verifyAuth(req); if (authError) return authError;

    const blogs = await Blog.find().sort({ createdAt: -1 });
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error fetching blogs' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const authError = await verifyAuth(req); if (authError) return authError;

    const body = await req.json();
    const { title, slug, description, coverImageUrl, coverImage, content, status, hasFreebie, resourceName, resourceLink } = body;
    const finalCover = coverImageUrl || coverImage || '';
    
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return NextResponse.json({ message: 'Blog with this slug already exists' }, { status: 400 });
    }

    const newBlog = await Blog.create({ title, slug, description, coverImageUrl: finalCover, content, status, hasFreebie, resourceName, resourceLink });
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error creating blog' }, { status: 500 });
  }
}
