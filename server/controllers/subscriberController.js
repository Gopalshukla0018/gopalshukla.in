import Subscriber from '../models/Subscriber.js';
import sendEmail from '../utils/sendEmail.js';

// download resource and become subscriber
export const downloadResource = async (req, res) => {
  const { email, resourceName, resourceLink } = req.body;

  if (!email || !resourceName || !resourceLink) {
    return res.status(400).json({ message: 'Email, resourceName, and resourceLink are required.' });
  }

  try {
    let subscriber = await Subscriber.findOne({ email: email.toLowerCase() });

    if (!subscriber) {
      subscriber = new Subscriber({
        email: email.toLowerCase(),
        downloadedResources: [resourceName]
      });
      await subscriber.save();
    } else {
      if (!subscriber.downloadedResources.includes(resourceName)) {
        subscriber.downloadedResources.push(resourceName);
        await subscriber.save();
      }
    }

    const emailSubject = `Here is your free resource: ${resourceName}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2>Thank you for downloading!</h2>
        <p>Hi there,</p>
        <p>As promised, here is your free copy of <strong>${resourceName}</strong>.</p>
        <p><a href="${resourceLink}" style="display: inline-block; padding: 10px 20px; background-color: #7c3aed; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Download Now</a></p>
        <p>If the button doesn't work, copy and paste this link into your browser:</p>
        <p><a href="${resourceLink}">${resourceLink}</a></p>
        <br/>
        <p>Best regards,</p>
        <p>Gopal Shukla</p>
      </div>
    `;

    await sendEmail({
      to: email, 
      subject: emailSubject, 
      text: `Your resource ${resourceName} is ready to download. Link: ${resourceLink}`, 
      html: emailHtml
    });

    res.status(200).json({ message: 'Success! Resource sent to email.' });
  } catch (error) {
    console.error('Error in downloadResource:', error);
    res.status(500).json({ message: 'Server error while processing download.' });
  }
};

// get all subscribers
export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ subscribedAt: -1 });
    res.status(200).json(subscribers);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// send broadcast email
export const broadcastEmail = async (req, res) => {
  const { subject, message, htmlMessage } = req.body;

  if (!subject || (!message && !htmlMessage)) {
    return res.status(400).json({ message: 'Subject and message are required.' });
  }

  try {
    const subscribers = await Subscriber.find();
    if (subscribers.length === 0) {
      return res.status(400).json({ message: 'No subscribers to send to.' });
    }

    const emailAddresses = subscribers.map(sub => sub.email);

    const bccList = emailAddresses.join(', ');

    await sendEmail({
      to: process.env.EMAIL_FROM || 'hello@gopalshukla.in',
      subject: subject,
      text: message || "Please view the HTML version of this email.",
      html: htmlMessage || `<p>${message}</p>`,
      bcc: bccList
    });

    res.status(200).json({ message: `Successfully broadcasted to ${subscribers.length} subscribers.` });
  } catch (error) {
    console.error('Error in broadcastEmail:', error);
    res.status(500).json({ message: 'Server error during broadcast.' });
  }
};
