import { url, urlPattern } from './url';
import Navigation from '../components/Layout/Navigation';
import {
	NotFound404Page,
	SamplePage,
	LoginPage,
	MyPage,
	ProfilePage,
	VacationPage,
	NoticePage,
	NoticeDetailPage,
	EmployeeListPage,
	EmployeeDetailPage,
	EmployeeAddPage,
} from '../pages';

export const route = () => {
	const path = window.location.pathname;

	const navigation = new Navigation();
	navigation.updateActiveMenu();

	const contentsElements = document.querySelector('#pageContents');

	switch (true) {
		case path === url.home:
			new MyPage().render();
			break;

		case urlPattern.userProfile.test(path): {
			const userId = path.match(urlPattern.userProfile)[1];
			console.log('userId', userId);

			contentsElements.innerHTML = new SamplePage(userId).render();
			break;
		}

		case path === url.vacation:
			contentsElements.innerHTML = new SamplePage().render();
			break;

		case path === url.notice:
			contentsElements.innerHTML = new SamplePage().render();
			break;

		case urlPattern.noticeDetail.test(path): {
			const noticeId = path.match(urlPattern.noticeDetail)[1];
			console.log('noticeId', noticeId);

			contentsElements.innerHTML = new SamplePage(noticeId).render();
			break;
		}

		case path === url.employeeList:
			contentsElements.innerHTML = new SamplePage().render();
			break;

		case path === url.employeeAdd:
			contentsElements.innerHTML = new SamplePage().render();
			break;

		case urlPattern.employeeDetail.test(path): {
			const employeeId = path.match(urlPattern.employeeDetail)[1];
			console.log('employee userId', employeeId);

			contentsElements.innerHTML = new SamplePage(employeeId).render();
			break;
		}

		case path === url.login:
			contentsElements.innerHTML = new LoginPage().render();
			break;

		default:
			contentsElements.innerHTML = new NotFound404Page().render();
			break;
	}
};
