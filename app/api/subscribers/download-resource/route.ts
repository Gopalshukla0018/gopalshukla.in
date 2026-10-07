import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Subscriber from '@/models/Subscriber';
import sendEmail from '@/lib/server/sendEmail';

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, resourceName, resourceLink } = body;

    if (!email || !resourceName || !resourceLink) {
      return NextResponse.json({ message: 'Email, resourceName, and resourceLink are required.' }, { status: 400 });
    }

    let subscriber = await Subscriber.findOne({ email: email.toLowerCase() });

    if (!subscriber) {
      subscriber = new Subscriber({
        email: email.toLowerCase(),
        downloadedResources: [resourceName]
      });
      await subscriber.save();
    } else {
      if (!subscriber.downloadedResources.includes(resourceName)) {
        subscriber.downloadedResources.push(resourceName);
        await subscriber.save();
      }
    }

    const emailSubject = `Here is your free resource: ${resourceName}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2>Thank you for downloading!</h2>
        <p>Hi there,</p>
        <p>As promised, here is your free copy of <strong>${resourceName}</strong>.</p>
        <p><a href="${resourceLink}" style="display: inline-block; padding: 10px 20px; background-color: #7c3aed; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Download Now</a></p>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p><a href="${resourceLink}">${resourceLink}</a></p>
        <br/>
        <p>Best regards,</p>
        <p>Gopal Shukla</p>
      </div>
    `;

    await sendEmail({
      to: email, 
      subject: emailSubject, 
      text: `Your resource ${resourceName} is ready to download. Link: ${resourceLink}`, 
      html: emailHtml
    });

    return NextResponse.json({ message: 'Success! Resource sent to email.' }, { status: 200 });
  } catch (error) {
    console.error('Error in downloadResource:', error);
    return NextResponse.json({ message: 'Server error while processing download.' }, { status: 500 });
  }
}
