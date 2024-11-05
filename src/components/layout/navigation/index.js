import { url } from '../../../router/url';
import { IconHome, IconProfile, IconTimetable, IconNotice, IconEmployee } from '../../icon';
import './style.css';

export default class Navigation {
	constructor() {
		this.path = window.location.pathname;
	}

	styleMenu(href) {
		return this.path === href ? 'nav-item active' : 'nav-item';
	}

	updateActiveMenu() {
		this.path = window.location.pathname;

		document.querySelectorAll('.nav-item').forEach((item) => {
			const href = item.getAttribute('href');
			item.className = this.styleMenu(href);
		});
	}

	render() {
		const iconHome = new IconHome().render();
		const iconProfile = new IconProfile().render();
		const iconTimetable = new IconTimetable().render();
		const iconNotice = new IconNotice().render();
		const iconEmployee = new IconEmployee().render();

		return `<nav class="nav">
            <ul>
                <li>
                    <a href="${url.home}" class="${this.styleMenu(url.home)}">
                        <i>${iconHome}</i>
                        <span class="nav-name--desktop">마이페이지</span>
                        <span class="nav-name--mobile">MY</span>
                    </a>
                </li>
                <li>
                    <a href="${url.userProfile('user123')}" class="${this.styleMenu(url.userProfile('user123'))}"><i>${iconProfile}</i> 프로필</a>
                </li>
                <li>
                    <a href="${url.vacation}" class="${this.styleMenu(url.vacation)}"><i>${iconTimetable}</i> 근태 신청</a>
                </li>
                <li>
                    <a href="${url.notice}" class="${this.styleMenu(url.notice)}"><i>${iconNotice}</i> 공지사항</a>
                </li>
                <li>
                    <a href="${url.employeeList}" class="${this.styleMenu(url.employeeList)}">
                        <i>${iconEmployee}</i>
                        <span class="nav-name--desktop">직원 구성원</span>
                        <span class="nav-name--mobile">직원</span>
                    </a>
                </li>
            </ul>
        </nav>`;
	}
}
