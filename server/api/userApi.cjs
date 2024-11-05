/**
 * 
 * 회원가입 및 로그인 관련 쿼리는 여기에 작성하겠습니다.
 * 
 * 회원가입시 user_id가 반환됩니다.
 * user_id는 users 테이블의 메인 키로서 vacation 테이블, notice 테이블, user_worktime 테이블과 연동되어 작동하며,
 * autoincrement 옵션으로 가입시 숫자 1부터 계속 증가하게되며 다른 공지사항, 근태 등에서 동일한 user_id가 없다면 오류가 나게 됩니다.
 */


const express = require('express');
const db = require('../../database.cjs'); // 분리된 db 모듈을 불러옴
const router = express.Router();
const fs = require('fs');
const path = require('path');

// 사용자 프로필 추가 (INSERT) - 이미지가 있을 경우 image 테이블에 추가 후 users 테이블에 삽입
router.post('/user', (req, res) => {
  const { username, job, team, phone, email, bio } = req.body;
  const imagePath = path.join(__dirname, '..', '..', 'public', 'avatar.svg');  // 이미지 경로 (예시: avatar.svg)
  const imageName = 'avatar.svg';  // 이미지 파일명
  // 현재 날짜와 시간을 'YYYY-MM-DD HH:MM:SS' 형식으로 가져옴
  const createdDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

  db.serialize(() => {
    db.run("BEGIN TRANSACTION");

    // Step 1: 새로운 이미지가 있을 경우 images 테이블에 추가
    if (imagePath && imageName) {
      fs.readFile(imagePath, (err, imageData) => {
        if (err) {
          res.status(500).json({ error: 'Error reading image file' });
          db.run("ROLLBACK");
          return;
        }

        // images 테이블에 이미지 데이터 삽입
        db.run(
          `INSERT INTO images (name, data) VALUES (?, ?)`,
          [imageName, imageData],
          function (err) {
            if (err) {
              res.status(500).json({ error: 'Error inserting image into database' });
              db.run("ROLLBACK");
              return;
            }

            const image_id = this.lastID;  // 삽입된 이미지의 ID

            // Step 2: users 테이블에 새로운 프로필 데이터 추가
            db.run(
              `INSERT INTO users (username, job, team, phone, email, bio, image_id, created_date) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
              [username, job, team, phone, email, bio, image_id, createdDate],
              function (err) {
                if (err) {
                  res.status(500).json({ error: err.message });
                  db.run("ROLLBACK");
                } else {
                  db.run("COMMIT", (commitErr) => {
                    if (commitErr) {
                      res.status(500).json({ error: 'Error committing transaction' });
                    } else {
                      res.json({ message: 'User profile added successfully' });
                    }
                  });
                }
              }
            );
          }
        );
      });
    } else {
      // 이미지 없이 사용자 정보만 추가
      db.run(
        `INSERT INTO users (username, job, team, phone, email, bio, created_date) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [username, job, team, phone, email, bio, createdDate],
        function (err) {
          if (err) {
            res.status(500).json({ error: err.message });
            db.run("ROLLBACK");
          } else {
            db.run("COMMIT", (commitErr) => {
              if (commitErr) {
                res.status(500).json({ error: 'Error committing transaction' });
              } else {
                res.json({ message: 'User profile added successfully without image' });
              }
            });
          }
        }
      );
    }
  });
});

// 사용자 프로필 조회 (SELECT) - JOIN을 사용해 image 데이터도 함께 조회
router.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;

  db.get(
    `SELECT u.user_id, u.username, u.job, u.team, u.phone, u.email, u.bio, u.created_date, 
            i.data AS profile_image 
     FROM users u
     LEFT JOIN images i ON u.image_id = i.id
     WHERE u.user_id = ?`,
    [userId],
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (row) {
        // 이미지가 없을 경우 profile_image를 null 처리하거나 기본 이미지 URL로 변경
        if (!row.profile_image) {
          row.profile_image = null; // 또는 기본 이미지 URL을 삽입할 수 있습니다.
        }

        res.json(row); // 사용자 정보와 이미지 데이터를 반환
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    }
  );
});

module.exports = router;
