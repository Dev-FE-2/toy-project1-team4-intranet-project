const express = require('express');
const cors = require('cors');
const db = require('./database.cjs'); // 분리된 db 모듈을 불러옴
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

function initializeDatabase() {
  db.serialize(() => {
    // users 테이블 생성
    db.run(`CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      job TEXT,
      team TEXT,
      phone TEXT,
      email TEXT UNIQUE,
      bio TEXT,
      profile_image TEXT
    )`);

    // notice 테이블 생성
    db.run(`CREATE TABLE IF NOT EXISTS notice (
      notice_id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT,
      writer TEXT,
      image_url TEXT,
      created_date DATE,
      last_modified_date DATETIME,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    )`);

    // vacation 테이블 생성
    db.run(`CREATE TABLE IF NOT EXISTS vacation (
      request_id INTEGER PRIMARY KEY AUTOINCREMENT,
      vacation_type TEXT,
      username TEXT,
      img_src TEXT,
      vacation_title TEXT,
      vacation_content TEXT,
      created_date DATE,
      vacation_start_day DATE,
      vacation_end_day DATE,
      user_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    )`);

    // user_work_hours 테이블 생성
    db.run(`CREATE TABLE IF NOT EXISTS user_work_hours (
      user_id INTEGER NOT NULL,
      work_date DATE NOT NULL,
      weekly_hours REAL,
      start_time TIME,
      end_time TIME,
      attendance_status TEXT,
      last_modified DATETIME,
      PRIMARY KEY (user_id, work_date),
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    )`);
  });
}

// 데이터베이스 초기화
initializeDatabase();

// API 라우터 불러오기
const userRoutes = require('./server/api/userApi.cjs');
const mypageRoutes = require('./server/api/mypageApi.cjs');
const noticeRoutes = require('./server/api/noticeApi.cjs');
const userProfileRoutes = require('./server/api/userProfileApi.cjs');
const vacationRoutes = require('./server/api/vacationApi.cjs');

app.use('/api', userRoutes);
app.use('/api', mypageRoutes);
app.use('/api', noticeRoutes);
app.use('/api', userProfileRoutes);
app.use('/api', vacationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
