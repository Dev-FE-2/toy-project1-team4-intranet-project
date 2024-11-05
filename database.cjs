// database.cjs
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
    db.run("PRAGMA foreign_keys = ON", (err) => {
      if (err) {
          console.error("Error enabling foreign keys:", err.message);
      } else {
          console.log("Foreign key constraints are enabled.");
      }
});
});

module.exports = db;
