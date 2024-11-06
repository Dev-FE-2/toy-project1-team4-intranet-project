async function postUserData({ username, job, team, phone, email, bio, profileImage }) {
	const response = await fetch('http://localhost:3000/api/user', {
		method: 'POST',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username,
			job,
			team,
			phone,
			email,
			bio,
			profile_image: profileImage,
		}),
	});

	if (!response.ok) {
		console.error(`postUserData Error: ${response}`);
		throw new Error(`회원가입 요청에 실패했습니다. 다시 시도해 주세요.`);
	}

	const userData = await response.json();
	console.log('userData', userData);

	return userData;
}

async function fetchUserData(userId) {
	const response = await fetch(`http://localhost:3000/api/user/${userId}`);

	if (!response.ok) {
		console.error(`postUserData Error: ${response}`);
		throw new Error(`사용자의 정보를 가져올 수 없습니다. 다시 시도해 주세요.`);
	}

	const userData = await response.json();
	console.log('userData', userData);

	return userData;
}

export { postUserData, fetchUserData };
