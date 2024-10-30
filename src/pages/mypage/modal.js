// mypageModal.js

// 근무 상태 토글 핸들러
// 메인 근무 시작-종료 버튼과 모달 근무 시작-종료 버튼이 같은 클래스를 참조하며 상태값으로 구분
// 취소 버튼에 대한 기능은 addModalWorkStatusButtonListener 이벤트 리스너로 위임함
export function handleWorkStatusToggle(isWorking, isFromModal) {
	const workStartTimeElement = document.querySelector('.work-time-start .work-time');
	const workEndTimeElement = document.querySelector('.work-time-end .work-time');
	const workStatusButton = document.querySelector('.work-status-btn');
	const modalCurrentTime = document.querySelector('.modal__work .current-time');
	const modalWorkMessage = document.querySelector('.modal__work .work_message');
	const modalWorkStatusButton = document.querySelector('.modal__work .work-status-btn__modal');
	const workStatusCircle = document.querySelector('.status-circle');
	const workStatusText = document.querySelector('.profile__status .status-text');
	console.log(workStatusCircle);

	// css상태를 불러오는 함수 / 그러나 값 지정은 어려움
	// const modalStatus = getComputedStyle(document.querySelector('.modal-box')).display;

	// 모달 내부에 현재 시간 타이머
	modalCurrentTime.textContent = `현재시간 : ${getCurrentTime()}`;

	// addWorkStatusButtonListener에서 메인의 근무 시작 or 근무 종료 버튼 클릭시 동작
	if (!isWorking && !isFromModal) {
		workEndTimeElement.textContent = '-'; // 종료 시간 초기화
		// 근무 시작 버튼 클릭 시 모달창 생성
		document.querySelector('.modal-box').style.display = 'flex';
	}

	// addModalWorkStatusButtonListener에서 모달의 근무 시작 버튼 클릭시 동작
	else if (!isWorking && isFromModal) {
		// 근무 시작 버튼 클릭 -> 근무 시작 상태로 전환
		workStartTimeElement.textContent = getCurrentTime(); // 시작 시간 표시

		document.querySelector('.modal-box').style.display = 'none';
		workStatusButton.textContent = '근무 종료';
		modalWorkMessage.textContent = '근무를 종료하시겠습니까?';
		modalWorkStatusButton.textContent = '근무 종료';
		workStatusCircle.classList.add('active');
		workStatusText.textContent = '근무중';
	}

	// 메인의 근무 종료 클릭 -> 근무 종료 모달 호출
	else if (isWorking && !isFromModal) {
		document.querySelector('.modal-box').style.display = 'flex';
	}

	// 모달의 근무 종료 클릭 -> 근무 종료 상태로 전환
	else if (isWorking && isFromModal) {
		// 모달 근무 종료 버튼 클릭 후 메인 근무 상태 버튼 비활성화
		workStatusButton.disabled = true;
		workEndTimeElement.textContent = getCurrentTime(); // 종료 시간 표시
		document.querySelector('.modal-box').style.display = 'none';
		workStatusCircle.classList.remove('active');
		workStatusText.textContent = '근무 종료';
		/**
		 * todo -> 날짜 기준을 잡고 특정 시간이 넘어가면 자동 근무종료 및 초기화
		 * 왼쪽 이번주 근무 시간에 반영
		 *
		 * 또한 근무 종료 버튼 클릭 후에도 반영해야함
		 */
	}
}

// 현재 시간을 가져오는 함수
// todo -> 이후 가능하다면 상위 클래스의 update되는 날짜로 가져오기
function getCurrentTime() {
	const now = new Date();
	const options = { hour: '2-digit', minute: '2-digit', hour12: false };

	return now.toLocaleTimeString('ko-KR', options);
}

/**
 *  아래 두 클래스는 단순히 버튼을 클릭하면서 상태값만 변경하는 것으로 역할을 제한하고
 *  최상단 handleWorkStatusToggle 함수에서 DOM 영역에 대한 컨트롤을 수행
 */
// 메인 레이아웃 근무 상태 버튼 클릭 이벤트 리스너 추가
export function addWorkStatusButtonListener(getIsWorking) {
	const workStatusButton = document.querySelector('.work-status-btn');

	workStatusButton.addEventListener('click', () => {
		const currentIsWorking = getIsWorking();
		handleWorkStatusToggle(currentIsWorking, false); // 상태 토글 핸들러 호출
	});
}

// 모달 레이아웃 근무 상태 버튼 클릭 이벤트 리스너 추가
export function addModalWorkStatusButtonListener(getIsWorking, toggleWorkStatusCallback) {
	const modalWorkStatusButton = document.querySelector('.work-status-btn__modal');
	const modalWorkCancleButton = document.querySelector('.work-cancle-btn__modal');

	modalWorkStatusButton.addEventListener('click', () => {
		const currentIsWorking = getIsWorking();

		// 버튼 클릭시마다 isWorking 상태를 true, false로 전환하여 근무상태를 구분함
		toggleWorkStatusCallback(); // 상태 전환 함수 호출
		handleWorkStatusToggle(currentIsWorking, true); // 상태 토글 핸들러 호출
	});

	// 취소 버튼 클릭시 모달 display none
	modalWorkCancleButton.addEventListener('click', () => {
		document.querySelector('.modal-box').style.display = 'none';
	});
}
