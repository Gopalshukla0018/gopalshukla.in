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
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
          tls: { rejectUnauthorized: false }
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