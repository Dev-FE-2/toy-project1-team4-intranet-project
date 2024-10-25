import Navigation from '../Navigation';
import SamplePage from '../../../pages/sample';
import './style.css';
import Logo from '/public/logo.svg';
import Avatar from '/public/avatar.svg';
export default function MobileLayout() {
	return `
		<div class="layout--mobile">
			<header class="header--mobile">
				<a href="/"><img class="header--mobile__logo-img" src="${Logo}" alt="EVEN" /></a>
				<a href="/profile/:user"><img class="header--mobile__avatar-img" src="${Avatar}" alt="프로필 사진" /></a>
			</header>
			<main class="page-container--mobile">
				<div id="contents">${SamplePage()}</div>
			</main>
			<div class="bottom-nav-bar">${Navigation()}</div>
		</div>`;
}
