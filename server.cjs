const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors'); // CORS 설정을 위해 사용
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// SQLite 데이터베이스 연결
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)`);
    db.run(`CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)`);
  }
});

// 예제 API 엔드포인트 - 사용자 데이터 가져오기
app.get('/api/user', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ users: rows });
    }
  });
});

app.get('/api/user/:userId', (req, res) => {
  const userId = req.params.userId; // URL의 userId 파라미터 추출
  db.all('SELECT * FROM users WHERE id = ?', [userId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ users: rows });
    }
  });
});

// 예제 API 엔드포인트 - 사용자 데이터 추가하기
app.post('/api/user', (req, res) => {
  const { name, age } = req.body;
  db.run(`INSERT INTO users (name, age) VALUES (?, ?)`, [name, age], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID });
    }
  });
});

// 예제 API 엔드포인트 - 사용자 데이터 가져오기
app.get('/api/test', (req, res) => {
  db.all('SELECT * FROM test', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ users: rows });
    }
  });
});

// 예제 API 엔드포인트 - 사용자 데이터 추가하기
app.post('/api/test', (req, res) => {
  const { name, age } = req.body;
  db.run(`INSERT INTO test (name, age) VALUES (?, ?)`, [name, age], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ id: this.lastID });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
