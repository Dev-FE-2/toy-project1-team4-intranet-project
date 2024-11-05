export default class Pagination {
	constructor(totalPages, currentPage, onPageChange) {
		this.totalPages = totalPages;
		this.currentPage = currentPage;
		this.onPageChange = onPageChange;
	}

	renderButtons(totalPages, currentPage) {
		return `
			<a href="#" class="prev-page">«</a>
			${Array.from(
				{ length: totalPages },
				(_, index) => `
				<span class="page-number ${index + 1 === currentPage ? 'active' : ''}" data-page="${index + 1}">
					${index + 1}
				</span>
			`,
			).join('')}
			<a href="#" class="next-page">»</a>
		`;
	}

	render(containerSelector) {
		const paginationContainer = document.querySelector(containerSelector);
		paginationContainer.innerHTML = this.renderButtons(this.totalPages, this.currentPage);
		this.addPaginationEventListeners();
	}

	updateButtons(totalPages, currentPage) {
		this.totalPages = totalPages;
		this.currentPage = currentPage;
		this.render('.pagination');
	}

	addPaginationEventListeners() {
		document.querySelectorAll('.page-number').forEach((button) => {
			button.addEventListener('click', (event) => {
				event.preventDefault();
				const page = parseInt(event.target.getAttribute('data-page'), 10);
				if (!isNaN(page)) {
					this.onPageChange(page);
				}
			});
		});

		const prevButton = document.querySelector('.prev-page');
		const nextButton = document.querySelector('.next-page');
		if (prevButton)
			prevButton.addEventListener('click', (event) => {
				event.preventDefault();
				this.onPageChange(this.currentPage - 1);
			});
		if (nextButton)
			nextButton.addEventListener('click', (event) => {
				event.preventDefault();
				this.onPageChange(this.currentPage + 1);
			});
	}
}
