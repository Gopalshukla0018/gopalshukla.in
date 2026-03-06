import express from 'express';
import { downloadResource, getSubscribers, broadcastEmail } from '../controllers/subscriberController.js';
import adminAuthMiddleware from '../utils/authMiddleware.js';

const router = express.Router();

// Public route for downloading resources
router.post('/download-resource', downloadResource);

// Protected routes for admin operations
router.get('/', adminAuthMiddleware, getSubscribers);
router.post('/broadcast', adminAuthMiddleware, broadcastEmail);

export default router;
