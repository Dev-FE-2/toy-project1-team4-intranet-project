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
const fs = require('fs');
const path = require('path');
const multer = require('multer');

// Multer 설정: 메모리에 저장하도록 구성
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 특정 공지사항 조회 (SELECT)
router.get('/notice/:noticeId', (req, res) => {
  const { noticeId } = req.params;

  // notice 테이블과 images 테이블을 조인하여 조회
  const query = `
    SELECT notice.*, images.name AS image_name, images.data AS image_data
    FROM notice
    LEFT JOIN images ON notice.image_id = images.id
    WHERE notice.notice_id = ?`;

  db.all(query, [noticeId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ notice: rows[0] }); // 단일 공지사항 정보 반환
    }
  });
});

// 모든 공지사항 조회 (SELECT ALL)
router.get('/notice', (req, res) => {
  const query = `
    SELECT notice.*, images.name AS image_name, images.data AS image_data
    FROM notice
    LEFT JOIN images ON notice.image_id = images.id`;

  db.all(query, [], (err, rows) => {
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
      const query = `
        SELECT notice.*, images.name AS image_name, images.data AS image_data
        FROM notice
        LEFT JOIN images ON notice.image_id = images.id
        LIMIT ? OFFSET ?`;

      db.all(query, [limit, offset], (err, rows) => {
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

// 이미지와 공지사항 데이터를 저장하는 함수
function saveImageAndNotice(imageData, imageName, noticeData, res) {
  db.serialize(() => {
    // 트랜잭션 시작
    db.run("BEGIN TRANSACTION");

    // Step 1: 이미지를 images 테이블에 저장
    db.run(
      `INSERT INTO images (name, data) VALUES (?, ?)`,
      [imageName, imageData],
      function (err) {
        if (err) {
          res.status(500).json({ error: 'Error inserting image into database' });
          db.run("ROLLBACK"); // 오류 발생 시 롤백
          return;
        }

        const image_id = this.lastID;

        // Step 2: 생성된 image_id를 사용하여 notice 테이블에 데이터 삽입
        const { title, content, writer, created_date, last_modified_date, user_id } = noticeData;
        db.run(
          `INSERT INTO notice (title, content, writer, image_id, created_date, last_modified_date, user_id) 
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [title, content, writer, image_id, created_date, last_modified_date, user_id],
          function (err) {
            if (err) {
              res.status(500).json({ error: 'Error inserting notice into database' });
              db.run("ROLLBACK"); // 오류 발생 시 롤백
              return;
            }
            
            // 성공적으로 두 테이블에 삽입되었으면 커밋
            db.run("COMMIT", (commitErr) => {
              if (commitErr) {
                res.status(500).json({ error: 'Error committing transaction' });
              } else {
                res.json({ notice_id: this.lastID });
              }
            });
          }
        );
      }
    );
  });
}

// 공지사항과 이미지를 동시에 추가하는 라우트
router.post('/notice', upload.single('profileImage'), (req, res) => {
  const { title, content, writer, created_date, last_modified_date, user_id } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'No image file uploaded' });
  }

  const imageData = req.file.buffer; // 메모리에 저장된 이미지 데이터
  const imageName = req.file.originalname; // 이미지 파일명
  const noticeData = { title, content, writer, created_date, last_modified_date, user_id };

  saveImageAndNotice(imageData, imageName, noticeData, res);
});

module.exports = router;
