import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import orbitleRoutes from './orbitle/index.js';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
const defaultAllowedOrigins = [
  'http://localhost:5173',
  'https://gopalshukla.in',
  'https://www.gopalshukla.in',
  'https://orbitle.trigrowtech.in',
  'https://orbitle-omega.vercel.app',
  'https://orbitle.in',
  'https://www.orbitle.in',
];

const envAllowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
  : [];

const allowedOrigins = new Set([...defaultAllowedOrigins, ...envAllowedOrigins]);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.has(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/subscribers', subscriberRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Online', uptime: process.uptime() });
});
// orbitle
app.use('/api/orbitle', orbitleRoutes);

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});





