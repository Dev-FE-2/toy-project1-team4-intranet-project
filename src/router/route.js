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

			pushContents(new ProfilePage(userId).render());
			break;
		}

		case path === url.vacation:
			pushContents(new VacationPage().render());
			break;

		case path === url.notice:
			pushContents(new NoticePage().render());
			break;

		case urlPattern.noticeDetail.test(path): {
			const noticeId = path.match(urlPattern.noticeDetail)[1];
			console.log('noticeId', noticeId);

			pushContents(new NoticeDetailPage(noticeId).render());
			break;
		}

		case path === url.employeeList:
			pushContents(new EmployeeListPage().render());
			break;

		case path === url.employeeAdd:
			pushContents(new EmployeeAddPage().render());
			break;

		case urlPattern.employeeDetail.test(path): {
			const employeeId = path.match(urlPattern.employeeDetail)[1];
			console.log('employee userId', employeeId);

			pushContents(new EmployeeDetailPage(employeeId).render());
			break;
		}

		case path === url.login:
			pushContents(new LoginPage().render());
			break;

		case urlPattern.sample.test(path): {
			const id = path.match(urlPattern.sample)[1];
			console.log('saple id', id);

			pushContents(new SamplePage(id).render());
			break;
		}

		default:
			pushContents(new NotFound404Page().render());
			break;
	}
};
