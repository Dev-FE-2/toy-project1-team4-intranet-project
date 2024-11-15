import { route } from './route';

export const navigate = (event) => {
	event.preventDefault();

	const anchor = event.target.closest('a');
	const pullUrl = anchor.href;

	history.pushState(null, null, pullUrl);

	if (anchor && pullUrl) {
		route();
	}
};
