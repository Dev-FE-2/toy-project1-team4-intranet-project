import './search.css';
import searchIcon from '../../../assets/icons/icon_search.svg';

export default class Search {
	constructor(onSearch) {
		this.onSearch = onSearch;
		this.isSearching = false; // 중복 검색 방지를 위한 플래그
	}

	async handleSearch(event) {
		event.preventDefault();

		// 이미 검색 중이면 중복 요청 방지
		if (this.isSearching) return;

		try {
			this.isSearching = true;
			const searchInput = event.target.querySelector('.search-bar__input');
			const searchQuery = searchInput.value.trim();

			// 빈 검색어 처리
			if (!searchQuery) {
				alert('검색어를 입력해주세요.');
				return;
			}

			// 검색 버튼 비활성화
			const searchButton = event.target.querySelector('.search-bar__button');
			searchButton.disabled = true;

			await this.onSearch(searchQuery);

			// 검색 성공 후 입력창 초기화 (선택적)
			// searchInput.value = '';
		} catch (error) {
			console.error('Search failed:', error);
			alert('검색 중 오류가 발생했습니다.');
		} finally {
			this.isSearching = false;
			// 검색 버튼 활성화
			const searchButton = event.target.querySelector('.search-bar__button');
			searchButton.disabled = false;
		}
	}

	setupSearchForm(container) {
		const searchForm = container.querySelector('.search-bar');
		const searchInput = searchForm.querySelector('.search-bar__input');
		const searchButton = searchForm.querySelector('.search-bar__button');

		// 폼 제출 이벤트 (Enter키)
		searchForm.addEventListener('submit', (event) => this.handleSearch(event));

		// 검색 아이콘 클릭 이벤트
		searchButton.addEventListener('click', (event) => {
			// 폼 제출 이벤트가 처리하므로 추가 처리 불필요
		});

		// 입력 필드 키 이벤트 처리
		searchInput.addEventListener('keypress', (event) => {
			// Enter가 아닌 키 입력 무시
			if (event.key !== 'Enter') {
				return;
			}
		});
	}

	getSearchTemplate() {
		return `
      <form class="search-bar">
        <input 
          class="search-bar__input" 
          placeholder="Search" 
          type="search"
          autocomplete="off"
          aria-label="Search input"
        >
        <button 
          type="submit" 
          class="search-bar__button" 
        >
          <img 
            class="search-bar__icon" 
            src="${searchIcon}" 
            aria-hidden="true"
          >
        </button>
      </form>
    `;
	}

	render(container) {
		container.innerHTML = this.getSearchTemplate();
		this.setupSearchForm(container);
	}
}
