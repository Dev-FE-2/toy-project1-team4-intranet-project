export default class Button {
	#states;

	constructor({
		label,
		colorType,
		elementType, // 'button' | 'anchor'
		buttonType = 'button',
		buttonId = '',
		anchorLink = '',
		anchorTarget = '',
	}) {
		this.#states = {
			label,
			colorType, // primary | secondary | danger
			className: `btn btn--${colorType}`,
			elementType,
			buttonType,
			buttonId,
			anchorLink,
			anchorTarget,
		};
	}

	get #anchorTemplate() {
		return `<a href='${this.#states.anchorLink}' target='${this.#states.anchorTarget}' class='${this.#states.className}'>${this.#states.label}</a>`;
	}

	get #buttonTemplate() {
		return `<button type='${this.#states.buttonType}' id="${this.#states.buttonId}" class='${this.#states.className}'>${this.#states.label}</button>`;
	}

	render() {
		return this.#states.elementType === 'anchor' ? this.#anchorTemplate : this.#buttonTemplate;
	}
}
