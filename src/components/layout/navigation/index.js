import { url, urlLabel } from '../../../router';
import { IconHome, IconProfile, IconTimetable, IconNotice, IconEmployee } from '../../icon';
import './style.css';

export default class Navigation {
	#parentEl;
	#path = window.location.pathname;

	constructor(parentEl) {
		this.#parentEl = parentEl;
	}

	#styleMenu(href) {
		return this.#path === href ? 'nav-item active' : 'nav-item';
	}

	updateActiveMenu() {
		this.path = window.location.pathname;

		document.querySelectorAll('.nav-item').forEach((item) => {
			const href = item.getAttribute('href');
			item.className = this.#styleMenu(href);
		});
	}

	get #template() {
		const iconHome = new IconHome().render();
		const iconProfile = new IconProfile().render();
		const iconTimetable = new IconTimetable().render();
		const iconNotice = new IconNotice().render();
		const iconEmployee = new IconEmployee().render();

		return `<nav class="nav">
            <ul>
                <li>
                    <a href="${url.home}" class="${this.#styleMenu(url.home)}">
                        <i>${iconHome}</i>
                        <span class="nav-name--desktop">${urlLabel.home}</span>
                        <span class="nav-name--mobile">MY</span>
                    </a>
                </li>
                <li>
                    <a href="${url.userProfile('user123')}" class="${this.#styleMenu(url.userProfile('user123'))}"><i>${iconProfile}</i> ${urlLabel.userProfile}</a>
                </li>
                <li>
                    <a href="${url.vacation}" class="${this.#styleMenu(url.vacation)}"><i>${iconTimetable}</i> ${urlLabel.vacation}</a>
                </li>
                <li>
                    <a href="${url.notice}" class="${this.#styleMenu(url.notice)}"><i>${iconNotice}</i> ${urlLabel.notice}</a>
                </li>
                <li>
                    <a href="${url.employeeList}" class="${this.#styleMenu(url.employeeList)}">
                        <i>${iconEmployee}</i>
                        <span class="nav-name--desktop">${urlLabel.employeeList}</span>
                        <span class="nav-name--mobile">직원</span>
                    </a>
                </li>
            </ul>
        </nav>`;
	}

	render() {
		this.#parentEl.innerHTML = this.#template;
	}
}
