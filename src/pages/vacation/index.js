import VacationListItem from './components/VacationListItem';
import VacationTypeTabMenu from './components/VacationTypeTabMenu';
import VacationApplyModal from './VacationApplyModal';
import VacationHistoryModal from './VacationHistoryModal';
import './style.css';

export default class VacationPage {
	constructor(contentsElement) {
		this.contentsElement = contentsElement;
		this.applyModalEl = new VacationApplyModal();
		this.historyModalEl = new VacationHistoryModal();
		this.template = `
            <section class="contents vacation">
                <div class="vacation__page-title-wrapper">
                    <h1 class="page-title">근태 신청</h1>
                </div>

                <div class="vacation__btn-wrapper">
                    <button data-type="myVacation" id="myVacationBtn" class="btn btn--highlight" type="button">나의 근태</button>
                    <button data-button="register" class="btn btn--primary" type="button">근태 신청</button>
                </div>

                <div class="vacation__list-wrapper">
                    <ul id="typeTabMenu" class="vacation__list-nav"></ul>

                    <div class="vacation__content-wrapper">
                        <ul id="vacationList" class="vacation__list-main"></ul>

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

            <div id="modalWrapper"></div>
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

		const modalParentEl = document.querySelector('#modalWrapper');
		const listParentEl = document.querySelector('#vacationList');
		const menuEl = document.querySelector('#typeTabMenu');
		const myVacationBtn = document.querySelector('#myVacationBtn');

		new VacationApplyModal(modalParentEl).render();
		new VacationHistoryModal(modalParentEl).render();

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

		// 리스트 렌더링
		const vacationListItem = new VacationListItem(listParentEl, modalParentEl);
		vacationListItem.render();

		// 휴가 종류 메뉴 탭 렌더링
		new VacationTypeTabMenu(menuEl, vacationListItem).render();

		// 나의 근태 목록 필터링
		myVacationBtn.addEventListener('click', () => {
			if (myVacationBtn.dataset.type === 'myVacation') {
				vacationListItem.setState({ isMyVacation: true });

				myVacationBtn.innerHTML = '모든 근태';
				myVacationBtn.dataset.type = 'allEmployeeVacation';
			} else {
				vacationListItem.setState({ isMyVacation: false });

				myVacationBtn.innerHTML = '나의 근태';
				myVacationBtn.dataset.type = 'myVacation';
			}
		});
	}
}
