export default class Pagination {
	constructor(parentEl, vacationListItem) {
		this.parentEl = parentEl;
		this.vacationListItem = vacationListItem;
		this.states = {
			pageNumber: vacationListItem.states.pageNumber,
			pageSize: vacationListItem.states.pageSize,
			count: vacationListItem.count,
		};
		this.clickPage = this.clickPage.bind(this); // this 바인딩을 고정하여 이벤트 핸들러에서 this를 잃지 않도록 설정
	}

	setState(newState) {
		this.states = { ...this.states, ...newState };
		this.render();
	}

	get pageNums() {
		const totalPageNum = Math.ceil(this.states.count / this.states.pageSize);
		const pageNums = [];

		for (let pageNum = 1; pageNum < totalPageNum + 1; pageNum++) {
			pageNums.push(pageNum);
		}

		return pageNums;
	}

	get numberTemplate() {
		const htmls = this.pageNums.map((pageNumber) => {
			const className =
				this.states.pageNumber === pageNumber
					? 'vacation__btn--item active'
					: 'vacation__btn--item';

			return `<li class="${className}" data-page="${pageNumber}">${pageNumber}</li>`;
		});

		return htmls.join('');
	}

	get beforeTemplate() {
		return `<div class="vacation__btn--before-wrapper">
                    <div class="vacation__btn--before--first">&lt;</div>
                    <div class="vacation__btn--before">&lt;&lt;</div>
                </div>`;
	}

	get afterTemplate() {
		return `<div class="vacation__btn--next-wrapper">
                    <div class="vacation__btn--next">&gt;</div>
                    <div class="vacation__btn--last">&gt;&gt;</div>
                </div>`;
	}

	get template() {
		return `<ul class="vacation__btn--main">${this.numberTemplate}</ul>`;
	}

	clickPage(event) {
		const pageNumber = parseInt(event.target.closest('li').getAttribute('data-page'), 10);

		this.vacationListItem.setState({ pageNumber });
		this.setState({ pageNumber });
	}

	render() {
		this.parentEl.innerHTML = this.template;
		this.parentEl.addEventListener('click', this.clickPage);
	}
}
