export default class VacationHistoryModal {
	constructor(modalWrapper, foundData) {
		this.modalWrapper = modalWrapper;
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

	setRequestType() {
		const requestType = this.foundData[0].requestType;

		let firstOption = `<option value="연차">🏖️ 연차</option>`;
		let secondOption = `<option value="반차">🌇 반차</option>`;
		let thirdOption = `<option value="병가">🚑 병가</option>`;
		let fourthOption = `<option value="기타">💬 기타</option>`;
		let template = ``;

		switch (true) {
			case requestType === '연차':
				firstOption = `<option value="연차" selected>🏖️ 연차</option>`;
				template = `${firstOption}${secondOption}${thirdOption}${fourthOption}`;
				break;
			case requestType === '반차':
				secondOption = `<option value="반차" selected>🌇 반차</option>`;
				template = `${firstOption}${secondOption}${thirdOption}${fourthOption}`;
				break;
			case requestType === '병가':
				thirdOption = `<option value="병가" selected>🚑 병가</option>`;
				template = `${firstOption}${secondOption}${thirdOption}${fourthOption}`;
				break;
			case requestType === '기타':
				fourthOption = `<option value="기타" selected>💬 기타</option>`;
				template = `${firstOption}${secondOption}${thirdOption}${fourthOption}`;
				break;
		}
		return template;
	}

	closeHistoryModal() {
		const historyModal = document.getElementById('historyModal');
		historyModal.classList.remove('active');
	}

	render() {
		this.modalWrapper.insertAdjacentHTML('beforeend', this.template);
		const historyModal = document.getElementById('historyModal');
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
