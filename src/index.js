const express = require('express');
const path = require('path');
const { initDB } = require('./utils/db');
const { sendEmailTo } = require('./services/notificationService');

const app = express();
const port = process.env.PORT || 3000;

// Initialize database
const db = initDB();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// POST endpoint to send an email to any recipient
app.post('/api/notify/email', async (req, res) => {
  try {
    const { email, subject, message } = req.body;
    
    if (!email || !subject || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        required: ['email', 'subject', 'message'] 
      });
    }
    
    await sendEmailTo(email, subject, message);
    
    res.status(200).json({ 
      success: true, 
      message: `Email sent to ${email}` 
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// POST endpoint specifically for Ajit
app.post('/api/notify/ajit', async (req, res) => {
  try {
    const { subject, message } = req.body;
    
    if (!subject || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        required: ['subject', 'message'] 
      });
    }
    
    await sendEmailTo('ajitshah6124@gmail.com', subject, message);
    
    res.status(200).json({ 
      success: true, 
      message: 'Email sent to Ajit' 
    });
  } catch (error) {
    console.error('Error sending email to Ajit:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Open http://localhost:${port} in your browser to use the client`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  if (db) db.close();
  process.exit(0);
});