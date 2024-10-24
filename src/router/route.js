import { URL_PATH } from '../constant/url';
import { samplePage, loginPage } from './pages';
import NotFound404Page from '../pages/notFound';

const url = new URL(window.location.href);
const path = url.pathname;

export const route = () => {
	switch (path) {
		case `${URL_PATH.home}`:
			return samplePage.render();

		case `${URL_PATH.login}`:
			return loginPage.render();

		default:
			return NotFound404Page();
	}
};
