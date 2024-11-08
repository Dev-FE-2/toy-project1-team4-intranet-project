class NoticeApi {
	constructor() {
		this.baseUrl = '/api'; // API 기본 경로
	}

	// 에러 처리 유틸리티
	async handleResponse(response) {
		if (!response.ok) {
			const error = await response.json();
			throw new Error(error.message || 'API request failed');
		}

		const data = await response.json();

		// 단일 공지사항과 공지사항 목록 모두 처리
		if (data.notice) {
			data.notice = this.processImageData(data.notice);
		}
		if (data.notices) {
			data.notices = data.notices.map((notice) => this.processImageData(notice));
		}

		return data;
	}

	// Buffer 데이터를 Base64로 변환하는 유틸리티 메서드
	processImageData(notice) {
		if (!notice.image_data) return notice;

		try {
			const imageData = notice.image_data.data;
			const base64String = Object.values(imageData)
				.map((byte) => String.fromCharCode(byte))
				.join('');

			return {
				...notice,
				image_data: btoa(base64String),
			};
		} catch (error) {
			console.error('Image processing error:', error);
			return {
				...notice,
				image_data: null,
			};
		}
	}

	// API 요청 래퍼
	async fetchApi(url, options = {}) {
		try {
			const response = await fetch(url, options);
			return this.handleResponse(response);
		} catch (error) {
			console.error(`API request failed: ${url}`, error);
			throw error;
		}
	}

	// 특정 공지사항 조회
	async getNoticeById(noticeId) {
		return this.fetchApi(`${this.baseUrl}/notice/${noticeId}`);
	}

	// 페이지네이션된 공지사항 조회
	async getNoticesByPage(page = 1, limit = 4) {
		return this.fetchApi(`${this.baseUrl}/notice/page`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ page, limit }),
		});
	}

	// 공지사항 검색
	async searchNotices(searchQuery, page = 1, limit = 4) {
		return this.fetchApi(`${this.baseUrl}/notice/search`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ searchQuery, page, limit }),
		});
	}
}

export default NoticeApi;
