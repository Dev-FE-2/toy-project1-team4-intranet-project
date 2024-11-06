/**
 * 
 * 유저 프로필 관련 api 쿼리는 모두 여기 작성됩니다.
 * 
 * 로그인한 회원 id에 따라 users 테이블의 회원 정보를 수정합니다. -> modified_date 컬럼을 추가해야 될 것 같습니다. 요청하시면 반영할게요
 * users 테이블에서 직원 목록을 불러옵니다.
 * 직원 등록 페이지 -> 계속 사용한다고 하면 추가하는 쿼리 작성해 놓을테니 사용하시고 아니면 회원가입 기능으로 대체하겠습니다.
 * 사진 업로드 기능은 데이터를 blob으로 변경해야 하는데 일단은 img src(경로)로 작성해놓고 업로드 기능에 적용하신다고 요청주시면 반영하겠습니다.
 */


const express = require('express');
const fs = require('fs');
const db = require('../../database.cjs');
const router = express.Router();
const path = require('path');

// 사용자 프로필 조회 (SELECT) - JOIN을 사용해 image 데이터도 함께 조회
router.get('/userProfile/:userId', (req, res) => {
  const userId = req.params.userId;
  
  db.get(
    `SELECT u.user_id, u.username, u.job, u.team, u.phone, u.email, u.bio, i.data AS profile_image 
     FROM users u
     LEFT JOIN images i ON u.image_id = i.id
     WHERE u.user_id = ?`,
    [userId],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(row);
      }
    }
  );
});

// 사용자 프로필 수정 (UPDATE) - 이미지 업로드 시 image 테이블에 추가 후 image_id 업데이트
router.put('/userProfile/:userId', (req, res) => {
  const { userId } = req.params;
  const { username, job, team, phone, email, bio } = req.body;
  const imagePath = path.join(__dirname, '..', '..', 'public', 'avatar.svg'); 
  const imageName = 'test';
  // 현재 날짜와 시간을 'YYYY-MM-DD HH:MM:SS' 형식으로 가져옴
  const DateNow = new Date().toISOString().slice(0, 19).replace('T', ' ');
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

        db.run(
          `INSERT INTO images (name, data) VALUES (?, ?)`,
          [imageName, imageData],
          function (err) {
            if (err) {
              res.status(500).json({ error: 'Error inserting image into database' });
              db.run("ROLLBACK");
              return;
            }

            const image_id = this.lastID;

            // Step 2: users 테이블에서 프로필 정보와 image_id를 업데이트
            db.run(
              `UPDATE users 
               SET username = ?, job = ?, team = ?, phone = ?, email = ?, bio = ?, image_id = ?, last_modified_date = ? 
               WHERE user_id = ?`,
              [username, job, team, phone, email, bio, image_id, userId, DateNow],
              function (err) {
                if (err) {
                  res.status(500).json({ error: err.message });
                  db.run("ROLLBACK");
                } else {
                  db.run("COMMIT", (commitErr) => {
                    if (commitErr) {
                      res.status(500).json({ error: 'Error committing transaction' });
                    } else {
                      res.json({ message: 'User profile updated successfully' });
                    }
                  });
                }
              }
            );
          }
        );
      });
    } else {
      // 이미지 없이 사용자 정보만 업데이트
      db.run(
        `UPDATE users 
         SET username = ?, job = ?, team = ?, phone = ?, email = ?, bio = ?, last_modified_date = ? 
         WHERE user_id = ?`,
        [username, job, team, phone, email, bio, userId, DateNow],
        function (err) {
          if (err) {
            res.status(500).json({ error: err.message });
            db.run("ROLLBACK");
          } else {
            db.run("COMMIT", (commitErr) => {
              if (commitErr) {
                res.status(500).json({ error: 'Error committing transaction' });
              } else {
                res.json({ message: 'User profile updated successfully' });
              }
            });
          }
        }
      );
    }
  });
});

// 모든 직원 목록 조회 (페이지네이션) - image 테이블과 JOIN
router.post('/userProfile/page', (req, res) => {
  const page = parseInt(req.body.page) || 1;
  const limit = parseInt(req.body.limit) || 10;
  const offset = (page - 1) * limit;

  db.get(`SELECT COUNT(*) as count FROM users`, (err, countResult) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const totalUsers = countResult.count;

      db.all(
        `SELECT u.user_id, u.username, u.job, u.team, u.phone, u.email, u.bio, u.last_modified_date, 
         i.data AS profile_image 
         FROM users u
         LEFT JOIN images i ON u.image_id = i.id
         LIMIT ? OFFSET ?`,
        [limit, offset],
        (err, rows) => {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            res.json({
              page,
              limit,
              totalUsers,
              totalPages: Math.ceil(totalUsers / limit),
              users: rows
            });
          }
        }
      );
    }
  });
});

module.exports = router;
