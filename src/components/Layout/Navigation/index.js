import { IconHome, IconProfile, IconTimetable, IconNotice, IconEmployee } from '../../Icon';
import './style.css';

export default class Navigation {
	render() {
		return `<nav class="nav">
        <ul>
            <li>
                <a href="/" class="nav-item active">
                    <i>${IconHome()}</i>
                    <span class="nav-name--desktop">마이페이지</span>
                    <span class="nav-name--mobile">MY</span>
                </a>
            </li>
            <li>
                <a href="/profile/:user" class="nav-item"><i>${IconProfile()}</i> 프로필</a>
            </li>
            <li>
                <a href="/vacation" class="nav-item"><i>${IconTimetable()}</i> 근태 신청</a>
            </li>
            <li>
                <a href="/notice" class="nav-item"><i>${IconNotice()}</i> 공지사항</a>
            </li>
            <li>
                <a href="/admin/employees" class="nav-item">
                    <i>${IconEmployee()}</i>
                    <span class="nav-name--desktop">직원 구성원</span>
                    <span class="nav-name--mobile">직원</span>
                </a>
            </li>
        </ul>
    </nav>`;
	}
}
