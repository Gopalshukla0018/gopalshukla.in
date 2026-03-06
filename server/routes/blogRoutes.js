import express from 'express';
import { getPublishedBlogs, getPublishedBlogBySlug, likeBlog } from '../controllers/blogController.js';

const router = express.Router();

router.get('/', getPublishedBlogs);
router.get('/:slug', getPublishedBlogBySlug);
router.patch('/:id/like', likeBlog);

export default router;
