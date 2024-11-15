import { url, urlLabel, urlPattern } from '../../../router';
import { routerManager } from '../../../store';
import { PAGE_DATA } from './navListData';
import './style.css';

export default class Navigation {
	#parentEl;
	#state;

	constructor(parentEl) {
		this.#parentEl = parentEl;
		this.#state = {
			path: window.location.pathname,
		};

		routerManager.subscribeListener(this.observeRouteListenr.bind(this));
	}

	setState(newState) {
		const prevState = this.#state;
		this.#state = { ...prevState, ...newState };

		if (prevState.path !== this.#state.path) {
			this.#updateActiveLink();

			return;
		}

		this.render();
	}

	observeRouteListenr(newStateFromRoute) {
		const newPath = newStateFromRoute.path;

		if (this.#state.path !== newPath) {
			this.setState({ path: newPath });
		}
	}

	#getHref(pageName) {
		switch (pageName) {
			case 'profile':
				return url.profile('user123');

			default:
				return url[pageName];
		}
	}

	#getStyleClassName(href) {
		const isSamePath = this.#state.path === href;

		return isSamePath ? 'nav-item active' : 'nav-item';
	}

	#updateActiveLink() {
		this.#parentEl.querySelectorAll('a').forEach((anchorElement) => {
			const href = anchorElement.getAttribute('href');
			anchorElement.className = this.#getStyleClassName(href);
		});
	}

	get #template() {
		const navList = PAGE_DATA;

		return `<nav id="#mainNav" class="nav"><ul>${navList
			.map(({ pageName, icon }) => {
				const href = this.#getHref(pageName);
				const className = this.#getStyleClassName(href);

				return `<li>
                    <a href="${href}" class="${className}">
                        <i>${icon}</i> ${urlLabel[pageName]}
                    </a>
                </li>`;
			})
			.join('')}
        </ul></nav>`;
	}

	render() {
		this.#parentEl.innerHTML = this.#template;
	}
}
