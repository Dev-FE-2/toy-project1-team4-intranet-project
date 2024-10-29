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

export const pushContents = (page) => {
	const contentsElements = document.querySelectorAll('#pageContents');
	contentsElements.forEach((element) => {
		element.innerHTML = page;
	});
};

export const route = () => {
	const path = window.location.pathname;

	const navigation = new Navigation();
	navigation.updateActiveMenu();

	switch (true) {
		case path === url.home:
			new MyPage().render();
			break;

		case urlPattern.userProfile.test(path): {
			const userId = path.match(urlPattern.userProfile)[1];
			console.log('userId', userId);

			pushContents(new SamplePage(userId).render());
			break;
		}

		case path === url.vacation:
			pushContents(new SamplePage().render());
			break;

		case path === url.notice:
			pushContents(new SamplePage().render());
			break;

		case urlPattern.noticeDetail.test(path): {
			const noticeId = path.match(urlPattern.noticeDetail)[1];
			console.log('noticeId', noticeId);

			pushContents(new SamplePage(noticeId).render());
			break;
		}

		case path === url.employeeList:
			pushContents(new SamplePage().render());
			break;

		case path === url.employeeAdd:
			pushContents(new SamplePage().render());
			break;

		case urlPattern.employeeDetail.test(path): {
			const employeeId = path.match(urlPattern.employeeDetail)[1];
			console.log('employee userId', employeeId);

			pushContents(new SamplePage(employeeId).render());
			break;
		}

		case path === url.login:
			pushContents(new LoginPage().render());
			break;

		default:
			pushContents(new NotFound404Page().render());
			break;
	}
};
