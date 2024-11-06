const express = require('express');
const cors = require('cors');
const db = require('./database.cjs'); // 분리된 db 모듈을 불러옴
const app = express();
const PORT = 3000;
const path = require('path');
const fs = require('fs');

app.use(cors());
app.use(express.json());

function initializeDatabase() {
  db.serialize(() => {
    // images 테이블 생성
    db.run(`CREATE TABLE IF NOT EXISTS images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      data BLOB
    )`, (err) => {
      if (err) console.error('Error creating images table:', err.message);
    });

    // users 테이블 생성
    db.run(`CREATE TABLE IF NOT EXISTS users (
      user_id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      job TEXT,
      team TEXT,
      phone TEXT,
      email TEXT UNIQUE,
      bio TEXT,
      created_date DATETIME,
      last_modified_date DATETIME,
      image_id INTEGER,  -- image 컬럼을 image_id로 수정
      FOREIGN KEY (image_id) REFERENCES images(id)  -- 외래키 설정
    )`, (err) => {
      if (err) console.error('Error creating users table:', err.message);
    });

    // notice 테이블 생성 (image_id로 외래키 설정)
    db.run(`CREATE TABLE IF NOT EXISTS notice (
      notice_id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT,
      writer TEXT,
      created_date DATETIME,
      last_modified_date DATETIME,
      user_id INTEGER,
      image_id INTEGER,  -- image 컬럼을 image_id로 수정
      FOREIGN KEY (image_id) REFERENCES images(id),  -- 외래키 설정
      FOREIGN KEY (user_id) REFERENCES users(user_id)  -- 외래키 설정
    )`, (err) => {
      if (err) console.error('Error creating notice table:', err.message);
    });

    // vacation 테이블 생성 (image_id로 외래키 설정)
    db.run(`CREATE TABLE IF NOT EXISTS vacation (
      request_id INTEGER PRIMARY KEY AUTOINCREMENT,
      vacation_type TEXT,
      username TEXT,
      vacation_title TEXT,
      vacation_content TEXT,
      created_date DATETIME,
      vacation_start_day DATE,
      vacation_end_day DATE,
      last_modified_date DATETIME,
      user_id INTEGER,
      image_id INTEGER,  -- image 컬럼을 image_id로 수정
      FOREIGN KEY (image_id) REFERENCES images(id),  -- 외래키 설정
      FOREIGN KEY (user_id) REFERENCES users(user_id)  -- 외래키 설정
    )`, (err) => {
      if (err) console.error('Error creating vacation table:', err.message);
    });

    // user_work_hours 테이블 생성
    db.run(`CREATE TABLE IF NOT EXISTS user_work_hours (
      user_id INTEGER NOT NULL,
      work_date DATE NOT NULL,
      weekly_hours REAL,
      start_time DATETIME,
      end_time DATETIME,
      attendance_status TEXT,
      last_modified DATETIME,
      PRIMARY KEY (user_id, work_date),
      FOREIGN KEY (user_id) REFERENCES users(user_id)
    )`, (err) => {
      if (err) console.error('Error creating user_work_hours table:', err.message);
    });

    // 초기 이미지 데이터 추가
    insertInitialImage();
  });
}

// 테스트 이미지 데이터를 DB에 삽입하는 함수
function insertInitialImage() {
  const imagePath = path.join(__dirname, 'public', 'avatar.svg');  // 기본 이미지 파일 경로
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.error('Error reading the image file:', err.message);
      return;
    }

    // 이미지 데이터를 images 테이블에 삽입
    db.run(`INSERT INTO images (name, data) VALUES (?, ?)`, ['avatar.svg', data], function(err) {
      if (err) {
        console.error('Error inserting image into database:', err.message);
      } else {
        console.log('Initial image inserted with id:', this.lastID);
      }
    });
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
