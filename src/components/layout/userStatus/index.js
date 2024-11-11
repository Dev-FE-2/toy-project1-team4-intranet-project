import { url, urlLabel } from '../../../router';
import './style.css';
import Avatar from '/public/avatar.svg';

export default class UserStatus {
	#state;

	constructor() {
		this.#state = {
			login: false,
			path: window.location.pathname,
		};
	}

	setState = (newState) => {
		this.#state = { ...this.#state, ...newState };
		this.render();
	};

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

	get #profile() {
		return `<img class="avatar-img" src="${Avatar}" alt="프로필 사진" />`;
	}

	get #template() {
		return `<div class="user-status">
                ${this.#state.login ? this.#profile : this.#linkTemplate}
            </div>`;
	}

	render() {
		return this.#template;
	}
}
