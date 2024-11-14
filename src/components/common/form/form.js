import { observeFileListener, previewUploadImage } from '../../../utils/fileUtil';
import Input from './input';
import ButtonGroup from './buttonGroup';

export default class Form {
	#parentEl;
	#formElement;
	#fieldDatas;
	#buttonDatas;
	#state;

	constructor(parentEl, fieldDatas, buttonDatas) {
		this.#parentEl = parentEl;
		this.#fieldDatas = fieldDatas;
		this.#buttonDatas = buttonDatas;
		this.#state = {
			errorMessage: '',
		};
	}

	setError({ errorMessage }) {
		this.#state = { ...this.#state, errorMessage };
		this.#formElement.insertAdjacentHTML('beforeend', this.#errorTemplate);
	}

	get #errorTemplate() {
		return `<div class="error-message">${this.#state.errorMessage}</div>`;
	}

	get #fieldset() {
		const html = this.#fieldDatas.map((fieldData) => new Input(fieldData).render());

		return html.join('');
	}

	get #buttons() {
		return new ButtonGroup(this.#buttonDatas).render();
	}

	get #template() {
		return `<form id="form" method="post" class="form"></form>`;
	}

	render() {
		this.#parentEl.innerHTML = this.#template;
		this.#formElement = document.querySelector('#form');
		this.#formElement.insertAdjacentHTML('beforeend', this.#fieldset);
		this.#formElement.insertAdjacentHTML('beforeend', this.#buttons);
		// observeFileListener('input[type="file"]', '#previewImage');

		const previewEl = document.querySelector('#previewImage');
		const fileEl = document.querySelector('input[type="file"]');
		fileEl.addEventListener('change', () => previewUploadImage(fileEl, previewEl));
	}
}
