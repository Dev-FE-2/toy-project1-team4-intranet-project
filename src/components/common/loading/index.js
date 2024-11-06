import './style.css';

export default class Loading {
	constructor(parentEl) {
		this.parentEl = parentEl;
		this.template = `<div class="spinner-container"><div class="spinner"></div></div>`;
	}

	remove() {
		const loadingEl = this.parentEl.querySelector('.spinner-container');
		loadingEl.remove();
	}

	render() {
		this.parentEl.innerHTML = this.template;
	}
}
