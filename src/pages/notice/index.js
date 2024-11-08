import './style.css';
import NoticeApi from '../../apis/noticeApi';
import Pagination from '../../components/pages/notice/pagination';
import Search from '../../components/pages/notice/search';
import InfiniteScroll from '../../components/pages/notice/infiniteScroll';

export default class Notice {
	constructor(contentsElement) {
		// 상수 정의
		this.ITEMS_PER_PAGE = 4;
		this.MOBILE_BREAKPOINT = 768;

		// 초기 상태 설정
		this.contentsElement = contentsElement;
		this.notices = [];
		this.currentPage = 1;
		this.searchQuery = '';
		this.filteredResults = [];
		this.isMobile = window.innerWidth <= this.MOBILE_BREAKPOINT;
		this.infiniteScrollInitialized = false;

		// API 인스턴스 생성
		this.api = new NoticeApi();
	}

	// 데이터 초기화 및 로드
	async initialize() {
		try {
			await this.fetchNoticeData();
			this.initializeInfiniteScroll();
		} catch (error) {
			console.error('Failed to initialize data:', error);
		}
	}

	// 공지사항 데이터 가져오기
	async fetchNoticeData() {
		try {
			const response = await this.api.getNoticesByPage(this.currentPage, this.ITEMS_PER_PAGE);

			if (response && response.notices) {
				this.notices = response.notices;
				this.totalPages = response.totalPages;
				this.totalNotices = response.totalNotices;
				return this.notices;
			} else {
				console.error('Invalid response format:', response);
				throw new Error('Invalid response format');
			}
		} catch (error) {
			console.error('Error fetching notice data:', error);
			throw error;
		}
	}

	// 인피니트 스크롤 초기화
	initializeInfiniteScroll() {
		if (this.isMobile) {
			this.infiniteScroll = new InfiniteScroll(
				this.renderInfiniteScroll.bind(this),
				this.totalPages,
			);
			this.infiniteScrollInitialized = true;
		}
	}

	// 데이터 필터링
	async handleSearch(searchQuery) {
		try {
			this.searchQuery = searchQuery;

			if (!searchQuery.trim()) {
				const response = await this.api.getNoticesByPage(1, this.ITEMS_PER_PAGE);
				Object.assign(this, response);
				this.filteredResults = this.notices;
			} else {
				const response = await this.api.searchNotices(searchQuery, 1, this.ITEMS_PER_PAGE);
				Object.assign(this, response);
				this.filteredResults = this.notices;
			}

			if (!this.filteredResults.length) {
				alert('검색결과가 없습니다.');
				return;
			}

			this.currentPage = 1;
			this.resetView();
		} catch (error) {
			console.error('Search error:', error);
		}
	}

	// 뷰 초기화 및 재렌더링
	resetView() {
		this.renderNoticeList(this.filteredResults);

		if (this.isMobile) {
			this.resetInfiniteScroll();
		} else {
			this.renderPagination();
		}
	}

	// 인피니트 스크롤 초기화
	resetInfiniteScroll() {
		const pageContainer = document.querySelector('.layout__page-container');
		this.infiniteScroll.reset();
		this.infiniteScroll.setupInfiniteScroll(pageContainer);
	}

	// 페이지네이션 렌더링
	renderPagination() {
		const paginationContainer = this.contentsElement.querySelector('.notice__pagination-container');

		new Pagination({
			totalPages: this.totalPages,
			currentPage: this.currentPage,
			onPageChange: async (page) => {
				this.currentPage = page;
				try {
					const response = this.searchQuery
						? await this.api.searchNotices(this.searchQuery, page, this.ITEMS_PER_PAGE)
						: await this.api.getNoticesByPage(page, this.ITEMS_PER_PAGE);

					Object.assign(this, response); // response의 모든 속성이 this 객체로 복사됨
					this.filteredResults = this.notices;
					this.renderNoticeList(this.filteredResults);
					this.renderPagination();
				} catch (error) {
					console.error('Error changing page:', error);
				}
			},
		}).render(paginationContainer);
	}

	// 공지사항 아이템 HTML 생성
	createNoticeItem(item, index) {
		return `
			<li class="notice__item" data-index="${index}">
				<img class="notice__item__img" src="data:image/jpeg;base64,${item.image_data}" alt="공지사항 이미지"/>
				<div class="notice__info">
					<h3 class="notice__info__title">${item.title}</h3>
					<p class="notice__info__content">${item.content}</p>
				</div>
			</li>
		`;
	}

	// 공지사항 리스트 생성
	createNoticeList(data) {
		const ulElement = document.createElement('ul');
		ulElement.classList.add('notice__list');

		data.forEach((item) => {
			const listItem = document.createElement('li');
			listItem.classList.add('notice__item');
			listItem.dataset.id = item.notice_id;

			listItem.innerHTML = `
            <img class="notice__item__img" 
                src="${item.image_data ? `data:image/jpeg;base64,${item.image_data}` : 'default-image-path.jpg'}" 
                alt="공지사항 이미지"
                loading="lazy"
            />
            <div class="notice__info">
                <h3 class="notice__info__title">${item.title}</h3>
                <p class="notice__info__content">${item.content}</p>
            </div>
        `;

			listItem.addEventListener('click', () => {
				window.location.href = `/notice/${item.notice_id}`;
			});

			ulElement.appendChild(listItem);
		});

		return ulElement;
	}

	// 공지사항 리스트 렌더링
	renderNoticeList(data) {
		const listContainer = this.contentsElement.querySelector('.notice__list-container');
		listContainer.innerHTML = '';
		listContainer.append(this.createNoticeList(data));
	}

	// 인피니트 스크롤로 공지사항 렌더링
	async renderInfiniteScroll(page) {
		try {
			const response = this.searchQuery
				? await this.api.searchNotices(this.searchQuery, page, this.ITEMS_PER_PAGE)
				: await this.api.getNoticesByPage(page, this.ITEMS_PER_PAGE);

			Object.assign(this, response); // response의 모든 속성이 this 객체로 복사됨
			const listContainer = this.contentsElement.querySelector('.notice__list-container');
			if (this.notices.length) {
				listContainer.append(this.createNoticeList(this.notices));
			}
		} catch (error) {
			console.error('Error loading more notices:', error);
		}
	}

	// 공지사항 템플릿 생성
	getNoticeTemplate() {
		return `
			<div class="contents">
				<header class="notice-header">
					<h1 class="notice__title">공지사항</h1>
				</header>
				<section class="notice-section">
					<div class="notice-container">
						<div class="notice__search-container"></div>
						<div class="notice__list-container"></div>
						<div class="notice__pagination-container"></div>
					</div>
				</section>
			</div>
		`;
	}

	// 공지사항 렌더링
	async render() {
		console.log('start');
		// 템플릿 렌더링
		this.contentsElement.innerHTML = this.getNoticeTemplate();
		console.log('1');
		// 데이터 초기화
		await this.initialize();
		console.log('2');
		// 검색 컴포넌트 렌더링
		const searchContainer = this.contentsElement.querySelector('.notice__search-container');
		new Search(this.handleSearch.bind(this)).render(searchContainer);
		console.log('3');
		// 초기 데이터 렌더링
		const initialData = this.filteredResults.length ? this.filteredResults : this.notices;
		this.renderNoticeList(initialData);
		console.log('4');
		// 모바일/데스크톱 분기 처리
		if (this.isMobile) {
			this.resetInfiniteScroll();
			console.log('5');
		} else {
			this.renderPagination();
			console.log('6');
		}
		console.log('end');
	}
}
