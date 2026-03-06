import Message from '../models/Message.js';
import sendEmail from '../utils/sendEmail.js';
import ChatConversation from '../models/ChatConversation.js';
import { contactAutoReply } from '../templates/contactTemplate.js';

export const sendMessage = async (req, res) => {
  try {
   
    const { name, email, subject, message, chatHistory } = req.body;

    if (!name || !email) {
      return res.status(400).json({ success: false, error: 'Please fill all fields' });
    }

    
    let formattedTranscript = `<p>${message}</p>`; // Default fallback
    
    if (chatHistory && Array.isArray(chatHistory) && chatHistory.length > 0) {
      formattedTranscript = chatHistory.map(msg => {
        const role = msg.role === 'bot' ? '🤖 <b>AI Assistant</b>' : '👤 <b>User</b>';
        const color = msg.role === 'bot' ? '#e3f2fd' : '#f5f5f5';
        return `
          <div style="margin-bottom: 10px; padding: 10px; background-color: ${color}; border-radius: 8px; border-left: 4px solid ${msg.role === 'bot' ? '#2196F3' : '#4CAF50'};">
            <div style="font-size: 12px; color: #555; margin-bottom: 4px;">${role}</div>
            <div style="font-size: 14px; color: #000;">${msg.text}</div>
          </div>
        `;
      }).join("");
    }

    const newMessage = await Message.create({ name, email, subject, message });

    //  Admin Email
    await sendEmail({
      to: 'hello@gopalshukla.in',
      subject: `🔥 New Chat Lead: ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nLast Message: ${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Lead Generated 🚀</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          
          <h3 style="color: #444;">💬 Full Chat Transcript:</h3>
          <div style="background-color: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 10px;">
            ${formattedTranscript}
          </div>
        </div>
      `
    });

    // Save Chat Conversation for Admin Dashboard
    if (chatHistory && Array.isArray(chatHistory) && chatHistory.length > 0) {
      await ChatConversation.create({
        sessionId: email, 
        transcript: formattedTranscript
      });
    }

    
    await sendEmail({
      to: email,
      subject: "Thanks for chatting with Gopal's AI!",
      html: contactAutoReply(name, subject)
    });

    res.status(201).json({ success: true, data: newMessage });

  } catch (error) {
    console.error('Contact Error:', error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};