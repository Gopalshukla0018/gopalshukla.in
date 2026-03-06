import AdminOTP from '../models/AdminOTP.js';
import sendEmail from '../utils/sendEmail.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const ADMIN_EMAIL = 'hello@gopalshukla.com';
const OTP_DELIVERY_EMAIL = 'hello@gopalshukla.in'; // Same as chatbot notifications - confirmed working

export const requestOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({ message: 'Unauthorized email address' });
    }

    const otp = crypto.randomInt(100000, 999999).toString();
    await AdminOTP.create({ email, otp });

    await sendEmail({
      to: OTP_DELIVERY_EMAIL,
      subject: `🔐 Dashboard Login OTP: ${otp}`,
      text: `Your admin dashboard login code is: ${otp}. It expires in 5 minutes.`,
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

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('[OTP] Email error:', error.message);
    res.status(500).json({ message: 'Server error generating OTP', detail: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({ message: 'Unauthorized email address' });
    }

    const otpRecord = await AdminOTP.findOne({ email, otp }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
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

    res.status(200).json({ token, message: 'Login successful' });
  } catch (error) {
    console.error('Error in verifyOTP:', error);
    res.status(500).json({ message: 'Server error verifying OTP' });
  }
};
