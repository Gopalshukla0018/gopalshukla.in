export const orbitleAdminTemplate = (data) => {
  const { name, email, phone, message, intent } = data;
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1e293b; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; background: #ffffff; }
        .header { background: #0f172a; padding: 32px; text-align: center; }
        .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em; }
        .content { padding: 32px; }
        .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; margin-bottom: 16px; }
        .badge-demo { background: #dcfce7; color: #166534; }
        .badge-waitlist { background: #dbeafe; color: #1e40af; }
        .field { margin-bottom: 24px; }
        .label { font-size: 12px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
        .value { font-size: 16px; font-weight: 500; color: #0f172a; }
        .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-top: 8px; font-style: italic; }
        .footer { background: #f1f5f9; padding: 24px; text-align: center; font-size: 12px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Orbitle Lead Dashboard</h1>
        </div>
        <div class="content">
          <div class="badge ${intent === 'demo' ? 'badge-demo' : 'badge-waitlist'}">
            ${intent === 'demo' ? '📞 Demo Requested' : '📋 Waitlist Signup'}
          </div>
          
          <div class="field">
            <div class="label">Full Name</div>
            <div class="value">${name}</div>
          </div>
          
          <div class="field">
            <div class="label">Email Address</div>
            <div class="value"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Phone Number</div>
            <div class="value"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Details / Requirements</div>
            <div class="message-box">${message}</div>
          </div>
        </div>
        <div class="footer">
          &copy; ${new Date().getFullYear()} Orbitle by TriGrowTech. Proprietary Lead Data.
        </div>
      </div>
    </body>
    </html>
  `;
};

export const orbitleUserTemplate = (name, intent) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #334155; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 20px auto; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden; background: #ffffff; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
        .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 32px; text-align: center; }
        .logo { font-size: 28px; font-weight: 800; color: #ffffff; letter-spacing: -1px; margin-bottom: 8px; }
        .header-sub { color: #94a3b8; font-size: 14px; text-transform: uppercase; font-weight: 700; }
        .content { padding: 40px 32px; }
        .greeting { font-size: 20px; font-weight: 700; color: #0f172a; margin-bottom: 16px; }
        .highlight-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 16px; padding: 24px; margin: 24px 0; }
        .highlight-title { font-weight: 700; color: #1e40af; margin-bottom: 8px; display: flex; items-center: center; gap: 8px; }
        .step { margin-bottom: 16px; }
        .step-num { color: #2563eb; font-weight: 800; margin-right: 8px; }
        .footer { background: #f8fafc; padding: 32px; text-align: center; border-top: 1px solid #e2e8f0; }
        .social { margin-top: 16px; }
        .social a { color: #64748b; text-decoration: none; margin: 0 10px; font-size: 13px; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Orbitle</div>
          <div class="header-sub">by TriGrowTech</div>
        </div>
        <div class="content">
          <div class="greeting">Hi ${name}, welcome to the circle! 👋</div>
          <p>Thank you for your interest in Orbitle. Your spot as a <strong>Founding Member</strong> has been successfully reserved.</p>
          
          <div class="highlight-box">
            <div class="highlight-title">🚀 What's next?</div>
            <div class="step"><span class="step-num">01.</span> A dedicated account manager will reach out within 24 hours.</div>
            <div class="step"><span class="step-num">02.</span> ${intent === 'demo' ? 'We will schedule your 30-minute personalized demo.' : 'We will send your early-bird access credentials.'}</div>
            <div class="step"><span class="step-num">03.</span> You will receive your permanent 20% founding member discount code.</div>
          </div>

          <p>Orbitle is designed to move your travel business from spreadsheets to high-performance automation. We can't wait to help you scale.</p>
          
          <p>Best Regards,<br><strong>The Orbitle Team</strong></p>
        </div>
        <div class="footer">
          <p style="font-size: 12px; color: #94a3b8;">&copy; ${new Date().getFullYear()} TriGrowTech Solutions. All rights reserved.</p>
          <div class="social">
            <a href="https://trigrowtech.com">Website</a>
            <a href="mailto:hello@trigrowtech.com">Support</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};
