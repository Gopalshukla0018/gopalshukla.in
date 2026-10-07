import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Message from '@/models/Message';
import ChatConversation from '@/models/ChatConversation';
import sendEmail from '@/lib/server/sendEmail';

// Auto-reply template function
const contactAutoReply = (name: string, subject: string) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2>Hi ${name},</h2>
    <p>Thank you for reaching out regarding <strong>${subject}</strong>.</p>
    <p>I have received your message and will get back to you as soon as possible.</p>
    <br>
    <p>Best regards,</p>
    <p><strong>Gopal Shukla</strong></p>
  </div>
`;

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, subject, message, chatHistory } = body;

    if (!name || !email) {
      return NextResponse.json({ success: false, error: 'Please fill all fields' }, { status: 400 });
    }

    let formattedTranscript = `<p>${message}</p>`;

    if (chatHistory && Array.isArray(chatHistory) && chatHistory.length > 0) {
      formattedTranscript = chatHistory.map(msg => {
        const role = msg.role === 'bot' ? '🤖 <b> Assistant</b>' : '👤 <b>User</b>';
        const color = msg.role === 'bot' ? '#e3f2fd' : '#f5f5f5';
        return `
          <div style="margin-bottom: 10px; padding: 10px; background-color: ${color}; border-radius: 8px; border-left: 4px solid ${msg.role === 'bot' ? '#2196F3' : '#4CAF50'};">
            <div style="font-size: 12px; color: #555; margin-bottom: 4px;">${role}</div>
            <div style="font-size: 14px; color: #000;">${msg.text}</div>
          </div>
        `;
      }).join("");
    }

    const newMessage = await Message.create({ name, email, subject, message });

    // Send Admin Email
    const receivingEmail = process.env.OTP_DELIVERY_EMAIL || 'hello@gopalshukla.in';
    await sendEmail({
      to: receivingEmail,
      subject: `🚀 New Chat Lead: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nLast Message: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Lead Generated 🌟</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          
          <h3 style="color: #444;">💬 Full Chat Transcript:</h3>
          <div style="background-color: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 10px;">
            ${formattedTranscript}
          </div>
        </div>
      `
    });

    if (chatHistory && Array.isArray(chatHistory) && chatHistory.length > 0) {
      await ChatConversation.create({
        sessionId: email,
        transcript: formattedTranscript
      });
    }

    await sendEmail({
      to: email,
      subject: "Thanks for chatting with Gopal's AI!",
      html: contactAutoReply(name, subject)
    });

    return NextResponse.json({ success: true, data: newMessage }, { status: 201 });
  } catch (error) {
    console.error('Contact Error:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
