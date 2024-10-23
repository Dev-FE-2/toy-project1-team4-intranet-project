import Logo from '/public/logo.svg';
import Navigation from '../Navigation/index.js';
import SamplePage from '../../../pages/sample/index.js';
import './style.css';

export default function DeskTopLayout() {
	return `<div class="layout--desktop">
			<div class="layout__left">
				<header class="header--desktop">
					<a href="/"><div class="header--desktop__logo"><img src="${Logo}" alt="EVEN" /></div></a>
					${Navigation()}
				</header>
			</div>
			<div class="layout__right">
				<aside class="top-bar">
					<div class="avatar"></div>
				</aside>
				<main class="page-container--desktop">
					<div id="contents" class="contents">${SamplePage()}</div>
				</main>
			</div>
		</div>`;
}
