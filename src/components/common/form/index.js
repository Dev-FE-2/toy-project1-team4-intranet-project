import Input from './input';

export default class Form {
	#parentEl;
	#formElement;

	constructor(parentEl, fields) {
		this.#parentEl = parentEl;
		this.state = {
			fields,
		};
	}

	get fieldset() {
		const html = this.state.fields.map((field) => new Input(field).render());

		return html.join('');
	}

	get submitButton() {
		return `<div class="btn-wrap">
                    <button class="btn btn--primary" type="submit">회원가입</button>
                </div>`;
	}

	get template() {
		return `<form id="signUpForm" method="post" class="form"></form>`;
	}

	render() {
		this.#parentEl.innerHTML = this.template;
		this.#formElement = document.querySelector('#signUpForm');
		this.#formElement.insertAdjacentHTML('beforeend', this.fieldset);
		this.#formElement.insertAdjacentHTML('beforeend', this.submitButton);
	}
}
