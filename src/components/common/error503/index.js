import '../style.css';
import Img503 from '../../../assets/503.svg';

export default class Error503 {
	#parentEl;
	#template;

	constructor(parentEl) {
		this.#parentEl = parentEl;
		this.#template = `<div class="error" >
							<img src="${Img503}" alt="">
							<p>일시적으로 중단되었습니다. <br>다시 시도해주세요.</p>
						</div>`;
	}

	render() {
		this.#parentEl.innerHTML = this.#template;

		return this.#template;
	}
}
