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
const db  = require('../../database.cjs');
const router = express.Router();

// 사용자 프로필 조회 (SELECT)
router.get('/userProfile/:userId', (req, res) => {
  const userId = req.params.userId; // URL의 userId 파라미터 추출
  db.all('SELECT * FROM users WHERE user_id = ?', [userId], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ users: rows });
    }
  });
});

// 사용자 프로필 수정 (UPDATE)  PUT으로 요청해야함 
router.put('/userProfile/:userId', (req, res) => {
  const { userId } = req.params;
  const { username, job, team, phone, email, bio, profile_image } = req.body;
  //const modified_date = new Date().toISOString(); // 수정 날짜

  db.run(
    `UPDATE users 
     SET username = ?, job = ?, team = ?, phone = ?, email = ?, bio = ?, profile_image = ?
     WHERE user_id = ?`,
    [username, job, team, phone, email, bio, profile_image, userId],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'User profile updated successfully' });
      }
    }
  );
});

// 모든 직원 목록 조회 (페이지네이션)
router.post('/userProfile/page', (req, res) => {
  const page = parseInt(req.body.page) || 1; // 페이지 번호, 기본값 1
  const limit = parseInt(req.body.limit) || 10; // 페이지당 항목 수, 기본값 10

  const offset = (page - 1) * limit;

  // 전체 직원 수 조회
  db.get(`SELECT COUNT(*) as count FROM users`, (err, countResult) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const totalUsers = countResult.count; // 전체 직원 수

      // 페이지네이션을 적용하여 직원 목록 조회
      db.all(`SELECT * FROM users LIMIT ? OFFSET ?`, [limit, offset], (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({
            page,               // 현재 페이지 번호
            limit,              // 한 페이지당 항목 수
            totalUsers,         // 전체 직원 수
            totalPages: Math.ceil(totalUsers / limit), // 전체 페이지 수
            users: rows         // 해당 페이지의 직원 목록
          });
        }
      });
    }
  });
});

module.exports = router;
