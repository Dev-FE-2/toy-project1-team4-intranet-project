import Navigation from '../Navigation';
import SamplePage from '../../../pages/sample';
import './style.css';
import Logo from '/public/logo.svg';

export default function DeskTopLayout() {
	const navigation = new Navigation();
	const mainPage = new SamplePage().render();

	return `<div class="layout--desktop">
			<div class="layout__left">
				<header class="header--desktop">
					<a href="/"><div class="header--desktop__logo"><img src="${Logo}" alt="EVEN" /></div></a>
					${navigation.render()}
				</header>
			</div>
			<div class="layout__right">
				<aside class="top-bar">
					<div class="avatar"></div>
				</aside>
				<main class="page-container--desktop">
					<div id="contents">${mainPage}</div>
				</main>
			</div>
		</div>`;
}
