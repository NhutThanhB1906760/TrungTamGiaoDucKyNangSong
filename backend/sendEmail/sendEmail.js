//*****Send Mail
const nodemailer = require('nodemailer');

// Tạo một transporter cho gửi email
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Tên dịch vụ email
  auth: {
    user: process.env.GMAIL_NAME, // Email của bạn
    pass: process.env.GMAIL_PASS // Mật khẩu của bạn
  }
});

// Cấu hình nội dung email


function sendEmail(mailOptions) {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
module.exports = sendEmail;


