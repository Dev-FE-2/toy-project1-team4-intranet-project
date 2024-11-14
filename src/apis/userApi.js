import { throwResponseError } from '../utils/errorUtile';

async function postUserData(formData) {
	const response = await fetch('http://localhost:3000/api/user/register', {
		method: 'POST',
		cache: 'no-cache',
		body: formData, // 이미자 파일을 갖고 있는 FormData 객체를 직렬화하지 않고 그대로 사용
	});

	if (!response.ok) {
		await throwResponseError({
			response,
			defaultMessage: '회원가입 요청이 실패했습니다.',
		});
	}

	return response.json();
}

async function fetchUserData(userId) {
	const response = await fetch(`http://localhost:3000/api/user/${userId}`);

	if (!response.ok) {
		await throwResponseError({
			response,
			defaultMessage: '사용자의 정보를 가져올 수 없습니다. 다시 시도해 주세요.',
		});
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
		await throwResponseError({
			response,
			defaultMessage: '로그인 요청을 실패했습니다. 다시 시도해 주세요.',
		});
	}

	return response.json();
}

export { postUserData, fetchUserData, loginUser };
