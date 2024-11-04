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

// 회원가입 시 프로필 정보 입력하기
router.post('/user', (req, res) => {
  const { username, job, team, phone, email, bio, profile_image } = req.body;
  db.run(
    `INSERT INTO users (username, job, team, phone, email, bio, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [username, job, team, phone, email, bio, profile_image],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ user_id: this.lastID });
      }
    }
  );
});

// 프로필 정보 불러오기
router.get('/user/:userId', (req, res) => {
    const userId = req.params.userId; // URL의 userId 파라미터 추출
    db.all('SELECT * FROM users WHERE user_id = ?', [userId], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ users: rows });
      }
    });
  });

module.exports = router;
