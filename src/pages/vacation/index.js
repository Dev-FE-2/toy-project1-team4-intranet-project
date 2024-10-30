import VacationListItem from './components/VacationListItem';
import './style.css';
import VacationApplyModal from './VacationApplyModal';
import VacationHistoryModal from './VacationHistoryModal';

export default class VacationPage {
	constructor(contents) {
		this.contentsElement = contents;
		this.applyModalEl = new VacationApplyModal();
		this.historyModalEl = new VacationHistoryModal();
		this.template = `
            <section class="contents vacation">
                <div class="vacation__page-title-wrapper">
                    <h1 class="page-title">근태 신청</h1>
                </div>

                <div class="vacation__btn-wrapper">
                    <button id="openHistoryModalBtn" class="btn btn--highlight">나의 근태</button>
                    <button data-button="register" class="btn btn--primary">근태 신청</button>
                </div>

                <div class="vacation__list-wrapper">
                    <ul class="vacation__list-nav">
                        <li class="vacation__nav-item active">연차</li>
                        <li class="vacation__nav-item">반차</li>
                        <li class="vacation__nav-item">조퇴</li>
                        <li class="vacation__nav-item">기차</li>
                    </ul>

                    <div class="vacation__content-wrapper">
                        <ul class="vacation__list-main">
                            <li class="vacation__main-item">
                                <div class="vacation__main-item--profile">
                                    <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 122 121"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clip-path="url(#clip0_98_11527)">
                                            <ellipse cx="61" cy="60.5" rx="61" ry="60.5" fill="#DAE3EA" />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M72.6189 48.9762C72.6189 55.3431 67.4193 60.5 60.9998 60.5C54.5803 60.5 49.3808 55.3431 49.3808 48.9762C49.3808 42.6093 54.5803 37.4524 60.9998 37.4524C67.4193 37.4524 72.6189 42.6093 72.6189 48.9762ZM37.7617 77.7857C37.7617 70.1224 53.2441 66.2619 60.9998 66.2619C68.7555 66.2619 84.2379 70.1224 84.2379 77.7857V80.6667C84.2379 82.2512 82.9308 83.5476 81.3331 83.5476H40.6665C39.0689 83.5476 37.7617 82.2512 37.7617 80.6667V77.7857Z"
                                                fill="#94A3B1"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_98_11527">
                                                <rect width="122" height="121" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <div class="vacation__main-item--date">
                                    <span class="day">Friday</span>
                                    <span class="date">27</span>
                                </div>
                                <div class="vacation__main-item--desc">
                                    <span>휴가 신청합니다</span>
                                </div>
                                <div class="vacation__main-item--during">
                                    <span class="during--start">2024-02-09</span>
                                    <span> ~ </span>
                                    <span class="during--end">2024-02-29</span>
                                </div>
                                <div class="vacation__main-item--author">
                                    <span>패스트</span>
                                </div>
                            </li>
                        </ul>

                        <div class="vacation__list-btn">
                            <div class="vacation__btn--before-wrapper">
                                <div class="vacation__btn--before--first">&lt;</div>
                                <div class="vacation__btn--before">&lt;&lt;</div>
                            </div>
                            <ul class="vacation__btn--main">
                                <li class="vacation__btn--item">1</li>
                                <li class="vacation__btn--item">2</li>
                                <li class="vacation__btn--item">3</li>
                                <li class="vacation__btn--item">4</li>
                                <li class="vacation__btn--item">5</li>
                                <li class="vacation__btn--item">6</li>
                                <li class="vacation__btn--item">7</li>
                                <li class="vacation__btn--item">8</li>
                            </ul>
                            <div class="vacation__btn--next-wrapper">
                                <div class="vacation__btn--next">&gt;</div>
                                <div class="vacation__btn--last">&gt;&gt;</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="vacation-btn-wrapper--mobile">
                    <button data-button="register" class="btn btn--primary">근태 신청</button>
                </div>
            </section>
            <div id="modalWrapper">
            
            </div>
            `;
	}

	showModal(event) {
		const applyModal = document.getElementById('applyModal');
		applyModal.classList.add('active');
	}

	closeModal(event) {
		const id = event.currentTarget.parentElement.id;
		const applyModal = document.getElementById('applyModal');
		const historyModal = document.getElementById('historyModal');
		if (id === 'applyModalBtnWrapper') {
			applyModal.classList.remove('active');
		} else if (id === 'historyModalBtnWrapper') {
			historyModal.classList.remove('active');
		}
	}

	render() {
		this.contentsElement.innerHTML = this.template;
		const el = document.querySelector('#modalWrapper');

		new VacationApplyModal(el).render();
		new VacationHistoryModal(el).render();

		const applyModalBtnWrapper = document.getElementById('applyModalBtnWrapper');
		const applyModalCancelBtn = applyModalBtnWrapper.querySelector('button:first-child');
		const historyModalBtnWrapper = document.getElementById('historyModalBtnWrapper');
		const historyModalCancelBtn = historyModalBtnWrapper.querySelector('button:first-child');

		const openApplyModalBtns = document.querySelectorAll('[data-button="register"]');
		openApplyModalBtns.forEach((btn) => {
			btn.addEventListener('click', this.showModal); // 실행 컨텍스트 문제로 this.showModal 내부의 this는 실행 주체인 openApplyModalBtn이 됨
		});

		applyModalCancelBtn.addEventListener('click', this.closeModal);
		historyModalCancelBtn.addEventListener('click', this.closeModal);
	}
}
