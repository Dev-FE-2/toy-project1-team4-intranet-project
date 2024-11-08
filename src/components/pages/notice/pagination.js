import './pagination.css';

export default class Pagination {
	constructor({ totalPages, currentPage, onPageChange, maxPage = 10 }) {
		this.totalPages = totalPages;
		this.currentPage = currentPage;
		this.onPageChange = onPageChange;
		this.maxPage = maxPage;

		this.PAGINATION_BUTTONS = {
			FIRST: { text: '«', getPage: () => 1 },
			PREV: {
				text: '‹',
				getPage: (currentPage, maxPage) =>
					Math.max(1, Math.floor((currentPage - 1) / maxPage) * maxPage - maxPage + 1),
			},
			NEXT: {
				text: '›',
				getPage: (currentPage, maxPage, totalPages) =>
					Math.min(totalPages, Math.floor((currentPage - 1) / maxPage) * maxPage + maxPage + 1),
			},
			LAST: { text: '»', getPage: (_, __, totalPages) => totalPages },
		};
	}

	// 버튼 생성
	createButton(text, className = '', onClick) {
		const button = document.createElement('button');
		button.textContent = text;
		button.classList.add('pagination__button');
		if (className) button.classList.add(className);
		if (onClick) button.addEventListener('click', onClick);
		return button;
	}

	// 네비게이션 버튼 생성
	createNavigationButton(buttonType, isSelectable) {
		const { text, getPage } = this.PAGINATION_BUTTONS[buttonType];
		const page = getPage(this.currentPage, this.maxPage, this.totalPages);
		const className = !isSelectable ? 'pagination__button--disabled' : '';
		const onClick = isSelectable ? () => this.onPageChange(page) : undefined;
		return this.createButton(text, className, onClick);
	}

	// 페이지 번호 버튼 생성
	createPageButtons(startPage, endPage) {
		const buttons = [];
		for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
			const isCurrentPage = pageNum === this.currentPage;
			const className = isCurrentPage ? 'pagination__button--active' : '';
			const button = this.createButton(
				pageNum,
				className,
				isCurrentPage ? undefined : () => this.onPageChange(pageNum),
			);
			buttons.push(button);
		}
		return buttons;
	}

	// 페이지네이션 생성
	createPagination() {
		const container = document.createElement('nav');
		container.classList.add('pagination');

		const isSelectable = this.totalPages > this.maxPage;
		const startPage = Math.floor((this.currentPage - 1) / this.maxPage) * this.maxPage + 1;
		const endPage = Math.min(startPage + this.maxPage - 1, this.totalPages);

		// 이전 버튼 생성
		['FIRST', 'PREV'].forEach((buttonType) =>
			container.append(this.createNavigationButton(buttonType, isSelectable)),
		);

		// 페이지 번호 버튼 생성
		this.createPageButtons(startPage, endPage).forEach((button) => container.append(button));

		// 다음 버튼 생성
		['NEXT', 'LAST'].forEach((buttonType) =>
			container.append(this.createNavigationButton(buttonType, isSelectable)),
		);

		return container;
	}

	// 페이지네이션 랜더링
	render(container) {
		container.replaceChildren(this.createPagination());
	}
}
