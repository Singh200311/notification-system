const sqlite3 = require('sqlite3').verbose();

function initDB() {
  const db = new sqlite3.Database('notif.db');
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT,
        type TEXT,
        message TEXT,
        timestamp INTEGER
      )
    `);
  });
  return db;
}

module.exports = { initDB };