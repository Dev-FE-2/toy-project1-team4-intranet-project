import Button from './button';

export default class ButtonGroup {
	#buttonDatas = [];

	constructor(buttonDatas) {
		this.#buttonDatas = buttonDatas;
	}

	get #template() {
		const buttons = this.#buttonDatas.map((buttonData) => new Button(buttonData).render()).join('');

		return `<div class="btn-wrap">${buttons}</div>`;
	}

	render() {
		return this.#template;
	}
}
