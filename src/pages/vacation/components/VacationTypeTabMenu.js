export default class VacationTypeTabMenu {
	constructor(parentEl, listInstance) {
		this.parentEl = parentEl;
		this.listInstance = listInstance;
		this.states = {
			filterType: listInstance.states.filterType,
		};
	}

	setState(newState) {
		this.states = { ...this.states, ...newState };
		this.render();
	}

	get template() {
		const htmls = ['전체', '연차', '반차', '조퇴', '기타'].map((type) => {
			const className =
				this.states.filterType === type ? 'vacation__nav-item active' : 'vacation__nav-item';
			return `<li class="${className}" data-type="${type}">${type}</li>`;
		});
		return htmls.join('');
	}

	render() {
		this.parentEl.innerHTML = this.template;

		this.parentEl.addEventListener('click', (event) => {
			const filterType = event.target.closest('li').getAttribute('data-type');
			this.listInstance.setState({ filterType });
			this.setState({ filterType });
		});
	}
}
