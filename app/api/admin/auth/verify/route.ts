import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import AdminOTP from '@/models/AdminOTP';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, otp } = await req.json();

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    if (email !== ADMIN_EMAIL) {
      return NextResponse.json({ message: 'Unauthorized email address' }, { status: 401 });
    }

    const otpRecord = await AdminOTP.findOne({ email, otp }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return NextResponse.json({ message: 'Invalid or expired OTP' }, { status: 400 });
    }

    await AdminOTP.deleteOne({ _id: otpRecord._id });

    const payload = {
      adminId: 'admin_gopal_shukla',
      role: 'admin',
      email: ADMIN_EMAIL
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || 'gopal_secret_key_123',
      { expiresIn: '12h' }
    );

    return NextResponse.json({ token, message: 'Login successful' }, { status: 200 });
  } catch (error: any) {
    console.error('Error in verifyOTP:', error);
    return NextResponse.json({ message: 'Server error verifying OTP' }, { status: 500 });
  }
}
