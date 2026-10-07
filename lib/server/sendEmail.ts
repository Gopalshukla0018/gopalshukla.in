import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  bcc?: string;
  transport?: 'zoho' | 'gmail';
}

const sendEmail = async ({ to, subject, html, text, bcc, transport = 'zoho' }: EmailOptions) => {
  try {
    const useGmail = transport === 'gmail';

    const transporter = useGmail
      ? nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASS,
          },
        })
      : nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: parseInt(process.env.EMAIL_PORT || '465'),
          secure: parseInt(process.env.EMAIL_PORT || '465') === 465,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
          tls: { rejectUnauthorized: false },
        });

    const mailOptions = {
      from: useGmail ? process.env.GMAIL_USER : process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
      bcc,
    };

    const info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error('Email error:', error);
    throw error;
  }
};

export default sendEmail;
