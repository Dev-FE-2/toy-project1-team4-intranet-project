/**
 * 
 * 마이페이지 관련 쿼리는 여기에 작성하겠습니다.
 * 
 * users, user_weektime 테이블을 같이 사용하고 userApi.cjs와 비슷한 쿼리가 존재 할 수 있습니다.
 */


const express = require('express');
const db  = require('../../database.cjs');
const router = express.Router();

// 근무 시간 추가 (INSERT)
router.post('/work_hours', (req, res) => {
  const { user_id, work_date, weekly_hours, start_time, end_time, attendance_status, last_modified } = req.body;
  db.run(
    `INSERT INTO user_work_hours (user_id, work_date, weekly_hours, start_time, end_time, attendance_status, last_modified) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [user_id, work_date, weekly_hours, start_time, end_time, attendance_status, last_modified],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id: this.lastID });
      }
    }
  );
});

// 특정 날짜의 근무 시간 조회 (SELECT)
router.get('/work_hours/:userId/:workDate', (req, res) => {
  const { userId, workDate } = req.params;
  db.all(
    `SELECT * FROM user_work_hours WHERE user_id = ? AND work_date = ?`,
    [userId, workDate],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ work_hours: rows });
      }
    }
  );
});

// 전체 근무 시간 조회 (SELECT ALL)
router.get('/work_hours/:userId', (req, res) => {
  const { userId } = req.params;
  db.all(`SELECT * FROM user_work_hours WHERE user_id = ?`, [userId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ work_hours: rows });
    }
  });
});

module.exports = router;