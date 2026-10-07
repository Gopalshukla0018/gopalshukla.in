import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import AdminOTP from '@/models/AdminOTP';
import crypto from 'crypto';
import sendEmail from '@/lib/server/sendEmail';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email } = await req.json();

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const OTP_DELIVERY_EMAIL = process.env.OTP_DELIVERY_EMAIL || '';

    if (email !== ADMIN_EMAIL) {
      return NextResponse.json({ message: 'Unauthorized email address' }, { status: 401 });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    await AdminOTP.create({ email, otp });

    await sendEmail({
      to: OTP_DELIVERY_EMAIL,
      subject: `🔐 Dashboard Login OTP: ${otp}`,
      text: `Your admin dashboard login code is: ${otp}. It expires in 5 minutes.`,
      bcc: undefined,
      transport: 'zoho',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">Dashboard Login Alert 🔐</h2>
          <p>Your one-time login code is:</p>
          <div style="font-size: 32px; font-weight: bold; padding: 15px 20px; background: #e5e7eb; border-radius: 8px; letter-spacing: 6px; display: inline-block;">
            ${otp}
          </div>
          <p style="color: #6b7280; font-size: 13px; margin-top: 16px;">Expires in 5 minutes. If not you, ignore this.</p>
        </div>
      `
    });

    return NextResponse.json({ message: 'OTP sent successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('[OTP] Email error:', error.message);
    return NextResponse.json({ message: 'Server error generating OTP', detail: error.message }, { status: 500 });
  }
}
