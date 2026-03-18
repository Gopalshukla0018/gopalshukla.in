import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router(); // Router use karein

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Ye route ab "api.gopalshukla.in/api/orbitle/test" par chalega
router.get("/test", (req, res) => {
    res.status(200).json({ message: "Orbitle logic is active inside main server!" });
});

// Ye route ab "api.gopalshukla.in/api/orbitle/contact" par chalega
router.post('/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    try {
        const adminMail = {
            from: `"Orbitle Leads" <${process.env.EMAIL_USER}>`,
            to: process.env.ADMIN_RECEIVER_EMAIL,
            subject: `New Lead: ${name}`,
            html: `<p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${phone}</p><p><b>Message:</b> ${message}</p>`
        };

        const userMail = {
            from: `"Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Confirmation",
            html: `<p>Hi ${name}, we received your message.</p>`
        };

        await transporter.sendMail(adminMail);
        await transporter.sendMail(userMail);

        res.status(200).json({ success: true, message: "Sent" });
    } catch (error) {
        console.error("SMTP Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router; // Router export karein