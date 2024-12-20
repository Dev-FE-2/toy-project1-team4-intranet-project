import { url, urlLabel } from '../../../router';
import { authManager, routerManager } from '../../../store';
import './style.css';

export default class LoginStatus {
	#parentEl;
	#state;

	constructor(parentEl) {
		authManager.subscribeListener(this.observeAuthListenr.bind(this));
		routerManager.subscribeListener(this.observeRouteListenr.bind(this));

		this.#parentEl = parentEl;
		this.#state = {
			path: window.location.pathname,
			isAuthenticated: authManager.isAuthenticated,
			profileImage: authManager.profileImage,
		};
	}

	setState(newState) {
		const prevState = this.#state; // 이전 상태 보존
		this.#state = { ...prevState, ...newState }; // 새 상태로 업데이트

		// 현 상태와 이전 상태 차이가 있을 때만 해당 영역 업데이트
		if (prevState.path !== this.#state.path) {
			this.#updateActiveLink();

			return;
		}

		this.render();
	}

	observeAuthListenr(newStateFromAuth) {
		const newIsAuthenticated = newStateFromAuth.isAuthenticated;

		if (this.#state.isAuthenticated !== newIsAuthenticated) {
			this.setState({ isAuthenticated: newIsAuthenticated });
		}
	}

	observeRouteListenr(newStateFromRoute) {
		const newPath = newStateFromRoute.path;

		if (this.#state.path !== newPath) {
			this.setState({ path: newPath });
		}
	}

	#getStyleClassName(href) {
		return this.#state.path === href ? 'active' : '';
	}

	#updateActiveLink() {
		this.#parentEl.querySelectorAll('a').forEach((anchorElement) => {
			const href = anchorElement.getAttribute('href');
			anchorElement.className = this.#getStyleClassName(href);
		});
	}

	get #linkTemplate() {
		const navList = ['login', 'signup'];

		return `<nav class="login-links">
			${navList
				.map((pageName) => {
					const href = url[pageName];
					const className = this.#getStyleClassName(href);

					return `<a href="${href}" class="${className}">${urlLabel[pageName]}</a>`;
				})
				.join('')}
		</nav>`;
	}

	get #profileTemplate() {
		return `<img class="profile-img" src="${this.#state.profileImage}" alt="프로필 사진" />`;
	}

	get #template() {
		return `<div class="user-status">
			${this.#state.isAuthenticated ? this.#profileTemplate : this.#linkTemplate}
		</div>`;
	}

	#logoutListener() {
		const element = document.querySelector('.profile-img');

		if (element) {
			element.addEventListener('click', authManager.logout);
		}
	}

	render() {
		this.#parentEl.innerHTML = this.#template;
		this.#logoutListener();
	}
}
