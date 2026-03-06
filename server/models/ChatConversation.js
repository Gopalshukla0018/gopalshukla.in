import mongoose from 'mongoose';

const ChatConversationSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
  },
  transcript: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Read', 'Unread'],
    default: 'Unread',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('ChatConversation', ChatConversationSchema);
