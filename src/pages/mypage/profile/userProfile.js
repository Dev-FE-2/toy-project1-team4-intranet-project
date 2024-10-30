// profile.js
import userProfile from './userProfile.json';

// 특정 user_id에 맞는 유저 정보를 반환하는 함수
function getUserProfile(userId) {
	return userProfile.find((user) => user.user_id === userId);
}

// 유저 정보를 받아 DOM에 업데이트하는 함수
export function renderUserProfile(userId, isWorking) {
	const user = getUserProfile(userId);

	if (isWorking) {
		console.log('일하는중');
	} else {
		console.log('일 X');
	}

	if (user) {
		// HTML 요소 선택
		//const profileIcon = document.querySelector('.profile__icon img');
		const profileName = document.querySelector('.profile-name');
		const profilePosition = document.querySelector('.profile-position');

		// todo 데이터 추가 이후 주석 해제 및 변경
		// 요소 업데이트
		// profileIcon.src = `../../../public/${user['profile-image']}`;
		// profileIcon.alt = `${user['profile-name']}의 프로필 이미지`;
		profileName.textContent = user['profile-name'];
		profilePosition.textContent = user['profile-position'];
	} else {
		console.error('해당 user_id의 유저 정보를 찾을 수 없습니다.');
	}
}
