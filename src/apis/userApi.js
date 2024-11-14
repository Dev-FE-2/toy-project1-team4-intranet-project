async function postUserData(formData) {
	const response = await fetch('http://localhost:3000/api/user/register', {
		method: 'POST',
		cache: 'no-cache',
		body: formData, // FormData 객체를 직렬화하지 않고 그대로 사용
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

async function loginUser({ email, password }) {
	const response = await fetch(`http://localhost:3000/api/login`, {
		method: 'POST',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (!response.ok) {
		const responseText = await response.text();
		const parsedResponse = JSON.parse(responseText);
		const error = new Error(`로그인 요청을 실패했습니다. 다시 시도해 주세요.`);
		const message = `${error.message} ${parsedResponse.error}`;
		const newError = {
			errorCode: response.status,
			errorMessage: message,
		};

		throw newError;
	}

	return response.json();
}

export { postUserData, fetchUserData, loginUser };
