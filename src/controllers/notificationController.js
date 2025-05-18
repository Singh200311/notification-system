const { addNotification, fetchNotifications } = require('../models/notificationModel');
const { processNotification } = require('../services/notificationService');

async function sendNotification(req, res) {
  const { userId, type, message } = req.body;
  if (!userId || !type || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const notif = { userId, type, message, timestamp: Date.now() };
  await addNotification(notif);
  await processNotification(notif);

  res.status(202).json({ status: 'queued' });
}

async function getUserNotifications(req, res) {
  const { id } = req.params;
  const notifs = await fetchNotifications(id);
  res.json(notifs);
}

module.exports = { sendNotification, getUserNotifications };