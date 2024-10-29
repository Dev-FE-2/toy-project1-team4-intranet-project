import './style.css';
import { addWorkStatusButtonListener, addModalWorkStatusButtonListener } from './modal.js';

export default class MyPage {
	constructor() {
		// Bind the update time method to the instance
		this.updateCurrentTime = this.updateCurrentTime.bind(this);
		this.intervalId = null; // setInterval ID 저장할 변수
		this.isWorking = false;
	}

	render() {
		const content = `<div id="contents">
			<!-- START : 개별 페이지 작업 PC -->
			<section class="section">
				<div class="modal-box">
					<dialog open class="modal-dialog">
						<div class="work-shift__modal">
							<div class="modal__work">
								<div class="current-time">현재 시각: 08:50</div>
								<div class="modal__underscore"></div>
								<div class="work_message">근무를 시작하시겠습니까?</div>
								<div class="btn-wrap">
									<button class="btn btn--secondary" type="button">취소</button>
									<button class="work-status-btn__modal" type="submit">근무 시작</button>
								</div>
							</div>
						</div>
					</dialog>
				</div>
				<div class="contents-top">
					<h1 class="title-first" id="title-first">Today</h1>
					<br />
					<h2 class="title-second"></h2>
					<br />
				</div>
				<br /><br />
			</section>
			<div class="section-container__middle-bottom__wrap">
				<!-- 마이페이지 두번째 컨테이너 프로필 및 근무시간 -->
				<section class="contents-middle">
					<div class="container-middle__wrap">
						<div class="middle_profile">
							<!-- SVG 아이콘 영역 -->
							<div class="profile__icon">
								<img src="../../../public/avatar.svg" alt="Profile Icon" />
							</div>

							<!-- 텍스트와 상태 영역 -->
							<div class="profile__info">
								<!-- 상태 표시 -->
								<div class="profile__status">
									<span class="status-circle work-status"></span>
									<!-- 파란색/빨간색 원 -->
									<span class="status-text">근무중</span>
									<!-- 근무중 또는 부재중 -->
								</div>
								<div class="profile__info__child">
									<div class="profile-name">김직원</div>
									<div class="profile-position">프론트엔드 개발자</div>
								</div>
							</div>
						</div>
						<!-- 미들 컨텐츠 left 프로필 영역 종료  -->
						<div class="container-middle__center-right__wrap">
							<!-- 이번주 근무시간 타이머 영역-->
							<div class="weekly-work-timer">
								<div class="weekly-work-time">
									<div class="clock-icon">🕓</div>
									<div class="description">이번 주 근무 시간</div>
									<div class="hours">32시간</div>
								</div>
								<div class="work-progress">
									<!-- 원 그리기 -->
									<div class="work-time__chart">
										<span class="center"></span>
									</div>
								</div>
							</div>
							<!-- 근무 시작 종료 버튼 영역 -->
							<div class="contents-middle__third">
								<!-- 마지막 근무 종료 버튼 영역 -->
								<div class="work-time-container">
									<div class="mypage-work-times">
										<div class="work-time-start">
											<span class="work-status-text">근무 시작</span>
											<span class="work-time">-</span>
										</div>
										<div class="work-time-end">
											<span class="work-status-text">근무 종료</span>
											<span class="work-time">-</span>
										</div>
									</div>
									<div class="mypage-work-status-btn">
										<div class="btn-wrap">
											<button class="work-status-btn" type="submit">근무 시작</button>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- 마이페이지 미들 컨테이너 내부 div 종료 -->
					</div>
				</section>
				<!-- 마이페이지 마지막 컨테이너 근태신청 목록 -->
				<section class="contents-bottom">
					<div class="attendance__title">
						<h2 class="page-title">Attendance State</h2>
						<button class="view-all">View all</button>
					</div>
					<div class="attendance-list__wrap">
						<ul class="attendance-list-container">
							<li class="attendance-item">
								<div class="attendance-item__to-third">
									<div class="attendance-img">
										<img src="../../../public/avatar.svg" alt="Icon" />
									</div>
									<div class="date-time">
										<div class="day">Friday</div>
										<div class="date">27</div>
									</div>
									<div class="attendance-text">휴가 신청합니다.</div>
								</div>
								<div class="author">박수빈</div>
							</li>
						</ul>
					</div>
				</section>
				<!-- END -->
			</div>
			<!-- END -->
		</div>`;
		document.querySelector('#pageContents').innerHTML = content;

		this.startClock();
		this.checkUrlChange(); // URL 변경 감지 시작
		this.addModalEventListener();

		return content;
	}

	addModalEventListener() {
		// addWorkStatusButtonListener에 최신 상태를 참조할 수 있는 함수와 콜백 전달
		addWorkStatusButtonListener(
			() => this.isWorking, // 최신 상태 참조
			// () => {
			// 	this.isWorking = !this.isWorking; // 상태 전환 true <-> false
			// },
		);

		addModalWorkStatusButtonListener(
			() => this.isWorking,
			() => {
				this.isWorking = !this.isWorking; // 상태 전환 true <-> false
			},
		);
	}
	// 현재 시간을 가져오는 헬퍼 메서드
	getCurrentTime() {
		const now = new Date();
		const options = { hour: '2-digit', minute: '2-digit', hour12: false };
		return now.toLocaleTimeString('ko-KR', options);
	}

	handleWorkStatusToggle() {
		// 현재 근무 상태에 따라 근무 시작 또는 종료 상태를 전환
		const workStartTimeElement = document.querySelector('.work-time-start .work-time');
		const workEndTimeElement = document.querySelector('.work-time-end .work-time');
		const workStatusButton = document.querySelector('.work-status-btn');

		if (this.isWorking) {
			// 근무 종료 상태로 전환
			workEndTimeElement.textContent = this.updateCurrentTime(); // 현재 시간 표시
			workStatusButton.textContent = '근무 시작'; // 버튼 텍스트 변경
			this.isWorking = false;
		} else {
			// 근무 시작 상태로 전환
			workStartTimeElement.textContent = this.updateCurrentTime(); // 현재 시간 표시
			workEndTimeElement.textContent = '-'; // 종료 시간을 초기화
			workStatusButton.textContent = '근무 종료'; // 버튼 텍스트 변경
			this.isWorking = true;
		}
	}

	// 기존 인터벌Id를 저장하고 컨트롤 할 수 있게 변경
	startClock() {
		this.updateCurrentTime();
		this.intervalId = setInterval(this.updateCurrentTime, 1000); // Interval ID 저장
	}

	updateCurrentTime() {
		const currentTimeElement = document.querySelector('.title-second');
		const now = new Date();
		//Mon 22, 2021

		const options = { hour: '2-digit', minute: '2-digit', hour12: false };
		const day_options = { weekday: 'short', year: 'numeric', month: 'numeric', day: 'numeric' };

		const parts = new Intl.DateTimeFormat('en-US', day_options).formatToParts(now);

		const template = '{weekday} {month}.{day} {year}';

		const formattedDate = template
			.replace('{weekday}', parts.find((part) => part.type === 'weekday').value)
			.replace('{month}', parts.find((part) => part.type === 'month').value)
			.replace('{day}', parts.find((part) => part.type === 'day').value)
			.replace('{year}', parts.find((part) => part.type === 'year').value);

		const formattedTime = now.toLocaleTimeString('ko-KR', options);

		// 현재 시각을 메인 페이지와 모달에 동시에 업데이트
		currentTimeElement.textContent = `${formattedDate} | ${formattedTime}`;

		return formattedTime;
	}

	// URL 변경을 감지하고, 변경 시 clearClock을 호출
	checkUrlChange() {
		const checkInterval = setInterval(() => {
			if (this.currentUrl !== window.location.href) {
				this.stopIntevalTimer(); // URL이 변경되면 clearClock 호출
				clearInterval(checkInterval); // Interval 해제
			}
		}, 1000); // 0.5초마다 URL 변경 체크
	}

	stopIntevalTimer() {
		if (this.intervalId) {
			clearInterval(this.intervalId);
		}
	}
}
