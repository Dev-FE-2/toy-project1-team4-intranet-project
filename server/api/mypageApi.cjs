/**
 * 
 * 마이페이지 관련 쿼리는 여기에 작성하겠습니다.
 * 
 * users, user_weektime 테이블을 같이 사용하고 userApi.cjs와 비슷한 쿼리가 존재 할 수 있습니다.
 */


const express = require('express');
const db = require('../../database.cjs'); // 분리된 db 모듈을 불러옴
const router = express.Router();

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

// 마이페이지용 프로필 정보 불러오기
router.get('/mypage/user/:userId', (req, res) => {
    const userId = req.params.userId; // URL의 userId 파라미터 추출
    db.all('SELECT user_id, username, job, profile_image FROM users WHERE user_id = ?', [userId], (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ users: rows });
      }
    });
  });

module.exports = router;
