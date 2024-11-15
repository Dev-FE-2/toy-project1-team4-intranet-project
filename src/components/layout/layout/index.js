import { route, navigate, url } from '../../../router';
import Navigation from '../navigation';
import LoginStatus from '../loginStatus';
import './style.css';
import Logo from '/public/logo.svg';

export default class Layout {
	#appElement;

	constructor(appElement) {
		this.#appElement = appElement;
	}

	get #layoutTemplate() {
		return `<div class="layout">
				<header class="layout__header">
					<a href="${url.home}"><img class="logo-img" src="${Logo}" alt="EVEN" /></a>
					<div id="mobileLoginStatus" class="header__mobile-user-status">{__loginStatus__}</div>
					<div id="pcNavigation">{__navigation__}</div>
				</header>
			    <div class="layout__body">
					<aside id="pcLoginStatus" class="layout__desktop-top-bar">
						{__loginStatus__}
					</aside>
					<main class="layout__page-container">
						<div id="pageContents" class="contents-wrap"></div>
					</main>
				</div>
				<div id="mobileNavigation" class="layout__mobile-bottom-nav-bar">
					{__navigation__}
				</div>
		</div>`;
	}

	#routeHandler() {
		const navElements = document.querySelectorAll('nav');
		navElements.forEach((navEl) => {
			navEl.addEventListener('click', navigate);
		});

		window.addEventListener('popstate', route);
		route();
	}

	#renderChildrenComponents(coponents) {
		coponents.forEach(({ ClassComponent, elementSelectors }) => {
			elementSelectors.forEach((selector) => {
				const element = document.querySelector(selector);

				new ClassComponent(element).render();
			});
		});
	}

	render() {
		this.#appElement.innerHTML = this.#layoutTemplate;
		this.#renderChildrenComponents([
			{
				ClassComponent: Navigation,
				elementSelectors: ['#pcNavigation', '#mobileNavigation'],
			},
			{
				ClassComponent: LoginStatus,
				elementSelectors: ['#pcLoginStatus', '#mobileLoginStatus'],
			},
		]);

		this.#routeHandler();
	}
}
