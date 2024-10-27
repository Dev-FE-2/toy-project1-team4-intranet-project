import './style.css';

export default function Notice() {
	return `<div class="contents">
		<h1 class="notice__title">공지사항</h1>
		<section class="notice-section">
			<div class="notice-container">
				<form class="search-container">
					<input class="search__input" placeholder="search">
					<img class="search__img" src="../../assets/icons/icon_search.svg" alt="검색">
				</form>
				<ul class="notice-list">
					<!-- 공지사항 리스트가 여기에 추가됩니다 -->
					<li class="notice-item">
						<img class="notice-item__img" src="https://picsum.photos/300/400"
							alt="공지사항 이미지">
						<div class="notice-info">
							<h3 class="notice-info__title">공지사항 제목 1</h3>
							<p class="notice-info__content">Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Quisquam, totam sit
								itaque natus ex sequi fugit accusamus delectus nam dolorem nemo alias?
								Fugit
								nemo laudantium minima asperiores hic esse quia.</p>
						</div>
					</li>
					<li class="notice-item">
						<img class=notice-item__img src="https://picsum.photos/300/400" alt="공지사항 이미지">
						<div class="notice-info">
							<h3 class="notice-info__title">공지사항 제목 2</h3>
							<p class="notice-info__content">Lorem, ipsum dolor sit amet consectetur
								adipisicing elit. Fugiat quisquam
								alias saepe asperiores, facilis ipsa ex libero inventore delectus
								ducimus
								eveniet perferendis ut officiis unde, sit autem sequi? Tempora,
								voluptatem?
							</p>
						</div>
					</li>
					<li class="notice-item">
						<img class=notice-item__img src="https://picsum.photos/300/400" alt="공지사항 이미지">
						<div class="notice-info">
							<h3 class="notice-info__title">공지사항 제목 3</h3>
							<p class="notice-info__content">Lorem ipsum dolor sit amet consectetur,
								adipisicing elit. Iusto ducimus
								cumque nulla rem sapiente amet soluta aliquid consequatur temporibus
								aspernatur libero nam tenetur exercitationem dolorem commodi modi
								quibusdam,
								at minima?</p>
						</div>
					</li>
					<li class="notice-item">
						<img class=notice-item__img src="https://picsum.photos/300/400" alt="공지사항 이미지">
						<div class="notice-info">
							<h3 class="notice-info__title">공지사항 제목 4</h3>
							<p class="notice-info__content">Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Delectus ratione in
								asperiores facilis aut ipsa dolore quibusdam unde, nemo soluta
								dignissimos
								modi deserunt fuga ea fugit itaque obcaecati ex natus!</p>
						</div>
					</li>
				</ul>
				<!-- Pagination (PC 전용) -->
				<ul class="pagination-list">
					<li class="pagination-item"><button class="button-inactive">&laquo;</button></li>
					<li class="pagination-item"><button class="button-inactive">&lsaquo;</button></li>
					<li class="pagination-item"><button class="button-active">1</button></li>
					<li class="pagination-item"><button class="button-inactive">2</button></li>
					<li class="pagination-item"><button class="button-inactive">3</button></li>
					<li class="pagination-item"><button class="button-inactive">4</button></li>
					<li class="pagination-item"><button class="button-inactive">5</button></li>
					<li class="pagination-item"><button class="button-inactive">6</button></li>
					<li class="pagination-item"><button class="button-inactive">7</button></li>
					<li class="pagination-item"><button class="button-inactive">8</button></li>
					<li class="pagination-item"><button class="button-inactive">9</button></li>
					<li class="pagination-item"><button class="button-inactive">10</button></li>
					<li class="pagination-item"><button class="button-inactive">&rsaquo;</button></li>
					<li class="pagination-item"><button class="button-inactive">&raquo;</button></li>
				</ul>
			</div>
		</section>
	</div>`;
}
