import express from 'express';
import { requestOTP, verifyOTP } from '../controllers/adminAuthController.js';
import { 
  getBlogs, createBlog, updateBlog, deleteBlog,
  getChats, getChatById, markChatRead, deleteChat
} from '../controllers/adminController.js';
import adminAuthMiddleware from '../utils/authMiddleware.js';

const router = express.Router();

// Auth Routes (Public to admin trying to login)
router.post('/auth/login', requestOTP);
router.post('/auth/verify', verifyOTP);

// Protected Routes
router.use(adminAuthMiddleware);

// Blog Management
router.get('/blogs', getBlogs);
router.post('/blogs', createBlog);
router.put('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);

// Chat Management
router.get('/chats', getChats);
router.get('/chats/:id', getChatById);
router.put('/chats/:id/read', markChatRead);
router.delete('/chats/:id', deleteChat);

export default router;
