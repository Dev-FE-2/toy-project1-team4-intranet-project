import SamplePage from '../pages/sample';
import LoginPage from '../pages/login';
import NotFound404Page from '../pages/notFound';

const url = new URL(window.location.href);
const path = url.pathname;

export const route = () => {
	switch (path) {
		case '/':
			return new SamplePage().render();

		case '/login':
			return new LoginPage().render();

		default:
			return new NotFound404Page().render();
	}
};
