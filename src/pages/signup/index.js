import { postUserData } from '../../apis/userProfileApi';
import { route } from '../../router/route';
import { Error503 } from '../../components/common';
import Form from '../../components/common/form';
import { formFields } from './data/formFields';
import AvatarImg from '/public/avatar.svg';

export default class SignUpPage {
	#contentsElement;
	#formContainerEl;
	#fields;

	constructor(contentsElement) {
		this.#contentsElement = contentsElement;
		this.#fields = formFields;
	}

	async createFormData(event) {
		event.preventDefault();

		const formData = new FormData(this.#formContainerEl.querySelector('form'));

		try {
			const response = await postUserData(formData);

			console.log(response);

			alert('회원가입을 완료했습니다.');
			route('/login');
		} catch (error) {
			console.error(error);

			if (process.env.NODE_ENV === 'development') {
				console.log('작성한 formData', Object.fromEntries(formData.entries()));
			}

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
