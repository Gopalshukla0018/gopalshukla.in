import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function verifyAuth(req: Request) {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ message: 'No token, authorization denied' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'gopal_secret_key_123') as any;
    if (decoded.role !== 'admin') {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }
    return null; // Null means success
  } catch (error) {
    return NextResponse.json({ message: 'Token is not valid' }, { status: 401 });
  }
}
