import Input from './input';
import ButtonGroup from './buttonGroup';

export default class Form {
	#parentEl;
	#formElement;
	#state;

	constructor(parentEl, fieldDatas, buttonDatas) {
		this.#parentEl = parentEl;
		this.#state = {
			fieldDatas,
			buttonDatas,
		};
	}

	get #fieldset() {
		const html = this.#state.fieldDatas.map((fieldData) => new Input(fieldData).render());

		return html.join('');
	}

	get #buttons() {
		return new ButtonGroup(this.#state.buttonDatas).render();
	}

	get #template() {
		return `<form id="signUpForm" method="post" class="form"></form>`;
	}

	render() {
		this.#parentEl.innerHTML = this.#template;
		this.#formElement = document.querySelector('#signUpForm');
		this.#formElement.insertAdjacentHTML('beforeend', this.#fieldset);
		this.#formElement.insertAdjacentHTML('beforeend', this.#buttons);
	}
}
