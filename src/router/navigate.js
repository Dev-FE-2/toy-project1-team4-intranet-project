import { route } from './route';

export const navigate = (event) => {
	event.preventDefault();

	// const path = event.target.getAttribute('href');
	const anchor = event.target.closest('a');

	history.pushState(null, null, anchor.href);

	if (anchor && anchor.href) {
		route();
	}
};
