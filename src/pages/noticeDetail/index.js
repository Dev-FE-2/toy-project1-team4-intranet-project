import './style.css';
import NoticeApi from '../../apis/noticeApi';

export default class NoticeDetail {
	constructor(noticeId) {
		this.noticeId = noticeId;
		this.api = new NoticeApi();
		this.notice = null;
	}

	// 데이터 초기화 및 로드
	async initializeData() {
		try {
			const { notice } = await this.api.getNoticeById(this.noticeId);
			this.notice = notice;
		} catch (error) {
			console.error('Failed to fetch notice detail:', error);
			throw error;
		}
	}

	getNoticeDetailTemplate() {
		if (!this.notice) return '';

		const { title, content, writer, created_date, image_data } = this.notice;

		return `
            <section class="notice-detail">
                <h1 class="notice-detail__title">${title}</h1>
                <div class="notice-detail__meta">
                    <span class="notice-detail__date">${created_date}</span>
                    <span class="notice-detail__separator">|</span>
                    <span class="notice-detail__writer">${writer}</span>
                </div>
                <div class="notice-detail__content">
                    <img class="notice-detail__image" 
                         loading="lazy"
                         src="data:image/jpeg;base64,${image_data}" 
                         alt="공지사항 이미지">
                    <p class="notice-detail__text">
                        ${content}
                    </p>
                </div>
            </section>
        `;
	}

	render() {
		// 초기 로딩 템플릿 반환
		const loadingTemplate = `
            <section class="notice-detail">
                <div class="loading">Loading...</div>
            </section>
        `;

		// 데이터 로드 시작
		this.initializeData()
			.then(() => {
				// 콘텐츠 업데이트
				const contentElement = document.querySelector('#pageContents');
				if (contentElement) {
					contentElement.innerHTML = this.getNoticeDetailTemplate();
				}
			})
			.catch(() => {
				// 에러 처리
				const contentElement = document.querySelector('#pageContents');
				if (contentElement) {
					contentElement.innerHTML = `
                        <section class="notice-detail notice-detail--error">
                            <h1>오류가 발생했습니다</h1>
                            <p>공지사항을 불러오는 중 문제가 발생했습니다.</p>
                        </section>
                    `;
				}
			});

		// 초기 로딩 템플릿 반환
		return loadingTemplate;
	}
}
