export default class VacationHistoryModal {
	constructor(modalParentEl, foundData) {
		this.modalParentEl = modalParentEl;
		this.foundData = foundData;
		this.template = `
        <div id="historyModal" class="vacation__history-wrapper">
            <div class="vacation__history-background"></div>
            <div class="vacation__history-popup">
                <div class="vacation__history-title-wrapper">
                    <div class="vacation__history-title">휴가 신청 내역</div>
                </div>
                <div class="vacation__history-author-wrapper">
                    <hr>
                    <h3 class="vacation__history-author">${foundData[0].username}</h3>
                </div>
                <div class="vacation__history-form-wrapper">
                    <form action="" class="form">
                        <fieldset class="vacation__apply-select">
                            <legend>신청가능한 근태</legend>
                            <label for="apply">휴가 종류</label>
                            <select name="apply" id="vacationSelect" readonly>
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
                        <input id="title" type="text"   readonly>
                        <textarea name="" id="" readonly></textarea>
                    </form>
                </div>
                <div id="historyModalBtnWrapper" class="vacation__history-btn-wrapper">
                    <button class="btn btn--primary">확인</button>
                </div>
            </div>
        </div>
        `;
	}

	renderOption(vacationType, requestType) {
		const htmls = vacationType.map((obj) => {
			const { value, emoji } = obj;
			const isSelected = requestType === obj.value ? 'selected' : '';

			return `<option value="${value}" ${isSelected}>${emoji} ${value}</option>`;
		});
		console.log(htmls);
		return htmls.join('');
	}

	setRequestType() {
		const requestType = this.foundData[0].requestType;
		const vacationType = [
			{
				value: '연차',
				emoji: '🏖️',
			},
			{
				value: '반차',
				emoji: '🌇',
			},
			{
				value: '조퇴',
				emoji: '🚑',
			},
			{
				value: '기타',
				emoji: '💬',
			},
		];

		let template = this.renderOption(vacationType, requestType);
		return template;
	}

	closeHistoryModal() {
		const historyModal = document.querySelector('#historyModal');
		historyModal.classList.remove('active');
	}

	render() {
		this.modalParentEl.insertAdjacentHTML('beforeend', this.template);
		const historyModal = document.querySelector('#historyModal');
		const vacationSelectTag = historyModal.querySelector('#vacationSelect');
		const vacationDescription = historyModal.querySelector('textarea');
		const historyOkBtn = document.querySelector('#historyModalBtnWrapper button');
		const dateInputs = historyModal.querySelectorAll('input[type="date"]');
		const startDateInput = dateInputs[0];
		const endDateInput = dateInputs[1];

		const titleInput = historyModal.querySelector('#title');
		titleInput.value = this.foundData[0].title;

		vacationSelectTag.innerHTML = this.setRequestType();

		startDateInput.value = this.foundData[0].startDate;
		endDateInput.value = this.foundData[0].endDate;

		vacationDescription.innerText = this.foundData[0].body;

		historyOkBtn.addEventListener('click', this.closeHistoryModal);
	}
}
