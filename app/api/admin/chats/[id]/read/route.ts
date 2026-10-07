import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ChatConversation from '@/models/ChatConversation';
import { verifyAuth } from '@/lib/server/authMiddleware';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const authError = await verifyAuth(req); if (authError) return authError;

    const chat = await ChatConversation.findByIdAndUpdate(
      id,
      { status: 'Read' },
      { new: true }
    );

    if (!chat) return NextResponse.json({ message: 'Chat not found' }, { status: 404 });
    
    return NextResponse.json(chat, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error marking chat read' }, { status: 500 });
  }
}
