export default class Input {
	#state;

	constructor({ label, inputType, inputName, inputValue = '', required = '' }) {
		this.#state = {
			label,
			inputType,
			inputName,
			inputValue,
			required,
		};
	}

	render() {
		const { label, inputType, inputName, inputValue, required } = this.#state;

		const inputTemplate = `<fieldset>
									<legend>${label}</legend>
									<input 
										type="${inputType}" 
										class="form-item" 
										placeholder="${label}" 
										id="${inputName}" 
										name="${inputName}" 
										value="${inputValue}" 
										${required ? 'required' : ''}
									/>
								</fieldset>`;

		const textareaTemplate = `<fieldset>
									<legend>${label}</legend>
									<textarea 
										class="form-item" 
										placeholder="${label}" 
										id="${inputName}" 
										name="${inputName}" 
										value="${inputValue}" 
										${required ? 'required' : ''}
									></textarea>
								</fieldset>`;

		return inputType === 'textarea' ? textareaTemplate : inputTemplate;
	}
}
