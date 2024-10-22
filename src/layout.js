import Logo from '/public/logo.svg';
import SamplePage from './pages/sample/index.js';

export default function Layout() {
	return `<div class="layout">
			<div class="layout__left">
				<header class="gnb">
					<a href="/"><img class="logo" src="${Logo}" alt="EVEN" /></a>
					<nav class="nav">
						<ul>
							<li>
								<a href="/" class="nav-item active"><i class="icon--home"></i> 마이페이지</a>
							</li>
							<li>
								<a href="/profile/:user" class="nav-item"><i class="icon--profile"></i> 프로필</a>
							</li>
							<li>
								<a href="/vacation" class="nav-item"><i class="icon--timetable"></i> 근태 신청</a>
							</li>
							<li>
								<a href="/notice" class="nav-item"><i class="icon--notice"></i> 공지사항</a>
							</li>
							<li>
								<a href="/admin/employees" class="nav-item"
									><i class="icon--employee"></i> 직원 구성원</a
								>
							</li>
						</ul>
					</nav>
				</header>
			</div>
			<div class="layout__right">
				<aside class="top-bar">
					<div class="avatar"></div>
				</aside>
				<main class="page-container">
					<div id="contents" class="contents">${SamplePage()}</div>
				</main>
			</div>
		</div>`;
}
