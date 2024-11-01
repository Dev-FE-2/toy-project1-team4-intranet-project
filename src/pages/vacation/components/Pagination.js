export default class Pagination {
	constructor(parentEl, vacationListItem) {
		this.parentEl = parentEl;
		this.vacationListItem = vacationListItem;
		this.states = {
			pageNumber: vacationListItem.states.pageNumber,
			pageSize: vacationListItem.states.pageSize,
			count: vacationListItem.count,
		};
		console.log('this.states', this.states);
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
				this.states.filterType === pageNumber
					? 'vacation__btn--item active'
					: 'vacation__btn--item';

			return `<li class="${className}" data-page="${pageNumber}">${pageNumber}</li>`;
		});
		console.log('htmls', htmls);

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

	render() {
		console.log(this.template);

		this.parentEl.innerHTML = this.template;

		this.parentEl.addEventListener('click', (event) => {
			const pageNumber = parseInt(event.target.closest('li').getAttribute('data-page'), 10);

			console.log(pageNumber);

			this.listInstance.setState({ pageNumber });
			this.setState({ pageNumber });
		});
	}
}
