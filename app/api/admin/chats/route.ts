import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import ChatConversation from '@/models/ChatConversation';
import { verifyAuth } from '@/lib/server/authMiddleware';

export async function GET(req: Request) {
  try {
    const authError = await verifyAuth(req);
    if (authError) return authError;

    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    
    let query: any = {};
    if (status && status !== 'All') {
      query.status = status;
    }

    const chats = await ChatConversation.find(query).sort({ createdAt: -1 });
    return NextResponse.json(chats, { status: 200 });
  } catch (error) {
    console.error('Error fetching chats:', error);
    return NextResponse.json({ message: 'Server error fetching chats' }, { status: 500 });
  }
}
