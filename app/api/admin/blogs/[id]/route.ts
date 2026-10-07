import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import { verifyAuth } from '@/lib/server/authMiddleware';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const authError = await verifyAuth(req); if (authError) return authError;

    const body = await req.json();
    const { title, slug, description, coverImageUrl, coverImage, content, status, hasFreebie, resourceName, resourceLink } = body;
    const finalCover = coverImageUrl || coverImage || '';

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, slug, description, coverImageUrl: finalCover, content, status, hasFreebie, resourceName, resourceLink },
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error updating blog' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const authError = await verifyAuth(req); if (authError) return authError;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json({ message: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error deleting blog' }, { status: 500 });
  }
}
