export default class InfiniteScroll {
	constructor(onLoadMore, totalPages) {
		this.onLoadMore = onLoadMore;
		this.totalPages = totalPages;
		this.currentPage = 1;
		this.infiniteScrollSetUp = false;

		this.SCROLL_THRESHOLD = 10;
		this.DEBOUNCE_DELAY = 500;
	}

	// 인피니트 스크롤 설정
	setupInfiniteScroll(pageContainer) {
		if (this.infiniteScrollSetUp) return;
		this.infiniteScrollSetUp = true;

		const onScroll = () => {
			if (
				!this.isLoading &&
				pageContainer.scrollTop + pageContainer.clientHeight >=
					pageContainer.scrollHeight - this.SCROLL_THRESHOLD &&
				this.currentPage < this.totalPages
			) {
				this.currentPage++;
				this.onLoadMore(this.currentPage);
			}
		};

		pageContainer.addEventListener('scroll', () => {
			clearTimeout(this.scrollDebounceTimer);
			this.scrollDebounceTimer = setTimeout(onScroll, this.DEBOUNCE_DELAY);
		});
	}

	// 스크롤 초기화
	reset() {
		this.currentPage = 1;
		this.infiniteScrollSetUp = false;
	}
}
