import { url, urlLabel } from '../../../router';
import { authManager } from '../../../services/auth';
import './style.css';
import Avatar from '/public/avatar.svg';

export default class LoginStatus {
	#state;

	constructor() {
		this.#state = {
			isLogin: false,
			path: window.location.pathname,
		};
	}

	#init() {
		this.#state.isLogin = authManager.isAuthenticated();
	}

	setState(newState) {
		this.#state = { ...this.#state, ...newState };
		this.render();
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

	render() {
		this.#init();

		return this.#template;
	}
}
