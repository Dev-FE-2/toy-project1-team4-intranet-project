import { postUserData } from '../../apis/userProfileApi';
import { route } from '../../router/route';
import { Error503 } from '../../components/common';
import Form from '../../components/common/form';
import { FORM_FIELDS } from './formFields';
import AvatarImg from '/public/avatar.svg';

export default class SignUpPage {
	#contentsElement;
	#formContainerEl;
	#fields = FORM_FIELDS;

	constructor(contentsElement) {
		this.#contentsElement = contentsElement;
	}

	async createFormData(event) {
		event.preventDefault();

		const formData = new FormData(this.#formContainerEl.querySelector('form'));

		if (process.env.NODE_ENV === 'development') {
			const requestData = Object.fromEntries(formData.entries());
			console.log('전달 될 데이터', requestData);
		}

		try {
			const response = await postUserData(formData);

			if (process.env.NODE_ENV === 'development') {
				console.log('회원 가입 response: ', response);
			}

			alert('회원가입을 완료 했습니다.');
			route('/login');
		} catch (error) {
			console.error('회원 가입 Error: ', error);

			const element = document.querySelector('#formContainer');
			new Error503(element).render();
		}
	}

	get #template() {
		return `<section class="contents">
					<h1 class="page-title">회원가입</h1>
					<div id="formContainer" class="form-container"></div>
				</section>`;
	}

	async render() {
		this.#contentsElement.innerHTML = this.#template;
		this.#formContainerEl = document.querySelector('#formContainer');
		new Form(this.#formContainerEl, this.#fields).render();

		this.#formContainerEl.addEventListener('submit', this.createFormData.bind(this));
	}
}
