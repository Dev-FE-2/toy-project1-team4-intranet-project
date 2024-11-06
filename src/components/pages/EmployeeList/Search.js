export default class Search {
	constructor(onSearch, debounceTime = 300) {
		this.onSearch = onSearch;
		this.debounceTime = debounceTime;
		this.debounceTimeout = null;
	}

	render(containerSelector) {
		const searchContainer = document.querySelector(containerSelector);
		searchContainer.innerHTML = `
			<input type="text" placeholder="이름을 검색하세요" class="search" />
			<button class="register-btn">직원 등록</button>
		`;

		this.searchInput = searchContainer.querySelector('.search');
		this.addSearchEventListener();
	}

	addSearchEventListener() {
		this.searchInput.addEventListener('input', (event) => {
			const query = event.target.value;

			clearTimeout(this.debounceTimeout);
			this.debounceTimeout = setTimeout(() => {
				this.onSearch(query);
			}, this.debounceTime);
		});
	}
}
