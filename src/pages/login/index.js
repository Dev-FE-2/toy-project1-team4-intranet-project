import { loginUser } from '../../apis/userApi';
import { route, url } from '../../router';
import { authManager } from '../../services/auth';
import { Error503 } from '../../components/common';
import { Form } from '../../components/common/form';
import { FORM_FIELDS, FORM_BUTTONS } from './formFieldDatas';

export default class LoginPage {
	#contentsElement;
	#formContainerEl;
	#fieldDatas = FORM_FIELDS;
	#buttonDatas = FORM_BUTTONS;
	#formInstance;

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

		try {
			const { user_id: userId } = await loginUser(requestData);

			authManager.login({ userId });
			route(url.home);
		} catch (error) {
			if (process.env.NODE_ENV === 'development') console.log('로그인 데이터', requestData);
			console.error('로그인 Error: ', error);

			this.#errorHendler(error);
		}
	}

	async #errorHendler(error) {
		const { errorCode, errorMessage } = error;

		if (errorCode >= 500) {
			const element = document.querySelector('#formContainer');
			new Error503(element).render();
		}

		this.#formInstance.setError({ errorMessage });
	}

	async render() {
		this.#contentsElement.innerHTML = this.#template;
		this.#formContainerEl = document.querySelector('#formContainer');
		this.#formInstance = new Form(this.#formContainerEl, this.#fieldDatas, this.#buttonDatas);
		this.#formInstance.render();

		this.#formContainerEl.addEventListener('submit', this.#login.bind(this));
	}
}
