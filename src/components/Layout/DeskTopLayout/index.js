import { route } from '../../../router/route';
import Navigation from '../Navigation';
import './style.css';
import Logo from '/public/logo.svg';

export default function DeskTopLayout() {
	const navigation = new Navigation();

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
					<div id="contents" class="contents">${route()}</div>
				</main>
			</div>
		</div>`;
}
