async function postUserData(formData) {
	const response = await fetch('http://localhost:3000/api/user', {
		method: 'POST',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});

	if (!response.ok) {
		const responseText = await response.text();
		const error = new Error(`회원가입 요청에 실패했습니다.`);
		const newError = {
			responseText,
			statusCode: response.status,
			errorMessage: error.message,
		};

		throw newError;
	}

	return response.json();
}

async function fetchUserData(userId) {
	const response = await fetch(`http://localhost:3000/api/user/${userId}`);

	if (!response.ok) {
		const responseText = await response.text();
		const error = new Error(`사용자의 정보를 가져올 수 없습니다. 다시 시도해 주세요.`);
		const newError = {
			responseText,
			statusCode: response.status,
			errorMessage: error.message,
		};

		throw newError;
	}

	return response.json();
}

export { postUserData, fetchUserData };
