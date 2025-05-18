const express = require('express');
const { sendNotification, getUserNotifications } = require('../controllers/notificationController');

const router = express.Router();

router.post('/', sendNotification);
router.get('/:id/notifications', getUserNotifications);

module.exports = router;