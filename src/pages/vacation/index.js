import './style.css';
import VacationApplyModal from './VacationApplyModal';

export default class VacationPage {
	constructor() {
		this.modalEl = new VacationApplyModal();
	}

	showModal() {
		this.applyModalBtn = document.getElementById('ApplyModal');
		this.applyModalBtn.addEventListener('click', () => {
			// this.modalEl.classList.contain('active')
			// 	? this.modalEl.classList.remove('active')
			// 	: this.modalEl.classList.add('active');
			console.log('hello');
		});
	}

	render() {
		return `
            <section class="contents vacation">
                <div class="vacation__page-title-wrapper">
                    <h1 class="page-title">근태 신청</h1>
                </div>

                <div class="vacation__btn-wrapper">
                    <button class="btn btn--highlight">나의 근태</button>
                    <button id="ApplyModal" class="btn btn--primary">근태신청</button>
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
                    <button class="btn btn--primary">근태 신청</button>
                </div>
            </section>

            ${this.modalEl.render()}

            <div class="vacation__history-wrapper">
                <div class="vacation__history-background"></div>
                <div class="vacation__history-popup">
                    <div class="vacation__history-title-wrapper">
                        <div class="vacation__history-title">휴가 신청 내역</div>
                    </div>
                    <div class="vacation__history-author-wrapper">
                        <hr>
                        <h3 class="vacation__history-author">박수빈</h3>
                    </div>
                    <div class="vacation__history-form-wrapper">
                        <form action="" class="form">
                            <fieldset class="vacation__apply-select">
                                <legend>신청가능한 근태</legend>
                                <label for="apply">휴가 종류</label>
                                <select name="apply" id="apply" readonly>
                                    <option value="연차">🏖️ 연차</option>
                                    <option value="반차">🌇 반차</option>
                                    <option value="병가">🚑 병가</option>
                                    <option value="기타">💬 기타</option>
                                </select>
                            </fieldset>
                            <fieldset>
                                <legend>시작일</legend>
                                <input type="date" data-placeholder="시작일" placeholder="시작일" required readonly>
                            </fieldset>
                            <fieldset>
                                <legend>종료일</legend>
                                <input type="date" data-placeholder="종료일" placeholder="종료일" required readonly>
                            </fieldset>
                            <input type="text" readonly>
                            <textarea name="" id="" readonly>이런 이런 이런 이유로 ~~~ 휴가 신청합니다 ~</textarea>
                        </form>
                    </div>
                    <div class="vacation__history-btn-wrapper">
                        <button class="btn">취소</button>
                        <button class="btn btn--primary">확인</button>
                    </div>
                </div>
            </div>
            `;
	}
}
