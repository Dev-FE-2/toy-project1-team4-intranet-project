// mypageModal.js

// 근무 상태 토글 핸들러
export function handleWorkStatusToggle(isWorking) {
	const workStartTimeElement = document.querySelector('.work-time-start .work-time');
	const workEndTimeElement = document.querySelector('.work-time-end .work-time');
	const workStatusButton = document.querySelector('.work-status-btn');

	if (!isWorking) {
		// 근무 시작 상태로 전환
		workStartTimeElement.textContent = getCurrentTime(); // 시작 시간 표시
		workEndTimeElement.textContent = '-'; // 종료 시간 초기화
		workStatusButton.textContent = '근무 종료'; // 버튼 텍스트 변경
	} else {
		// 근무 종료 상태로 전환
		workEndTimeElement.textContent = getCurrentTime(); // 종료 시간 표시
		workStatusButton.textContent = '근무 시작'; // 버튼 텍스트 변경
	}
}

// 현재 시간을 가져오는 헬퍼 함수
function getCurrentTime() {
	const now = new Date();
	const options = { hour: '2-digit', minute: '2-digit', hour12: false };
	return now.toLocaleTimeString('ko-KR', options);
}

// 버튼 클릭 이벤트 리스너 추가
export function addWorkStatusButtonListener(getIsWorking, toggleWorkStatusCallback) {
	const workStatusButton = document.querySelector('.work-status-btn');
	workStatusButton.addEventListener('click', () => {
		const currentIsWorking = getIsWorking();
		toggleWorkStatusCallback(); // 상태 전환 함수 호출
		handleWorkStatusToggle(currentIsWorking); // 상태 토글 핸들러 호출
	});
}
