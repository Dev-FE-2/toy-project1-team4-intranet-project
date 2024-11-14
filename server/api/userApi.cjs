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
const multer = require('multer');

// Multer 설정: 메모리에 저장하도록 구성
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 공통 설정 값 분리
// 현재 날짜와 시간을 'YYYY-MM-DD HH:MM:SS' 형식으로 변환
const createdDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

// 이미지가 실제 업로드 되는건 아래 코드를 참고해야하며 해당 코드에는 imagePath와 imageName이
// 디폴트 값으로 들어가 있습니다.
// 사용자 프로필 추가 (INSERT) - 이미지가 있을 경우 image 테이블에 추가 후 users 테이블에 삽입
router.post('/user', (req, res) => {
	const { username, job, team, phone, email, bio } = req.body;

	const imagePath = path.join(__dirname, '..', '..', 'public', 'avatar.svg'); // 이미지 경로 (예시: avatar.svg)
	const imageName = 'avatar.svg'; // 이미지 파일명

	db.serialize(() => {
		db.run('BEGIN TRANSACTION');

		// Step 1: 새로운 이미지가 있을 경우 images 테이블에 추가
		if (imagePath && imageName) {
			fs.readFile(imagePath, (err, imageData) => {
				if (err) {
					res.status(500).json({ error: 'Error reading image file' });
					db.run('ROLLBACK');
					return;
				}

				// images 테이블에 이미지 데이터 삽입
				db.run(
					`INSERT INTO images (name, data) VALUES (?, ?)`,
					[imageName, imageData],
					function (err) {
						if (err) {
							res.status(500).json({ error: 'Error inserting image into database' });
							db.run('ROLLBACK');
							return;
						}

						const image_id = this.lastID; // 삽입된 이미지의 ID

						// Step 2: users 테이블에 새로운 프로필 데이터 추가
						db.run(
							`INSERT INTO users (username, job, team, phone, email, bio, image_id, created_date) 
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
							[username, job, team, phone, email, bio, image_id, createdDate],
							function (err) {
								if (err) {
									res.status(500).json({ error: err.message });
									db.run('ROLLBACK');
								} else {
									db.run('COMMIT', (commitErr) => {
										if (commitErr) {
											res.status(500).json({ error: 'Error committing transaction' });
										} else {
											res.json({ message: 'User profile added successfully' });
										}
									});
								}
							},
						);
					},
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
						db.run('ROLLBACK');
					} else {
						db.run('COMMIT', (commitErr) => {
							if (commitErr) {
								res.status(500).json({ error: 'Error committing transaction' });
							} else {
								res.json({ message: 'User profile added successfully without image' });
							}
						});
					}
				},
			);
		}
	});
});

// 사용자 프로필 조회 (SELECT) - JOIN을 사용해 image 데이터도 함께 조회
router.get('/user/:userId', (req, res) => {
	const userId = req.params.userId;

	db.get(
		`SELECT u.user_id, u.username, u.job, u.team, u.phone, u.email, u.bio, u.created_date, 
            i.data as profile_image_data 
     FROM users u
     LEFT JOIN images i ON u.image_id = i.id
     WHERE u.user_id = ?`,
		[userId],
		(err, row) => {
			if (err) {
				return res.status(500).json({ error: err.message });
			}

			if (row) {
				// 이미지 데이터가 있을 경우 base64로 인코딩하여 클라이언트로 전달
				if (row.profile_image_data) {
					row.profile_image_url = `data:image/png;base64,${row.profile_image_data.toString('base64')}`;
					delete row.profile_image_data; // raw 데이터 삭제
				} else {
					row.profile_image_url = '/default-avatar.png'; // 기본 이미지 URL
				}

				res.json(row); // 사용자 정보와 이미지 URL 반환
			} else {
				res.status(404).json({ error: 'User not found' });
			}
		},
	);
});

// 사용자 프로필 이미지 업로드 (메모리 저장 방식)
router.post('/user/upload-profile-image', upload.single('profileImage'), (req, res) => {
	const userId = req.body.user_id;
	const profileImage = req.file;

	if (!profileImage) {
		return res.status(400).json({ error: 'No image file uploaded' });
	}

	// 프로필 이미지 데이터가 메모리에 저장되어 있으므로 `profileImage.buffer`에서 데이터를 읽어올 수 있습니다.
	const imageData = profileImage.buffer;

	// 데이터베이스에 이미지 데이터를 저장하는 작업
	db.serialize(() => {
		db.run('BEGIN TRANSACTION');

		// Step 1: images 테이블에 이미지 데이터 삽입
		db.run(
			`INSERT INTO images (name, data) VALUES (?, ?)`,
			[profileImage.originalname, imageData],
			function (err) {
				if (err) {
					db.run('ROLLBACK');
					return res.status(500).json({ error: 'Error inserting image into database' });
				}

				const imageId = this.lastID;

				// Step 2: users 테이블의 image_id 업데이트
				db.run(
					`UPDATE users SET image_id = ? WHERE user_id = ?`,
					[imageId, userId],
					function (err) {
						if (err) {
							db.run('ROLLBACK');
							return res.status(500).json({ error: 'Error updating user profile image' });
						}

						// 성공 시 커밋하고 이미지 URL과 함께 응답 전송
						db.run('COMMIT', (commitErr) => {
							if (commitErr) {
								res.status(500).json({ error: 'Error committing transaction' });
							} else {
								// 이미지 데이터를 base64로 인코딩하여 응답으로 전송
								const base64Image = `data:image/png;base64,${imageData.toString('base64')}`;
								res.json({ message: 'Profile image updated successfully', imageUrl: base64Image });
							}
						});
					},
				);
			},
		);
	});
});

// 회원가입 (이미지 업로드와 함께)
router.post('/user/register', upload.single('profileImage'), (req, res) => {
	const { email, password, passwordConfirm, username, phone, job, team, bio } = req.body;
	const profileImage = req.file;

	if (!email || !password || !passwordConfirm || !username || !phone || !job || !team) {
		return res
			.status(400)
			.json({ error: `이메일, 비밀번호, 이름, 전화번호, 직무, 소속은 필수 값 입니다.` });
	}

	db.serialize(() => {
		db.run('BEGIN TRANSACTION');

		// Step 1: 이미지 없이 사용자 정보만 추가
		if (!profileImage) {
			db.run(
				`INSERT INTO users (email, password, password_confirm, username, phone, bio, job, team, created_date) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
				[email, password, passwordConfirm, username, phone, bio, job, team, createdDate],
				function (err) {
					if (err) {
						console.error('Database error:', err.message);

						db.run('ROLLBACK');
						return res.status(500).json({ error: 'Error inserting user into database' });
					}

					const userId = this.lastID; // 자동 생성된 user_id

					db.run('COMMIT', (commitErr) => {
						if (commitErr) {
							res.status(500).json({ error: 'Error committing transaction' });
						} else {
							res.json({
								user_id: this.userId,
								message: 'User registered successfully without profile image',
							});
						}
					});
				},
			);
		} else {
			// Step 2: 이미지가 있는 경우 images 테이블에 추가
			const imageData = profileImage.buffer;

			db.run(
				`INSERT INTO images (name, data) VALUES (?, ?)`,
				[profileImage.originalname, imageData],
				function (err) {
					if (err) {
						db.run('ROLLBACK');
						return res.status(500).json({ error: 'Error inserting image into database' });
					}

					const imageId = this.lastID;

					// Step 3: users 테이블에 사용자 정보 삽입
					db.run(
						`INSERT INTO users (email, password, password_confirm, username, phone, bio, job, team, created_date, image_id) 
						VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
						[
							email,
							password,
							passwordConfirm,
							username,
							phone,
							bio,
							job,
							team,
							createdDate,
							imageId,
						],
						function (err) {
							if (err) {
								db.run('ROLLBACK');
								return res.status(500).json({ error: 'Error inserting user into database' });
							}

							db.run('COMMIT', (commitErr) => {
								if (commitErr) {
									res.status(500).json({ error: 'Error committing transaction' });
								} else {
									const base64Image = `data:image/png;base64,${imageData.toString('base64')}`;
									res.json({
										user_id: this.userId,
										message: 'User registered successfully with profile image',
										imageUrl: base64Image,
									});
								}
							});
						},
					);
				},
			);
		}
	});
});

// 로그인
router.post('/login', (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ error: `이메일 주소와 비밀번호는 필수 값 입니다.` });
	}

	db.serialize(() => {
		db.get(
			`SELECT 
				*, 
				i.data AS profile_image_data
			FROM 
				users u
			LEFT JOIN 
				images i ON u.image_id = i.id 
			WHERE 
				email = ?`,
			[email],
			(err, row) => {
				if (err) {
					console.error('Database error:', err.message);
					return res.status(500).json({ error: 'Internal server error' });
				}

				if (!row) {
					return res.status(401).json({ error: 'Invalid email or password' });
				}

				// 비밀번호 비교 (해시된 비밀번호와 비교해야 함)
				// 예: bcrypt.compareSync(password, row.password)
				if (password !== row.password) {
					return res.status(401).json({ error: 'Invalid email or password' });
				}

				// 이미지 데이터가 있을 경우 base64로 인코딩하여 클라이언트로 전달
				if (row.profile_image_data) {
					row.profile_image_url = `data:image/png;base64,${row.profile_image_data.toString('base64')}`;
					delete row.profile_image_data; // raw 데이터 삭제
				} else {
					row.profile_image_url = '/default-avatar.png'; // 기본 이미지 URL
				}

				// 성공 시 사용자 정보 반환 (민감한 데이터는 제외)
				res.json({
					message: 'User logged in successfully',
					user_id: row.user_id,
					profile_image_url: row.profile_image_url,
					profile_image_data: row.profile_image_data,
				});
			},
		);
	});
});

module.exports = router;
