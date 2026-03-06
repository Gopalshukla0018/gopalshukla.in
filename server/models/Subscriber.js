import mongoose from 'mongoose';

const SubscriberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  downloadedResources: [{
    type: String
  }]
});

export default mongoose.model('Subscriber', SubscriberSchema);
