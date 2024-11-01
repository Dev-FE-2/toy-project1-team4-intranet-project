import {
	VacationListItem,
	VacationTypeTabMenu,
	Pagination,
	VacationApplyModal,
} from '../../components/pages/Vacation';
import './style.css';

export default class VacationPage {
	constructor(contentsElement) {
		this.contentsElement = contentsElement;
		this.applyModalEl = new VacationApplyModal();
		this.pagination = null;
		this._count = 0;
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

                        <div id="pagination" class="vacation__list-btn"></div>
                    </div>
                </div>
                <div class="vacation-btn-wrapper--mobile">
                    <button data-button="register" class="btn btn--primary">근태 신청</button>
                </div>
            </section>

            <div id="modalWrapper"></div>
        `;
	}

	showModal() {
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

	updateCount(count) {
		this._count = count;
		if (this.pagination) {
			this.pagination.setState({ count });
		}
	}

	render() {
		this.contentsElement.innerHTML = this.template;

		const modalParentEl = document.querySelector('#modalWrapper');
		const listParentEl = document.querySelector('#vacationList');

		new VacationApplyModal(modalParentEl).render();

		const applyModalBtnWrapper = document.getElementById('applyModalBtnWrapper');
		const applyModalCancelBtn = applyModalBtnWrapper.querySelector('button:first-child');

		// 근태 신청 모달 팝업
		const openApplyModalBtns = document.querySelectorAll('[data-button="register"]');
		openApplyModalBtns.forEach((btn) => {
			btn.addEventListener('click', this.showModal); // 실행 컨텍스트 문제로 this.showModal 내부의 this는 실행 주체인 openApplyModalBtn이 됨
		});

		// 근태 신청 모달 닫기
		applyModalCancelBtn.addEventListener('click', this.closeModal);

		// 리스트 렌더링
		const vacationListItem = new VacationListItem(
			listParentEl,
			modalParentEl,
			this.updateCount.bind(this),
		);
		vacationListItem.render();

		// 페이지네이션 렌더링
		const paginationEl = document.querySelector('#pagination');
		this.pagination = new Pagination(paginationEl, vacationListItem);
		this.pagination.render();

		// 휴가 종류 메뉴 탭 렌더링
		const menuEl = document.querySelector('#typeTabMenu');
		new VacationTypeTabMenu(menuEl, vacationListItem).render();

		// 나의 근태 목록 토글 필터링
		const myVacationBtn = document.querySelector('#myVacationBtn');
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
