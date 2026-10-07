import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ChatConversation from '@/models/ChatConversation';
import { verifyAuth } from '@/lib/server/authMiddleware';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const authError = await verifyAuth(req); if (authError) return authError;

    const chat = await ChatConversation.findById(id);
    if (!chat) return NextResponse.json({ message: 'Chat not found' }, { status: 404 });
    
    return NextResponse.json(chat, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error fetching chat' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const authError = await verifyAuth(req); if (authError) return authError;

    const deletedChat = await ChatConversation.findByIdAndDelete(id);
    if (!deletedChat) return NextResponse.json({ message: 'Chat not found' }, { status: 404 });

    return NextResponse.json({ message: 'Chat deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error deleting chat' }, { status: 500 });
  }
}
