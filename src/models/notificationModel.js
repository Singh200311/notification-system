const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('notif.db');

function addNotification({ userId, type, message, timestamp }) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO notifications (userId, type, message, timestamp) VALUES (?, ?, ?, ?)',
      [userId, type, message, timestamp],
      function (err) {
        if (err) reject(err);
        else resolve();
      }
    );
  });
}

function fetchNotifications(userId) {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM notifications WHERE userId = ?', [userId], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

module.exports = { addNotification, fetchNotifications };