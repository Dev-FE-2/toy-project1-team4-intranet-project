/**
 * 
 * 공지사항 관련 api 쿼리는 모두 여기 작성됩니다.
 * 
 * 요청한 페이지네이션 데이터에 따라 공지사항 목록 페이지가 나타납니다.
 * 공지사항 클릭 시 notice_id에 따라 공지사항 상세 데이터를 불러옵니다.
 */


const express = require('express');
const db = require('../../database.cjs');
const router = express.Router();

// 공지사항 추가 (INSERT)
router.post('/notice', (req, res) => {
  const { title, content, writer, image_url, created_date, last_modified_date, user_id } = req.body;
  db.run(
    `INSERT INTO notice (title, content, writer, image_url, created_date, last_modified_date, user_id) 
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [title, content, writer, image_url, created_date, last_modified_date, user_id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ notice_id: this.lastID });
      }
    }
  );
});

// 특정 공지사항 조회 (SELECT)
router.get('/notice/:noticeId', (req, res) => {
  const { noticeId } = req.params;
  db.all(`SELECT * FROM notice WHERE notice_id = ?`, [noticeId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ notice: rows });
    }
  });
});

// 모든 공지사항 조회 (SELECT ALL)
router.get('/notice', (req, res) => {
  db.all(`SELECT * FROM notice`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ notices: rows });
    }
  });
});

// 공지사항 목록 조회 (POST 방식으로 페이지네이션 지원)
router.post('/notice/page', (req, res) => {
  const page = parseInt(req.body.page) || 1; // 페이지 번호, 기본값은 1
  const limit = parseInt(req.body.limit) || 10; // 페이지당 항목 수, 기본값은 10

  const offset = (page - 1) * limit;

  // 전체 공지사항 개수 조회
  db.get(`SELECT COUNT(*) as count FROM notice`, (err, countResult) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const totalNotices = countResult.count; // 전체 공지사항 수

      // 페이지네이션을 적용하여 공지사항 조회
      db.all(`SELECT * FROM notice LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({
            page,               // 현재 페이지 번호
            limit,              // 한 페이지당 항목 수
            totalNotices,       // 전체 공지사항 개수
            totalPages: Math.ceil(totalNotices / limit), // 전체 페이지 수
            notices: rows       // 해당 페이지의 공지사항 목록
          });
        }
      });
    }
  });
});

module.exports = router;
