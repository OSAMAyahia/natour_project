const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });

// Nodemailer
const sendEmail = async (options) => {
  // 1) Create transporter ( service that will send email like "gmail","Mailgun", "mialtrap", sendGrid)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.PORT, // if secure false port = 587, if true port= 465
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, //osamaeldemerdash3@gmail.com
      pass: process.env.PASS_USER, //c1800109
    },
  });

  // 2) Define email options (like from, to, subject, email content)
  const mailOpts = {
    from: 'OSAMA_TOUR_COMPANY <osama@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  // 3) Send email
  await transporter.sendMail(mailOpts);
};

module.exports = sendEmail;