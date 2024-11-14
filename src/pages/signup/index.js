import { postUserData } from '../../apis/userApi';
import { route, url } from '../../router';
import { errorHendler } from '../../utils/errorUtile';
import { Form } from '../../components/common/form';
import { FORM_FIELDS, FORM_BUTTONS } from './formFieldDatas';
import AvatarImg from '/public/avatar.svg';

export default class SignUpPage {
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
					<h1 class="page-title">회원가입</h1>
					<div id="formContainer" class="form-container"></div>
				</section>`;
	}

	async #signUp(event) {
		event.preventDefault();

		const formData = new FormData(this.#formContainerEl.querySelector('form'));
		const requestData = Object.fromEntries(formData.entries());

		if (process.env.NODE_ENV === 'development') console.log('회원가입 요청 데이터', requestData);

		try {
			await postUserData(formData);

			alert('회원가입이 완료 됐습니다.');
			route(url.login);
		} catch (error) {
			console.error('회원 가입 Error: ', error);

			errorHendler(this.#formInstance, this.#contentsElement, error);
		}
	}

	async render() {
		this.#contentsElement.innerHTML = this.#template;
		this.#formContainerEl = document.querySelector('#formContainer');
		this.#formInstance = new Form(this.#formContainerEl, this.#fieldDatas, this.#buttonDatas);
		this.#formInstance.render();

		this.#formContainerEl.addEventListener('submit', this.#signUp.bind(this));
	}
}
