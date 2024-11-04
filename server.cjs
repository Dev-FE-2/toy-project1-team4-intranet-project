const express = require('express');
const cors = require('cors');
const db = require('./database.cjs'); // 분리된 db 모듈을 불러옴
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

function initializeDatabase() {
  db.serialize(() => {
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

    
  });
}

// 데이터베이스 초기화
initializeDatabase();

// userApi 라우터 불러오기
const userRoutes = require('./server/api/userApi.cjs');
app.use('/api', userRoutes); // /api/user 경로로 연결




// // 마이페이지용 - 근무 시간 데이터 추가하기
// app.post('/api/user_work_hours', (req, res) => {
//     const { user_id, work_date, weekly_hours, start_time, end_time, attendance_status, last_modified } = req.body;
  
//     db.run(
//       `INSERT INTO user_work_hours (user_id, work_date, weekly_hours, start_time, end_time, attendance_status, last_modified) 
//        VALUES (?, ?, ?, ?, ?, ?, ?)`,
//       [user_id, work_date, weekly_hours, start_time, end_time, attendance_status, last_modified],
//       function (err) {
//         if (err) {
//           res.status(500).json({ error: err.message });
//         } else {
//           res.json({ id: this.lastID });
//         }
//       }
//     );
//   });

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
