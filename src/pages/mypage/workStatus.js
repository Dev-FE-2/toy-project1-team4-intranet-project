// mypageModal.js

//todo 근무 시작 종료 시에도 db에 해당 날짜 근무 시작 종료시간 저장하고 기존 랜더링 가져오는 부분도 DB로 변경
//todo 휴가 목록등 db에서 가져오는 것으로 변경
//todo 이번주 근무 시간을 랜더시 요일이 월요일일 경우 0시간으로 변경하고 db에도 수정 혹은 테이블에도 주간번호를 추가

// 최대 주간 근무 시간 기준 정의
const MAX_WEEKLY_HOURS = 56;

// 근무 상태 토글 핸들러
// 메인 근무 시작-종료 버튼과 모달 근무 시작-종료 버튼이 같은 클래스를 참조하며 상태값으로 구분
// 취소 버튼에 대한 기능은 addModalWorkStatusButtonListener 이벤트 리스너로 위임함
export function handleWorkStatusToggle(isWorking, isFromModal, user_id) {
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
		// 근무 종료 시점 설정 및 근무 시간 계산
		workEndTimeElement.textContent = getCurrentTime();
		workStatusButton.disabled = true;
		document.querySelector('.modal-box').style.display = 'none';
		workStatusCircle.classList.remove('active');
		const workStartTime = document.querySelector('.work-time-start .work-time').textContent;
		const workEndTime = workEndTimeElement.textContent;

		// 근무 시간 계산 (분 단위)
		const start = new Date(`1970-01-01T${workStartTime}:00`);
		const end = new Date(`1970-01-01T${workEndTime}:00`);
		const workDuration = Math.floor((end - start) / (1000 * 60)); // 분 단위
		// 테스트용 10시간
		//const workDuration = 600; // 분 단위

		// 근무 종료 버튼 클릭에 따라 데이터베이스에 업데이트 후 프로미스 반환
		return updateWorkHoursToDatabase(user_id, workDuration, workStartTime, workEndTime)
			.then(() => {
				console.log('Work hours successfully updated.');
			})
			.catch((error) => {
				console.error('Error updating work hours:', error);
			});
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
export function addModalWorkStatusButtonListener(getIsWorking, toggleWorkStatusCallback, user_id) {
	const modalWorkStatusButton = document.querySelector('.work-status-btn__modal');
	const modalWorkCancleButton = document.querySelector('.work-cancle-btn__modal');

	modalWorkStatusButton.addEventListener('click', () => {
		const currentIsWorking = getIsWorking();

		// 버튼 클릭시마다 isWorking 상태를 true, false로 전환하여 근무상태를 구분함
		toggleWorkStatusCallback(); // 상태 전환 함수 호출
		handleWorkStatusToggle(currentIsWorking, true, user_id); // 상태 토글 핸들러 호출
	});

	// 취소 버튼 클릭시 모달 display none
	modalWorkCancleButton.addEventListener('click', () => {
		document.querySelector('.modal-box').style.display = 'none';
	});
}

// 마이페이지 랜더링시 주간 근무시간을 서버에 요청하고 응답을 받아 페이지에 랜더링
export async function fetchWeeklyWorkHours(userId) {
	try {
		const response = await fetch(`http://localhost:3000/api/work_hours/${userId}`);

		// response.ok가 false일 경우 오류를 던져 catch에서 처리
		if (!response.ok) {
			throw new Error('Failed to fetch work hours');
		}

		const data = await response.json();

		// 주간 근무 시간 합산 (분 단위로 누적된 시간)
		const totalMinutes = data.work_hours.reduce((total, entry) => total + entry.weekly_hours, 0);

		const minutes = totalMinutes % 60;

		// 합산된 시간(분)을 시간 단위로 변환
		const totalHours = (totalMinutes / 60).toFixed(0);

		// 페이지의 .hours 요소에 주간 근무 시간 텍스트 설정
		document.querySelector('.hours').textContent = `${totalHours}시간 ${minutes}분`;

		// .work-time__chart의 스타일을 백분율에 맞게 업데이트
		updateWorkTimeChart(totalHours);

		return totalMinutes;
	} catch (error) {
		console.error('Error fetching weekly work hours:', error);
		return 0; // 오류 발생 시 0 반환
	}
}

// 근무 시간 비율을 반영하여 .work-time__chart의 스타일 업데이트
function updateWorkTimeChart(currentHours) {
	const percentage = (currentHours / MAX_WEEKLY_HOURS) * 100;

	// .work-time__chart의 백분율 적용된 스타일 업데이트
	document.querySelector('.work-time__chart').style.background =
		`conic-gradient(black 0% ${percentage}%, #e3e5eb ${percentage}% 100%)`;
}

// 서버에 근무 시간 데이터를 전송하는 함수
async function updateWorkHoursToDatabase(userId, workDuration, startTime, endTime) {
	const today = new Date().toISOString().split('T')[0];

	try {
		const response = await fetch('http://localhost:3000/api/work_hours', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				user_id: userId,
				work_date: today,
				weekly_hours: workDuration,
				start_time: startTime,
				end_time: endTime,
				attendance_status: '근무 완료',
				last_modified: new Date().toISOString(),
			}),
		});

		if (!response.ok) throw new Error('Failed to update work hours');
		const result = await response.json();
		console.log('Work hours updated:', result);
	} catch (error) {
		console.error('Error updating work hours:', error);
	}
}
