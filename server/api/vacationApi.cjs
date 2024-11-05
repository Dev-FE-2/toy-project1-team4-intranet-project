/**
 * 
 * 근태 관련 api 쿼리는 모두 여기 작성됩니다.
 * 로그인한 회원 id에 따라 vacation 테이블에서 해당하는 정보 불러오기
 * 요청한 pageid 페이지네이션에 따라서 해당하는 리스트 불러오기
 * 로그인한 회원 id에 맞는 근태 신청 정보 추가하기
 */


const express = require('express');
const db = require('../../database.cjs');
const router = express.Router();

// 휴가 요청 추가 (INSERT)
router.post('/vacation', (req, res) => {
  const { vacation_type, username, img_src, vacation_title, vacation_content, created_date, vacation_start_day, vacation_end_day, user_id } = req.body;
  db.run(
    `INSERT INTO vacation (vacation_type, username, img_src, vacation_title, vacation_content, created_date, vacation_start_day, vacation_end_day, user_id) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [vacation_type, username, img_src, vacation_title, vacation_content, created_date, vacation_start_day, vacation_end_day, user_id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ request_id: this.lastID });
      }
    }
  );
});

// 특정 휴가 요청 조회 (SELECT)
router.get('/vacation/:requestId', (req, res) => {
  const { requestId } = req.params;
  db.all(`SELECT * FROM vacation WHERE request_id = ?`, [requestId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ vacation: rows });
    }
  });
});

// 모든 휴가 요청 조회 (SELECT ALL)
router.get('/vacation', (req, res) => {
  db.all(`SELECT * FROM vacation`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ vacations: rows });
    }
  });
});

// 특정 사용자 휴가 요청 조회 (SELECT) -> api 주소 위랑 틀림
router.get('/vacation/user/:userId', (req, res) => {
  const { userId } = req.params;
  db.all(`SELECT * FROM vacation WHERE user_id = ?`, [userId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ vacation: rows });
    }
  });
});

// 페이지네이션 휴가 요청 조회 (POST 방식으로 페이지네이션 지원)
router.post('/vacation/page', (req, res) => {
  const page = parseInt(req.body.page) || 1; // 페이지 번호, 기본값은 1
  const limit = parseInt(req.body.limit) || 10; // 페이지당 항목 수, 기본값은 10

  const offset = (page - 1) * limit;

  // 전체 휴가 요청 개수 조회
  db.get(`SELECT COUNT(*) as count FROM vacation`, (err, countResult) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const totalVacations = countResult.count; // 전체 휴가 요청 수

      // 페이지네이션을 적용하여 휴가 요청 조회
      db.all(`SELECT * FROM vacation LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({
            page,               // 현재 페이지 번호
            limit,              // 한 페이지당 항목 수
            totalVacations,     // 전체 휴가 요청 개수
            totalPages: Math.ceil(totalVacations / limit), // 전체 페이지 수
            vacations: rows     // 해당 페이지의 휴가 요청 목록
          });
        }
      });
    }
  });
});

module.exports = router;
