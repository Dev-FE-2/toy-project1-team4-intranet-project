import { url, urlPattern } from './url';
import { routerManager } from '../store';
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
	SignUpPage,
} from '../pages';

export const route = (pathParams) => {
	if (pathParams) {
		history.pushState(null, null, `${window.location.origin}${pathParams}`);
	}

	const path = pathParams || window.location.pathname;
	const contentsElement = document.querySelector('#pageContents');

	routerManager.setState({ path });

	switch (true) {
		case path === url.home:
			new MyPage().render();
			break;

		case urlPattern.profile.test(path): {
			const userId = path.match(urlPattern.profile)[1];
			contentsElement.innerHTML = new ProfilePage(userId).render();
			break;
		}

		case path === url.vacation:
			new VacationPage(contentsElement).render();
			break;

		case path === url.notice:
			new NoticePage(contentsElement).render();
			break;

		case urlPattern.noticeDetail.test(path): {
			const noticeId = path.match(urlPattern.noticeDetail)[1];
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
			contentsElement.innerHTML = new EmployeeDetailPage(employeeId).render();
			break;
		}

		case path === url.login:
			new LoginPage(contentsElement).render();
			break;

		case path === url.signup:
			new SignUpPage(contentsElement).render();
			break;

		case urlPattern.sample.test(path): {
			const id = path.match(urlPattern.sample)[1];
			new SamplePage(contentsElement, id).render();
			break;
		}

		default:
			new NotFound404Page(contentsElement).render();
			break;
	}
};
