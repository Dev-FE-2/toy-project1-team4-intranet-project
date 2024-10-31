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

	const contentsElement = document.querySelector('#pageContents');

	switch (true) {
		case path === url.home:
			new MyPage().render();
			break;

		case urlPattern.userProfile.test(path): {
			const userId = path.match(urlPattern.userProfile)[1];
			console.log('userId', userId);

			contentsElement.innerHTML = new ProfilePage(userId).render();
			break;
		}

		case path === url.vacation:
			contentsElement.innerHTML = new VacationPage().render();
			break;

		case path === url.notice:
			new NoticePage(contentsElement).render();
			break;

		case urlPattern.noticeDetail.test(path): {
			const noticeId = path.match(urlPattern.noticeDetail)[1];
			console.log('noticeId', noticeId);

			contentsElement.innerHTML = new NoticeDetailPage(noticeId).render();
			break;
		}

		case path === url.employeeList:
			contentsElement.innerHTML = new EmployeeListPage().render();
			break;

		case path === url.employeeAdd:
			contentsElement.innerHTML = new EmployeeAddPage().render();
			break;

		case urlPattern.employeeDetail.test(path): {
			const employeeId = path.match(urlPattern.employeeDetail)[1];
			console.log('employee userId', employeeId);

			contentsElement.innerHTML = new EmployeeDetailPage(employeeId).render();
			break;
		}

		case path === url.login:
			contentsElement.innerHTML = new LoginPage().render();
			break;

		case urlPattern.sample.test(path): {
			const id = path.match(urlPattern.sample)[1];
			console.log('saple id', id);

			contentsElement.innerHTML = new SamplePage(id).render();
			break;
		}

		default:
			contentsElement.innerHTML = new NotFound404Page().render();
			break;
	}
};
