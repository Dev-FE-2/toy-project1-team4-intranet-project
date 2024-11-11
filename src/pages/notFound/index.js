import Error404 from '../../components/common/error/error404';

export default class NotFound404Page {
	#parentEl;

	constructor(parentEl) {
		this.#parentEl = parentEl;
	}

	render() {
		this.#parentEl.innerHTML = `<section class="contents"></section>`;

		const contentsEl = document.querySelector('.contents');
		new Error404(contentsEl).render();
	}
}
