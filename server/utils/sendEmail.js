import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html, text, bcc }) => {
  try {
    const isGmail = !!process.env.GMAIL_USER;
    
    const transporter = isGmail 
      ? nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASS,
          }
        })
      : nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: parseInt(process.env.EMAIL_PORT) || 465,
          secure: parseInt(process.env.EMAIL_PORT) === 465, // True for 465, false for 587
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
          tls: { rejectUnauthorized: false },
          // JUGAAAD 1: Stop infinite hanging. Fail fast in 10 seconds if blocked.
          connectionTimeout: 10000,
          greetingTimeout: 10000,
          socketTimeout: 10000,
        });

    const mailOptions = {
      from: isGmail ? process.env.GMAIL_USER : process.env.EMAIL_FROM,
      to: to,
      subject: subject,
      text: text,
      html: html,
      bcc: bcc,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Email error:", error);
    throw error;
  }
};

export default sendEmail;