import { url, urlLabel } from '../../../router';
import { authManager, routerManager } from '../../../store';
import './style.css';

export default class LoginStatus {
	#parentEl;
	#state;

	constructor(parentEl) {
		this.#parentEl = parentEl;
		console.log('constructor newAuthState', authManager.isAuthenticated);
		this.#state = {
			path: window.location.pathname,
			isLogin: authManager.isAuthenticated,
			profileImage: authManager.profileImage,
		};
		authManager.subscribeListener(this.observeAuthListenr.bind(this));
		routerManager.subscribeListener(this.observeRouteListenr.bind(this));
	}

	setState(newState) {
		this.#state = { ...this.#state, ...newState };
		this.render();
	}

	observeAuthListenr(newStateFromAuth) {
		const newIsLogin = newStateFromAuth.isAuthenticated;

		if (this.#state.isLogin !== newIsLogin) {
			this.setState({ isLogin: newIsLogin });
		}
	}

	observeRouteListenr(newStateFromRoute) {
		const newPath = newStateFromRoute.path;

		if (this.#state.path !== newPath) {
			this.setState({ path: newPath });
		}
	}

	get #linkTemplate() {
		const navList = ['login', 'signup'];

		return `<nav class="login-links">
			${navList
				.map((page) => {
					const className = this.#state.path === url[page] ? 'active' : '';

					return `<a href="${url[page]}" class="${className}">${urlLabel[page]}</a>`;
				})
				.join('')}
		</nav>`;
	}

	get #profileTemplate() {
		return `<img class="profile-img" src="${this.#state.profileImage}" alt="프로필 사진" />`;
	}

	get #template() {
		return `<div class="user-status">
			${this.#state.isLogin ? this.#profileTemplate : this.#linkTemplate}
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
