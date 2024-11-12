import { url, urlLabel } from '../../../router';
import { authManager } from '../../../services/auth';
import './style.css';
import Avatar from '/public/avatar.svg';

export default class LoginStatus {
	#parentEl;
	#state;

	constructor(parentEl) {
		this.#parentEl = parentEl;
		console.log('constructor newAuthState', authManager.isAuthenticated);
		this.#state = {
			path: window.location.pathname,
			isLogin: authManager.isAuthenticated,
		};
		authManager.subscribeListener(this.observeListenr.bind(this));
	}

	setState(newState) {
		this.#state = { ...this.#state, ...newState };
		this.render();
	}

	observeListenr(newStateFromAuth) {
		console.log('observeListenr newStateFromAuth', newStateFromAuth);

		const newIsLogin = newStateFromAuth.isAuthenticated;
		console.log('newIsLogin', newIsLogin);
		console.log('this.#state.isLogin', this.#state.isLogin);

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
		return `<img class="avatar-img" src="${Avatar}" alt="프로필 사진" />`;
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
