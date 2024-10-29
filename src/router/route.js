import { url } from './url';
import { notFound404Page, samplePage, loginPage, myPage } from './pages';

export const route = () => {
	const path = window.location.pathname;
	let pathParma;

	const contentsElements = document.querySelector('#pageContents');

	switch (path) {
		case `${url.home}`:
			myPage.render();
			break;

		case `${url.userProfile(pathParma)}`:
			contentsElements.innerHTML = samplePage.render();
			break;

		case `${url.vacation}`:
			contentsElements.innerHTML = loginPage.render();
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
			contentsElements.innerHTML = notFound404Page.render();
	}
};
