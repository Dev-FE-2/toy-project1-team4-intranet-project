import Logo from '/public/logo.svg';
import Navigation from '../Navigation/index.js';
import SamplePage from '../../../pages/sample/index.js';
import './style.css';

export default function MobileLayout() {
	return `
		<div class="layout--mobile">
			<header class="layout--mobile__header">
				<a href="/"><img class="logo" src="${Logo}" alt="EVEN" /></a>
			</header>
			<main class="page-container--mobile">
				<div id="contents">${SamplePage()}</div>
			</main>
			<div class="bottom-nav-bar">${Navigation()}</div>
		</div>`;
}
