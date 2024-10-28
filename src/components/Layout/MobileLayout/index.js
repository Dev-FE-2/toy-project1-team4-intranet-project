import Navigation from '../Navigation';
import './style.css';
import Logo from '/public/logo.svg';
import Avatar from '/public/avatar.svg';

export default function MobileLayout() {
	const navigation = new Navigation();

	return `
		<div class="layout--mobile">
			<header class="header--mobile">
				<a href="/"><img class="header--mobile__logo-img" src="${Logo}" alt="EVEN" /></a>
				<a href="/profile/:user"><img class="header--mobile__avatar-img" src="${Avatar}" alt="프로필 사진" /></a>
			</header>
			<main class="page-container--mobile">
				<div id="pageContents" class="contents-wrap"></div>
			</main>
			<div class="bottom-nav-bar">${navigation.render()}</div>
		</div>`;
}
