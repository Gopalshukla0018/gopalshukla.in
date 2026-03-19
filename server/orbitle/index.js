import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { orbitleAdminTemplate, orbitleUserTemplate } from '../templates/orbitleTemplates.js';

dotenv.config();
const router = express.Router(); // Router use karein

const transporter = nodemailer.createTransport({
    host: 'smtp.zoho.in',
    port: 465,
    secure: true,
    auth: {
        user: process.env.ORBITLE_EMAIL_USER,
        pass: process.env.ORBITLE_EMAIL_PASS,
    },
});

// "api.gopalshukla.in/api/orbitle/test" 
router.get("/test", (req, res) => {
    res.status(200).json({ message: "Orbitle logic is active inside main server!" });
});

// "api.gopalshukla.in/api/orbitle/contact" 
router.post('/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ success: false, message: "Missing fields" });
    }

    try {
        const { intent } = req.body;

        const adminMail = {
            from: `"Orbitle Leads" <${process.env.ORBITLE_EMAIL_USER}>`,
            to: process.env.ORBITLE_ADMIN_RECEIVER_EMAIL,
            subject: `🔥 New Orbitle Lead: ${name}`,
            html: orbitleAdminTemplate({ name, email, phone, message, intent })
        };

        const userMail = {
            from: `"Orbitle by TriGrowTech" <${process.env.ORBITLE_EMAIL_USER}>`,
            to: email,
            subject: "Your Orbitle spot is reserved! 🎉",
            html: orbitleUserTemplate(name, intent)
        };

        await transporter.sendMail(adminMail);
        await transporter.sendMail(userMail);

        res.status(200).json({ success: true, message: "Sent" });
    } catch (error) {
        console.error("SMTP Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router; 