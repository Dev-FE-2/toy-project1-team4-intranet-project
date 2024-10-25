import './style.css';

export default function NoticeDetail() {
	return `<section class="notice-detail">
		<h1 class="notice-title">공지사항 제목입니다</h1>
		<div class="notice-info">
			<span class="notice-info__writer">김철수</span>
			<span class="seperator">|</span>
			<span class="notice-info__cdate">2024.10.10</span>
		</div>
		<div class="notice-detail__container">
			<img class="notice-detail__img" src="https://picsum.photos/800/300" alt="공지사항 이미지">
				<p class="notice-detail__article">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi aspernatur aut commodi debitis id nisi odit officiis quaerat, quidem sequi. Architecto aspernatur enim iure quis voluptates voluptatibus! Consequatur cum esse obcaecati tempore. Asperiores beatae cumque doloribus exercitationem magni porro quo sed! Ad blanditiis cupiditate, eos exercitationem harum itaque officia quod.
				</p>
		</div>
	</section>`;
}
