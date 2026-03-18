import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Zoho SMTP Transporter Setup
const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER, // support@trigrowtech.in
        pass: process.env.EMAIL_PASS, // Zoho App Password
    },
});

// Form Submission Endpoint
app.post('/api/orbitle/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !phone) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    try {
        // 1. Admin Alert (Aapko lead milegi)
        const adminMail = {
            from: `"Orbitle Leads" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_RECEIVER_EMAIL, // Jaha lead receive karni hai
            subject: `New Lead: ${name}`,
            html: `
                <h3>New Form Submission</h3>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Phone:</b> ${phone}</p>
                <p><b>Message:</b> ${message || 'No message provided'}</p>
            `
        };

        // 2. User Confirmation (Client ko jayega)
        const userMail = {
            from: `"TrigrowTech Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Thank you for contacting us!",
            html: `<p>Hi ${name},</p><p>We have received your message and will get back to you shortly.</p>`
        };

        await transporter.sendMail(adminMail);
        await transporter.sendMail(userMail);

        res.status(200).json({ success: true, message: "Emails sent successfully" });
    } catch (error) {
        console.error("SMTP Error:", error);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
});

const PORT = process.env.ORBITLE_PORT || 5001;
app.listen(PORT, () => console.log(`Orbitle backend running on port ${PORT}`));