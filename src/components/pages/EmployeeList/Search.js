export default class Search {
	constructor(onSearch) {
		this.onSearch = onSearch;
	}

	render(containerSelector) {
		const searchContainer = document.querySelector(containerSelector);
		searchContainer.innerHTML = `
			<input type="text" placeholder="이름을 검색하세요" class="search" />
			<button class="register-btn">직원 등록</button>
		`;

		this.addSearchEventListener();
	}

	addSearchEventListener() {
		const searchInput = document.querySelector('.search');
		searchInput.addEventListener('input', (event) => {
			const query = event.target.value;
			this.onSearch(query);
		});
	}
}
