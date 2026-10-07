import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Subscriber from '@/models/Subscriber';
import sendEmail from '@/lib/server/sendEmail';
import { verifyAuth } from '@/lib/server/authMiddleware';

export async function GET(req: Request) {
  try {
    const authError = await verifyAuth(req);
    if (authError) return authError;

    await connectDB();
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
    return NextResponse.json(subscribers, { status: 200 });
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    return NextResponse.json({ message: 'Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const authError = await verifyAuth(req);
    if (authError) return authError;

    await connectDB();
    const body = await req.json();
    const { subject, message, htmlMessage } = body;

    if (!subject || (!message && !htmlMessage)) {
      return NextResponse.json({ message: 'Subject and message are required.' }, { status: 400 });
    }

    const subscribers = await Subscriber.find();
    if (subscribers.length === 0) {
      return NextResponse.json({ message: 'No subscribers to send to.' }, { status: 400 });
    }

    const emailAddresses = subscribers.map(sub => sub.email);
    const bccList = emailAddresses.join(', ');

    await sendEmail({
      to: process.env.EMAIL_FROM || 'hello@gopalshukla.in',
      subject: subject,
      text: message || "Please view the HTML version of this email.",
      html: htmlMessage || `<p>${message}</p>`,
      bcc: bccList
    });

    return NextResponse.json({ message: `Successfully broadcasted to ${subscribers.length} subscribers.` }, { status: 200 });
  } catch (error) {
    console.error('Error in broadcastEmail:', error);
    return NextResponse.json({ message: 'Server error during broadcast.' }, { status: 500 });
  }
}
