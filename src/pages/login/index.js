import { loginUser } from '../../apis/userApi';
import { route, url } from '../../router';
import { Error503 } from '../../components/common';
import { Form } from '../../components/common/form';
import { FORM_FIELDS, FORM_BUTTONS } from './formFieldDatas';

export default class LoginPage {
	#contentsElement;
	#formContainerEl;
	#fieldDatas = FORM_FIELDS;
	#buttonDatas = FORM_BUTTONS;

	constructor(contentsElement) {
		this.#contentsElement = contentsElement;
	}

	get #template() {
		return `<section class="contents">
			<h1 class="page-title">로그인</h1>
			<div id="formContainer" class="form-container"></div>
		</section>`;
	}

	async #login(event) {
		event.preventDefault();

		const formData = new FormData(this.#formContainerEl.querySelector('form'));
		const requestData = Object.fromEntries(formData.entries());

		if (process.env.NODE_ENV === 'development') console.log('로그인 데이터', requestData);

		try {
			const response = await loginUser(requestData);

			if (process.env.NODE_ENV === 'development') console.log('로그인 response: ', response);

			route(url.home);
		} catch (error) {
			console.error('로그인 Error: ', error);

			const element = document.querySelector('#formContainer');
			new Error503(element).render();
		}
	}

	async render() {
		this.#contentsElement.innerHTML = this.#template;
		this.#formContainerEl = document.querySelector('#formContainer');
		new Form(this.#formContainerEl, this.#fieldDatas, this.#buttonDatas).render();

		this.#formContainerEl.addEventListener('submit', this.#login.bind(this));
	}
}
