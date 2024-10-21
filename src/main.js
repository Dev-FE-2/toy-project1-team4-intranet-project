import './global.css';
import Logo from '/public/logo.svg';
import { setupCounter } from './counter.js';

async function app() {
	document.querySelector('#app').innerHTML = `
    <div class="layout">
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
					<div id="contents" class="contents">
						<section>
							<h1 class="page-title">페이지 타이틀</h1>

							<form action="" class="form">
								<fieldset>
									<legend>이름</legend>
									<input type="text" class="form-item" placeholder="이름" />
								</fieldset>
								<fieldset>
									<legend>포지션</legend>
									<input type="text" class="form-item" placeholder="포지션" />
								</fieldset>
								<div class="btn-wrap">
									<button class="btn btn--secondary" type="button">취소</button>
									<button class="btn btn--primary" type="submit">확인</button>
								</div>
                <div id="counter"></div>
							</form>
						</section>
					</div>
				</main>
			</div>
		</div>
  `;

	setupCounter(document.querySelector('#counter'));
}

document.addEventListener('DOMContentLoaded', app);
