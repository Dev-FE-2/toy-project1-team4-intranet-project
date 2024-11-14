import defaultImage from '/public/avatar.svg';

export default class Input {
	#label;
	#inputType;
	#inputName;
	#inputValue;
	#required;
	#fileAccept;

	constructor({ label, inputType, inputName, inputValue = '', required = '', fileAccept }) {
		this.#label = label;
		this.#inputType = inputType;
		this.#inputName = inputName;
		this.#inputValue = inputValue;
		this.#required = required;
		this.#fileAccept = fileAccept;
	}

	get #textareaTemplate() {
		return `<fieldset>
			<legend>${this.#label}</legend>
			<textarea 
				class="form-item" 
				placeholder="${this.#label}" 
				id="${this.#inputName}" 
				name="${this.#inputName}" 
				value="${this.#inputValue}" 
				${this.#required ? 'required' : ''}
			></textarea>
		</fieldset>`;
	}

	get #inputTemplate() {
		return `<fieldset>
			<legend>${this.#label}</legend>
			<input 
				type="${this.#inputType}" 
				class="form-item" 
				placeholder="${this.#label}" 
				id="${this.#inputName}" 
				name="${this.#inputName}" 
				value="${this.#inputValue}" 
				${this.#required ? 'required' : ''}
			/>
		</fieldset>`;
	}

	get #fileInputTemplate() {
		return `<fieldset>
			<legend>${this.#label}</legend>
			<label for="${this.#inputName}" class="form-file-preview">
				<img src="${defaultImage}" alt="등록할 프로필 사진 이미지" id="previewImage">
			</label>
			<input 
				type="${this.#inputType}" 
				class="form-item" 
				placeholder="${this.#label}" 
				id="${this.#inputName}" 
				name="${this.#inputName}" 
				value="${this.#inputValue}" 
				${this.#required ? 'required' : ''}
				accept=${this.#fileAccept}
			/>
		</fieldset>`;
	}

	render() {
		switch (this.#inputType) {
			case 'textarea':
				return this.#textareaTemplate;

			case 'file':
				return this.#fileInputTemplate;

			default:
				return this.#inputTemplate;
		}
	}
}
