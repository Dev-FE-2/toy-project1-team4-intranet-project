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
		document.body.addEventListener('click', navigate); // 기준이 되는 요소인 DOM이 제거되면 이벤트 리스너가 삭제되므로 최상단 DOM에 이벤트를 위임
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
