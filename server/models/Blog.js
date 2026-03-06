import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
  },
  content: {
    type: String,
    required: true, // Will contain raw HTML
  },
  status: {
    type: String,
    enum: ['Published', 'Draft', 'Unpublished', 'Static'],
    default: 'Draft',
  },
  coverImageUrl: {
    type: String,
    default: ''
  },
  hasFreebie: {
    type: Boolean,
    default: false
  },
  resourceName: {
    type: String,
    default: ''
  },
  resourceLink: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: () => Math.floor(Math.random() * 11) + 10,
  }
});

export default mongoose.model('Blog', BlogSchema);
