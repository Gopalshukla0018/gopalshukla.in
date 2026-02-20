export const contactAutoReply = (name, subject) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #334155; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; }
        .header { background-color: #0f172a; padding: 20px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px; }
        .content { padding: 30px 20px; background-color: #ffffff; }
        .message-box { background-color: #f8fafc; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; font-style: italic; color: #475569; }
        .footer { background-color: #f1f5f9; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
        .btn { display: inline-block; padding: 10px 20px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; margin-top: 10px; }
        .signature { margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 20px; }
        .name { font-weight: bold; font-size: 16px; color: #0f172a; }
        .role { color: #64748b; font-size: 14px; margin-bottom: 5px; }
        .social-links a { color: #3b82f6; text-decoration: none; margin-right: 10px; font-size: 13px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>GOPAL SHUKLA</h1>
        </div>
        <div class="content">
          <p>Hello <strong>${name}</strong>,</p>
          
          <p>Thank you for reaching out. This is an automated confirmation that your message has been received and logged in my system.</p>
          
          <div class="message-box">
            "Subject: ${subject}"
          </div>

          <p>I am currently reviewing new inquiries and will personally get back to you within <strong>24 hours</strong>.</p>
          
        

          <a href="https://gopalshukla.in" class="btn">Return to Portfolio</a>

          <div class="signature">
            <div class="name">Gopal Shukla</div>
            <div class="role">Full Stack Engineer | MERN Stack Specialist</div>
            <div class="role" style="font-size: 12px; color: #94a3b8;">Building scalable solutions for the modern web.</div>
            <br>
            <div class="social-links">
              <a href="https://linkedin.com/in/gopalshukla">LinkedIn</a> |
              <a href="https://github.com/gopalshukla0018">GitHub</a> |
              <a href="https://gopalshukla.in">Website</a>
            </div>
          </div>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Gopal Shukla. All rights reserved.<br>
          Farrukhabad, Uttar Pradesh, India.
        </div>
      </div>
    </body>
    </html>
  `;
};
