import './style.css';
import noticeData from './noticeList';

export default class Notice {
	constructor() {
		this.currentPage = 1;
		this.itemsPerPage = 4;
		this.maxPage = 10;
	}
	// 데이터 불러오기
	async fetchNoticeData(url) {
		try {
			const res = await fetch(url);
			if (!res.ok) {
				throw new Error(`${res.statusText}`);
			}
			return await res.json();
		} catch (err) {
			console.error(err);
			throw err;
		}
	}

	// 페이지네이션
	getTotalPages(data) {
		return Math.ceil(data.length / this.itemsPerPage);
	}

	handlePageChange(pageNumber) {
		this.currentPage = pageNumber;
		this.render();
	}

	createPagination() {
		const paginationContainer = document.createElement('div');
		paginationContainer.classList.add('pagination-list');

		const buttons = [
			{ text: '«', onClick: () => this.handlePageChange(1) },
			{
				text: '‹',
				onClick: () => this.handlePageChange(Math.max(1, this.currentPage - this.maxPage)),
			},
		];

		buttons.forEach(({ text, onClick }) => {
			const button = document.createElement('button');
			button.innerText = text;
			button.classList.add('button-inactive');
			button.addEventListener('click', onClick);
			paginationContainer.append(button);
		});

		const startPage = Math.floor((this.currentPage - 1) / this.maxPage) * this.maxPage + 1;
		const endPage = Math.min(startPage + this.maxPage - 1, this.getTotalPages(noticeData));

		for (let i = startPage; i <= endPage; i++) {
			const pageButton = document.createElement('button');
			pageButton.innerText = i;
			pageButton.classList.add('button-inactive', 'page-button');
			if (i === this.currentPage) {
				pageButton.classList.remove('button-inactive');
				pageButton.classList.add('button-active');
			}
			pageButton.addEventListener('click', () => this.handlePageChange(i));
			paginationContainer.append(pageButton);
		}

		const nextButtons = [
			{
				text: '›',
				onClick: () =>
					this.handlePageChange(
						Math.min(this.getTotalPages(noticeData), this.currentPage + this.maxPage),
					),
			},
			{ text: '»', onClick: () => this.handlePageChange(this.getTotalPages(noticeData)) },
		];

		nextButtons.forEach(({ text, onClick }) => {
			const button = document.createElement('button');
			button.innerText = text;
			button.classList.add('button-inactive');
			button.addEventListener('click', onClick);
			paginationContainer.append(button);
		});

		return paginationContainer;
	}

	createList(noticeData) {
		const ulElement = document.createElement('ul');
		ulElement.classList.add('notice-list');

		noticeData.forEach((item) => {
			const liElement = document.createElement('li');
			liElement.classList.add('notice-item');
			liElement.setAttribute('data-index', item.index);
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

	addUlListener(element) {
		element.addEventListener('click', (event) => {
			let target = event.target;

			while (target && target.tagName !== 'LI') {
				target = target.parentElement;
			}

			const tagName = target.tagName;
			if (target && tagName === 'LI') {
				const index = target.getAttribute('data-index');
				const selectedData = noticeData[index];

				//상세 페이지로 이동
				// if (selectedData) {
				// 	window.location.href = `/notice/${selectedData.index}`;
				// }

				window.alert(index);
			}
		});
	}

	render() {
		const noticePageContainer = document.createElement('div');
		noticePageContainer.classList.add('contents');

		const noticeInit = `
      <h1 class="notice__title">공지사항</h1>
      <section class="notice-section">
        <div class="notice-container">
          <form class="search-container">
            <input class="search__input" placeholder="search">
            <img class="search__img" src="../../assets/icons/icon_search.svg" alt="검색">
          </form>
          <div id="list-container"></div>
          <div id="pagination-container"></div>
        </div>
      </section>`;

		noticePageContainer.innerHTML = noticeInit;

		const listContainer = noticePageContainer.querySelector('#list-container');
		const paginationContainer = noticePageContainer.querySelector('#pagination-container');

		const startIndex = (this.currentPage - 1) * this.itemsPerPage;
		const endIndex = startIndex + this.itemsPerPage;
		const currentData = noticeData.slice(startIndex, endIndex);

		const list = this.createList(currentData);
		listContainer.append(list);
		this.addUlListener(listContainer);

		const pagination = this.createPagination();
		paginationContainer.append(pagination);

		return noticePageContainer.innerHTML;
	}
}
