import nodemailer from 'nodemailer';

const sendTutorCredential = async (email: string, tutorId: string, passCode: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ID,
      to: email,
      subject: 'Tutor Dashboard Access - Your Credentials',
      html: `<!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #1DB954;
            color: #ffffff;
            padding: 10px 0;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }
          .content {
            margin: 20px 0;
            text-align: center;
          }
          .credentials {
            font-size: 18px;
            margin: 20px 0;
          }
          .footer {
            margin: 20px 0;
            text-align: center;
            color: #777;
            font-size: 14px;
          }
          .footer a {
            color: #1DB954;
            text-decoration: none;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Learn Sphere!</h1>
          </div>
          <div class="content">
            <p>Congratulations! You have been successfully accepted as a tutor.</p>
            <p>Use the following credentials to access your tutor dashboard:</p>
            <div class="credentials">
              <p><strong>Tutor ID:</strong> ${tutorId}</p>
              <p><strong>Password:</strong> ${passCode}</p>
            </div>
            <p>Please keep these credentials safe and secure.</p>
          </div>
          <div class="footer">
            <p>If you have any questions, feel free to contact our support team.</p>
            <p>© 2024 Learn Sphere. All rights reserved.</p>
            <p><a href="#">Unsubscribe</a> | <a href="#">Privacy Policy</a></p>
          </div>
        </div>
      </body>
      </html>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Tutor credentials sent to:', info.response);
    
  } catch (error: any) {
    console.error('Error sending email:', error);
  }
};

export default sendTutorCredential;
