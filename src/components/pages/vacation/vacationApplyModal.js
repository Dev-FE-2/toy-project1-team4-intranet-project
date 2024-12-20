export default class VacationApplyModal {
	constructor(modalParentEl) {
		this.modalParentEl = modalParentEl;
		this.template = `
            <div class="vacation__apply-wrapper" id="applyModal">
                <div class="vacation__apply-background"></div>
                <div class="vacation__apply-popup">
                    <div class="vacation__apply-title-wrapper">
                        <div class="vacation__apply-title">휴가 신청</div>
                    </div>
                    <div class="vacation__apply-form-wrapper">
                        <form id="vacationApplyForm" action="POST" class="form">
                            <fieldset class="vacation__apply-select">
                                <legend>신청가능한 근태</legend>
                                <label for="apply">휴가 종류</label>
                                <select name="vacationList" id="apply">
                                    <option value="연차">🏖️ 연차</option>
                                    <option value="반차">🌇 반차</option>
                                    <option value="병가">🚑 병가</option>
                                    <option value="기타">💬 기타</option>
                                </select>
                            </fieldset>
                            <fieldset class="vacation__apply-select">
                                <legend>시작일</legend>
                                <input name="vacationStartDate" type="date" data-placeholder="시작일" placeholder="시작일" required>
                            </fieldset>
                            <fieldset class="vacation__apply-select">
                                <legend>종료일</legend>
                                <input name="vacationEndDate" type="date" data-placeholder="종료일" placeholder="종료일" required>
                            </fieldset>
                            <textarea name="vacationDescription" id="" placeholder="휴가 사유를 입력해주세요."></textarea>
                            <div id="applyModalBtnWrapper" class="vacation__apply-btn-wrapper">
                                <button type="button" class="btn">취소</button>
                                <button class="btn btn--primary">휴가 신청하기</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    `;
	}

	async handleVacationSubmit(event) {
		event.preventDefault();
		const vacationApplyModal = this.modalParentEl.querySelector('#applyModal');
		const submitArray = [];
		const submitObject = {};
		const formData = new FormData(this);
		for (let [key, value] of formData.entries()) {
			submitObject[key] = value;
		}

		submitArray.push(submitObject);
		const toJSON = JSON.stringify(submitArray);

		const res = await fetch('http://localhost:5173/api/vacation', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application.json',
			},
			body: toJSON,
		});

		alert('근태 신청이 완료되었습니다.');
		vacationApplyModal.classList.remove('active');
	}

	async render() {
		this.modalParentEl.insertAdjacentHTML('beforeend', this.template);
		const vacationApplyForm = document.querySelector('#vacationApplyForm');

		vacationApplyForm.addEventListener('submit', () => {
			this.handleVacationSubmit;
		});
	}
}
