import { url } from './url';
import NotFound404Page from '../pages/NotFound';
import { samplePage, loginPage } from './pages';

export const route = () => {
	const path = window.location.pathname;
	let pathParma;

	const contentsElements = document.querySelector('#contents');

	switch (path) {
		case `${url.home}`:
			contentsElements.innerHTML = samplePage.render();
			break;

		case `${url.userProfile(pathParma)}`:
			contentsElements.innerHTML = samplePage.render();
			break;

		case `${url.vacation}`:
			contentsElements.innerHTML = samplePage.render();
			break;

		case `${url.notice}`:
			contentsElements.innerHTML = samplePage.render();
			break;

		case `${url.noticeDetail(pathParma)}`:
			contentsElements.innerHTML = samplePage.render();
			break;

		case `${url.employeeList}`:
			contentsElements.innerHTML = samplePage.render();
			break;

		case `${url.employeeAdd}`:
			contentsElements.innerHTML = samplePage.render();
			break;

		case `${url.employeeDetail(pathParma)}`:
			contentsElements.innerHTML = samplePage.render();
			break;

		case `${url.login}`:
			contentsElements.innerHTML = loginPage.render();
			break;

		default:
			contentsElements.innerHTML = NotFound404Page();
	}
};
