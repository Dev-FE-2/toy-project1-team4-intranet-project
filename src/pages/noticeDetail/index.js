import './style.css';
import noticeData from '../notice/noticeList';

export default class NoticeDetail {
	constructor(noticeId) {
		this.noticeId = noticeId;
	}
	async fetchNoticeDetailData(url) {
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

	getNoticeDetailData(data, findNumber) {
		return data.findIndex((item) => item.notice_id === findNumber);
	}

	render() {
		const notice = noticeData[this.getNoticeDetailData(noticeData, +this.noticeId)];

		return `<section class="notice-detail">
		<h1 class="notice-title">${notice.title}</h1>
		<div class="notice-info">
			<span class="notice-info__writer">${notice.created_date}</span>
			<span class="separator">|</span>
			<span class="notice-info__cdate">${notice.writer}</span>
		</div>
		<div class="notice-detail__container">
			<img class="notice-detail__img" src="${notice.image_url}" alt="공지사항 이미지">
				<p class="notice-detail__article">
				${notice.content}
				</p>
		</div>
	</section>`;
	}
}
