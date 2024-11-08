import { fetchUserData } from '../../apis/userApi';
import { route } from '../../router/route';
import { Error503 } from '../../components/common';
import Form from '../../components/common/form';
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

	#login() {
		console.log('로그인');
	}

	async render() {
		this.#contentsElement.innerHTML = this.#template;
		this.#formContainerEl = document.querySelector('#formContainer');
		new Form(this.#formContainerEl, this.#fieldDatas, this.#buttonDatas).render();

		this.#formContainerEl.addEventListener('submit', this.#login.bind(this));
	}
}
