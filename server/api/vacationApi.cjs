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
const path = require('path');
const fs = require('fs');

// 특정 휴가 요청 조회 (SELECT) - 이미지 정보 포함
router.get('/vacation/:requestId', (req, res) => {
  const { requestId } = req.params;
  db.all(`
    SELECT v.*, i.name AS image_name, i.data AS image_data
    FROM vacation v
    LEFT JOIN images i ON v.image_id = i.id
    WHERE v.request_id = ?`, [requestId], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ vacation: rows });
      }
  });
});

// 모든 휴가 요청 조회 (SELECT ALL) - 이미지 정보 포함
router.get('/vacation', (req, res) => {
  db.all(`
    SELECT v.*, i.name AS image_name, i.data AS image_data
    FROM vacation v
    LEFT JOIN images i ON v.image_id = i.id`, [], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ vacations: rows });
      }
  });
});

// 특정 사용자 휴가 요청 조회 (SELECT) - 이미지 정보 포함
router.get('/vacation/user/:userId', (req, res) => {
  const { userId } = req.params;
  db.all(`
    SELECT v.*, i.name AS image_name, i.data AS image_data
    FROM vacation v
    LEFT JOIN images i ON v.image_id = i.id
    WHERE v.user_id = ?`, [userId], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ vacation: rows });
      }
  });
});

// 페이지네이션 휴가 요청 조회 (POST 방식으로 페이지네이션 지원) - 이미지 정보 포함
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
      db.all(`
        SELECT v.*, i.name AS image_name, i.data AS image_data
        FROM vacation v
        LEFT JOIN images i ON v.image_id = i.id
        LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
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

// 이미지 저장 함수와 휴가 요청 추가 함수
function saveImageAndVacation(imagePath, imageName, vacationData, res) {
  db.serialize(() => {
    // 트랜잭션 시작
    db.run("BEGIN TRANSACTION");

    // Step 1: 이미지를 images 테이블에 저장
    fs.readFile(imagePath, (err, imageData) => {
      if (err) {
        res.status(500).json({ error: 'Error reading image file' });
        db.run("ROLLBACK"); // 오류 발생 시 롤백
        return;
      }
      
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
          // 현재 날짜와 시간을 'YYYY-MM-DD HH:MM:SS' 형식으로 가져옴
          const createdDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

          // Step 2: 생성된 image_id를 사용하여 vacation 테이블에 데이터 삽입
          const { vacation_type, username, vacation_title, vacation_content, vacation_start_day, vacation_end_day, user_id } = vacationData;
          db.run(
            `INSERT INTO vacation (vacation_type, username, vacation_title, vacation_content, created_date, vacation_start_day, vacation_end_day, user_id, image_id) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [vacation_type, username, vacation_title, vacation_content, createdDate, vacation_start_day, vacation_end_day, user_id, image_id],
            function (err) {
              if (err) {
                res.status(500).json({ error: 'Error inserting vacation into database' });
                db.run("ROLLBACK"); // 오류 발생 시 롤백
                return;
              }
              
              // 성공적으로 두 테이블에 삽입되었으면 커밋
              db.run("COMMIT", (commitErr) => {
                if (commitErr) {
                  res.status(500).json({ error: 'Error committing transaction' });
                } else {
                  res.json({ request_id: this.lastID });
                }
              });
            }
          );
        }
      );
    });
  });
}

// 휴가 요청 추가 (INSERT) - 이미지 저장 기능 통합
router.post('/vacation', (req, res) => {

  const { vacation_type, username, vacation_title, vacation_content, vacation_start_day, vacation_end_day, user_id } = req.body;
  // 현재 imagePath는 샘플 데이터로 실제 구현 시에 적절한 경로로 설정해야 합니다.
  const imagePath = path.join(__dirname, '..', '..', 'public', 'avatar.svg');
  const imageName = 'test';
  const vacationData = { vacation_type, username, vacation_title, vacation_content, vacation_start_day, vacation_end_day, user_id };
  
  saveImageAndVacation(imagePath, imageName, vacationData, res);
});

module.exports = router;
