import { url, urlLabel } from '../../../router';
import { authManager } from '../../../services/auth';
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
		authManager.subscribeListener(this.observeListenr.bind(this));
	}

	setState(newState) {
		this.#state = { ...this.#state, ...newState };
		this.render();
	}

	observeListenr(newStateFromAuth) {
		const newIsLogin = newStateFromAuth.isAuthenticated;

		if (this.#state.isLogin !== newIsLogin) {
			this.setState({ isLogin: newIsLogin });
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
		return `<img class="avatar-img" src="${this.#state.profileImage}" alt="프로필 사진" />`;
	}

	get #template() {
		return `<div class="user-status">
			${this.#state.isLogin ? this.#profileTemplate : this.#linkTemplate}
		</div>`;
	}

	#logoutHandler() {
		const element = document.querySelector('.avatar-img');

		if (element) {
			element.addEventListener('click', authManager.logout);
		}
	}

	render() {
		this.#parentEl.innerHTML = this.#template;
		this.#logoutHandler();
	}
}
