export default class Pagination {
	constructor(totalPages, currentPage, onPageChange) {
		this.totalPages = totalPages;
		this.currentPage = currentPage;
		this.onPageChange = onPageChange;
	}

	renderButtons() {
		return `
			<a href="#" class="prev-page ${this.currentPage === 1 ? 'disabled' : ''}">«</a>
			${Array.from(
				{ length: this.totalPages },
				(_, index) => `
				<span class="page-number ${index + 1 === this.currentPage ? 'active' : ''}" data-page="${index + 1}">
					${index + 1}
				</span>
			`,
			).join('')}
			<a href="#" class="next-page ${this.currentPage === this.totalPages ? 'disabled' : ''}">»</a>
		`;
	}

	render(containerSelector) {
		const paginationContainer = document.querySelector(containerSelector);
		if (paginationContainer.innerHTML !== this.renderButtons()) {
			paginationContainer.innerHTML = this.renderButtons();
			this.addPaginationEventListeners(paginationContainer);
		}
	}

	updateButtons(totalPages, currentPage) {
		if (totalPages !== this.totalPages || currentPage !== this.currentPage) {
			this.totalPages = totalPages;
			this.currentPage = currentPage;
			this.render('.pagination');
		}
	}

	addPaginationEventListeners(paginationContainer) {
		paginationContainer.addEventListener('click', (event) => {
			event.preventDefault();
			const target = event.target;

			if (target.classList.contains('page-number')) {
				const page = parseInt(target.getAttribute('data-page'), 10);
				if (!isNaN(page) && page !== this.currentPage) {
					this.onPageChange(page);
				}
			} else if (target.classList.contains('prev-page') && this.currentPage > 1) {
				this.onPageChange(this.currentPage - 1);
			} else if (target.classList.contains('next-page') && this.currentPage < this.totalPages) {
				this.onPageChange(this.currentPage + 1);
			}
		});
	}
}
