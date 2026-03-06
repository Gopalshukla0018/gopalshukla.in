import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gopalshukla');

const BlogSchema = new mongoose.Schema({ likes: Number }, { strict: false });
const Blog = mongoose.model('BlogMigration', BlogSchema, 'blogs');

async function migrate() {
  const blogs = await Blog.find({ likes: { $exists: false } });
  let count = 0;
  for (const b of blogs) {
    b.likes = Math.floor(Math.random() * 11) + 10;
    await b.save();
    count++;
  }
  console.log(`Updated ${count} blogs with random likes between 10-20.`);
  process.exit();
}
migrate();
