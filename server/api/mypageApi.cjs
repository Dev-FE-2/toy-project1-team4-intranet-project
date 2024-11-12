/**
 *
 * 마이페이지 관련 쿼리는 여기에 작성하겠습니다.
 *
 * users, user_weektime 테이블을 같이 사용하고 userApi.cjs와 비슷한 쿼리가 존재 할 수 있습니다.
 */

const express = require('express');
const db = require('../../database.cjs');
const router = express.Router();

// 근무 시간 추가 및 업데이트
router.post('/work_hours', (req, res) => {
	const {
		user_id,
		work_date,
		weekly_hours,
		start_time,
		end_time,
		attendance_status,
		last_modified,
	} = req.body;

	// 해당 날짜의 근무 기록 조회
	db.get(
		`SELECT * FROM user_work_hours WHERE user_id = ? AND work_date = ?`,
		[user_id, work_date],
		(err, row) => {
			if (err) {
				res.status(500).json({ error: err.message });
				return;
			}

			// 만약 기록이 없다면 INSERT
			if (!row) {
				db.run(
					`INSERT INTO user_work_hours (user_id, work_date, weekly_hours, start_time, end_time, attendance_status, last_modified)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
					[
						user_id,
						work_date,
						weekly_hours,
						start_time,
						end_time,
						attendance_status,
						last_modified,
					],
					function (err) {
						if (err) {
							res.status(500).json({ error: err.message });
						} else {
							res.json({ id: this.lastID, message: 'Work hours added.' });
						}
					},
				);
			} else {
				// 기록이 이미 존재하는 경우, 주간 근무 시간을 업데이트 (분 단위 누적)
				const updatedWeeklyHours = row.weekly_hours + weekly_hours; // 기존 주간 근무 시간에 추가
				db.run(
					`UPDATE user_work_hours SET weekly_hours = ?, start_time = ?, end_time = ?, attendance_status = ?, last_modified = ?
                 WHERE user_id = ? AND work_date = ?`,
					[
						updatedWeeklyHours,
						start_time,
						end_time,
						attendance_status,
						last_modified,
						user_id,
						work_date,
					],
					function (err) {
						if (err) {
							res.status(500).json({ error: err.message });
						} else {
							res.json({ message: 'Work hours updated.' });
						}
					},
				);
			}
		},
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
		},
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
