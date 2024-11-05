import './style.css';
import noticeData from './noticeList';
import searchIcon from '../../assets/icons/icon_search.svg';

export default class Notice {
	constructor(contentsElement) {
		this.currentPage = 1;
		this.itemsPerPage = 4;
		this.maxPage = 10;
		this.contentsElement = contentsElement;
		this.isMobile = window.innerWidth <= 768; // TABLET
		this.isLoadingNotices = false; // 중복 호출 방지 플래그
		this.scrollDebounceTimer = null;
		this.searchQuery = '';
		this.filteredResults = [];
	}

	// 공지사항 데이터를 불러오기
	async fetchNoticeData(url) {
		try {
			const res = await fetch(url);
			if (!res.ok) {
				throw new Error(`HTTP error : ${res.status}`);
			}
			return await res.json();
		} catch (err) {
			console.error(err);
			throw new Error('공지사항을 불러오는데 실패했습니다.');
		}
	}

	// 데이터 검색
	getFilteredData(data) {
		const searchLower = this.searchQuery.toLowerCase();
		return data.filter(
			(item) =>
				item.title.toLowerCase().includes(searchLower) ||
				item.content.toLowerCase().includes(searchLower),
		);
	}

	// 검색 처리
	handleSearch(event) {
		event.preventDefault();
		const inputElement = this.contentsElement.querySelector('.notice__search__input');
		this.searchQuery = inputElement.value.trim();
		this.filteredResults = this.getFilteredData(noticeData);
		console.log(this.searchQuery);

		if (this.filteredResults.length === 0) {
			alert('검색결과가 없습니다.');
		} else {
			this.currentPage = 1;
			this.renderNoticeList(this.filteredResults);
			this.isMobile
				? this.setupLazyLoading(this.filteredResults)
				: this.renderPagination(this.filteredResults);
		}
	}

	// 검색 폼 설정
	setupSearchForm() {
		const searchForm = this.contentsElement.querySelector('.notice__search-container');
		searchForm.addEventListener('submit', (event) => this.handleSearch(event));
	}

	// 전체 페이지 수 계산
	getTotalPages(data) {
		return Math.ceil(data.length / this.itemsPerPage);
	}

	// 페이지 변경 처리
	handlePageChange(pageNumber) {
		this.currentPage = pageNumber;
		this.render();
	}

	// 버튼 생성
	createButton(text, className, onClick) {
		const button = document.createElement('button');
		button.innerText = text;
		button.classList.add(className);
		if (onClick) {
			button.addEventListener('click', onClick);
		}
		return button;
	}

	// 페이지네이션 버튼 생성
	createPaginationButton(text, page, isSelectable) {
		const buttonClass = isSelectable ? 'button-unselected' : 'button-inactivated';
		const onClick = isSelectable ? () => this.handlePageChange(page) : undefined;
		return this.createButton(text, buttonClass, onClick);
	}

	// 페이지네이션 생성
	createPagination(data) {
		const paginationContainer = document.createElement('div');
		paginationContainer.classList.add('pagination-list');

		const totalPages = this.getTotalPages(data);
		const isSelectable = totalPages > this.maxPage;

		// 이전 버튼 생성
		const prevButtons = [
			{ text: '«', page: 1 },
			{
				text: '‹',
				page: Math.max(
					1,
					Math.floor((this.currentPage - 1) / this.maxPage) * this.maxPage - this.maxPage + 1,
				),
			},
		];

		prevButtons.forEach(({ text, page }) => {
			const button = this.createPaginationButton(text, page, isSelectable);
			paginationContainer.append(button);
		});

		// 페이지 번호 버튼 생성
		const startPage = Math.floor((this.currentPage - 1) / this.maxPage) * this.maxPage + 1;
		const endPage = Math.min(startPage + this.maxPage - 1, totalPages);

		for (let i = startPage; i <= endPage; i++) {
			const pageButton = this.createButton(i, 'button-unselected', () => this.handlePageChange(i));
			if (i === this.currentPage) {
				pageButton.classList.remove('button-unselected');
				pageButton.classList.add('button-selected');
			}
			paginationContainer.append(pageButton);
		}

		// 다음 버튼 생성
		const nextButtons = [
			{
				text: '›',
				page: Math.min(
					totalPages,
					Math.floor((this.currentPage - 1) / this.maxPage) * this.maxPage + this.maxPage + 1,
				),
			},
			{ text: '»', page: totalPages },
		];

		nextButtons.forEach(({ text, page }) => {
			const button = this.createPaginationButton(text, page, isSelectable);
			paginationContainer.append(button);
		});

		return paginationContainer;
	}

	// 페이지네이션 랜더링
	renderPagination(data) {
		const paginationContainer = this.contentsElement.querySelector('.pagination-container');
		paginationContainer.innerHTML = '';
		const pagination = this.createPagination(data);
		paginationContainer.append(pagination);
	}

	// 공지사항 리스트 생성
	createNoticeList(data) {
		const ulElement = document.createElement('ul');
		ulElement.classList.add('notice-list');

		data.forEach((item, index) => {
			const liElement = document.createElement('li');
			liElement.classList.add('notice-item');
			liElement.setAttribute('data-index', index);
			liElement.innerHTML = `
        <img class="notice-item__img" src="${item.image_url}" alt="공지사항 이미지"/>
        <div class="notice-info">
          <h3 class="notice-info__title">${item.title}</h3>
          <p class="notice-info__content">${item.content}</p>
        </div>
      `;
			ulElement.append(liElement);
		});
		return ulElement;
	}

	// 공지사항 리스트에 클릭 이벤트 추가
	addUlListener(element, data) {
		element.addEventListener('click', (event) => {
			let target = event.target;

			while (target && target.tagName !== 'LI') {
				target = target.parentElement;
			}

			const tagName = target.tagName;
			if (target && tagName === 'LI') {
				const index = target.getAttribute('data-index');
				const selectedData = data[index];

				// 상세 페이지로 이동
				if (selectedData) {
					window.location.href = `/notice/${selectedData.notice_id}`;
				}
			}
		});
	}

	// 공지사항 리스트 랜더링
	renderNoticeList(data) {
		const listContainer = this.contentsElement.querySelector('.list-container');
		listContainer.innerHTML = ''; // 이전 검색 결과를 제거
		const startIndex = (this.currentPage - 1) * this.itemsPerPage;
		const endIndex = startIndex + this.itemsPerPage;
		const currentData = data.slice(startIndex, endIndex);

		const list = this.createNoticeList(currentData);
		listContainer.append(list);
		this.addUlListener(listContainer, data);
	}

	// 레이지 로딩 설정
	setupLazyLoading(data) {
		if (this.lazyLoadingSetUp) {
			return; // 이미 설정된 경우 새로운 이벤트 리스너 추가하지 않음
		}

		this.lazyLoadingSetUp = true;

		const pageContainer = document.querySelector('.layout__page-container');

		// 스크롤 이벤트 리스너
		const onScroll = () => {
			const currentScroll = pageContainer.scrollTop + pageContainer.clientHeight;
			const totalHeight = pageContainer.scrollHeight;

			// 로딩 중이 아니고, 스크롤 위치가 페이지의 끝 근처에 도달하고, 추가 페이지가 존재할 때
			if (
				!this.isLoadingNotices &&
				currentScroll >= totalHeight - 10 &&
				this.currentPage < this.getTotalPages(data)
			) {
				this.isLoadingNotices = true; // 중복 호출 방지
				this.currentPage++;
				this.renderLazyLoading(data);
			}
		};

		// 이벤트 핸들러를 바인딩하고 설정
		pageContainer.addEventListener('scroll', () => {
			if (!this.scrollDebounceTimer) {
				this.scrollDebounceTimer = setTimeout(() => {
					this.scrollDebounceTimer = null;
					onScroll();
					console.log('timer!');
				}, 500);
			}
		});
	}

	// 레이지 로딩으로 공지사항 렌더링
	renderLazyLoading(data) {
		const listContainer = this.contentsElement.querySelector('.list-container');
		const startIndex = (this.currentPage - 1) * this.itemsPerPage;
		const endIndex = startIndex + this.itemsPerPage;
		const currentData = data.slice(startIndex, endIndex);

		if (currentData.length > 0) {
			const list = this.createNoticeList(currentData);
			listContainer.append(list);
			this.addUlListener(listContainer, data);
		}

		this.isLoadingNotices = false; // 로딩 완료 후 플래그 초기화
	}

	// 공지사항 렌더링
	render() {
		this.contentsElement.innerHTML = `
        <div class="contents">
            <h1 class="notice__title">공지사항</h1>
            <section class="notice-section">
                <form class="notice__search-container">
                    <input class="notice__search__input" placeholder="search">
                    <button type="submit" class="notice__search__button" aria-label="Search">
                        <img class="notice__search__img" src="${searchIcon}" alt="검색">
                    </button>
                </form>
                <div class="notice-container">
                    <div class="list-container"></div>
                    <div class="pagination-container"></div>
                </div>
            </section>
        </div>`;
		this.setupSearchForm();

		// 현재 검색된 데이터에 따라 리스트와 페이지네이션을 렌더링
		const dataToRender = this.filteredResults.length ? this.filteredResults : noticeData;
		this.renderNoticeList(dataToRender);

		this.isMobile ? this.setupLazyLoading(dataToRender) : this.renderPagination(dataToRender);
	}
}
