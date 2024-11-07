import { fetchUserData } from '../../apis/userProfileApi';
import { route } from '../../router/route';
import { Error503 } from '../../components/common';
import Form from '../../components/common/form';
import { FORM_FIELDS } from './formFields';

export default class LoginPage {
	#contentsElement;
	#formContainerEl;
	#fields = FORM_FIELDS;

	constructor(contentsElement) {
		this.#contentsElement = contentsElement;
	}

	get #template() {
		return `<section class="contents">
					<h1 class="page-title">로그인</h1>
					<div id="formContainer" class="form-container"></div>
				</section>`;
	}

	#login() {
		console.log('로그인');
	}

	async render() {
		this.#contentsElement.innerHTML = this.#template;
		this.#formContainerEl = document.querySelector('#formContainer');
		new Form(this.#formContainerEl, this.#fields).render();

		this.#formContainerEl.addEventListener('submit', this.#login.bind(this));
	}
}
