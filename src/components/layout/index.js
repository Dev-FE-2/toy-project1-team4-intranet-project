import { url } from '../../router/url';
import Navigation from './navigation';
import LoginStatus from './loginStatus';
import './style.css';
import Logo from '/public/logo.svg';

export default class Layout {
	constructor() {}

	get #template() {
		const navigation = new Navigation();
		const loginStatus = new LoginStatus();

		return `<div class="layout">
				<header class="layout__header">
					<a href="${url.home}"><img class="logo-img" src="${Logo}" alt="EVEN" /></a>
					<div class="header__mobile-user-status">${loginStatus.render()}</div>
					${navigation.render()}
				</header>
			    <div class="layout__body">
					<aside class="layout__desktop-top-bar">
						${loginStatus.render()}
					</aside>
					<main class="layout__page-container">
						<div id="pageContents" class="contents-wrap"></div>
					</main>
				</div>
				<div class="layout__mobile-bottom-nav-bar">
					${navigation.render()}
				</div>
		</div>`;
	}

	render() {
		return this.#template;
	}
}
