const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "eric.bernhard53@ethereal.email",
    pass: "FtV5tSAAwhX6EN1qAy"
  }
});

async function processNotification(notification, attempt = 1) {
  try {
    if (notification.type === 'email') {
      await transporter.sendMail({
        from: '"Notifier" <no-reply@example.com>',
        to: notification.recipient || 'user@example.com',
        subject: notification.subject || "Notification",
        text: notification.message
      });
      console.log(`Email sent to ${notification.recipient || 'user@example.com'}`);
    } else if (notification.type === 'sms') {
      console.log(`[MOCK SMS] to ${notification.userId}: ${notification.message}`);
    } else {
      console.log(`[IN-APP] Notification stored.`);
    }
  } catch (error) {
    if (attempt < 3) {
      console.log(`Retrying email... Attempt ${attempt + 1}`);
      setTimeout(() => processNotification(notification, attempt + 1), 2000);
    } else {
      console.error('Failed to send notification:', error);
    }
  }
}

// New function to send notification to a specific email
async function sendEmailTo(email, subject, message) {
  const notification = {
    type: 'email',
    recipient: email,
    subject: subject,
    message: message,
    userId: email
  };
  
  return processNotification(notification);
}

module.exports = { 
  processNotification,
  sendEmailTo 
};