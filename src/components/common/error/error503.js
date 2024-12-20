import { ButtonGroup } from '../form';
import '../style.css';
import Img503 from '../../../assets/503.svg';

export default class Error503 {
	#parentEl;

	constructor(parentEl) {
		this.#parentEl = parentEl;
	}

	get #buttonTemplate() {
		return new ButtonGroup([
			{
				label: '확인',
				colorType: 'primary',
				elementType: 'anchor',
				anchorLink: `${window.location.pathname}`,
			},
		]).render();
	}

	get #template() {
		return `<div class="error">
			<img src="${Img503}" alt="">
			<p>일시적으로 중단되었습니다. <br>다시 시도해주세요.</p>
			${this.#buttonTemplate}
		</div>`;
	}

	render() {
		this.#parentEl.innerHTML = this.#template;

		return this.#template;
	}
}
