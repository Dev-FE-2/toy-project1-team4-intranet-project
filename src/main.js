import { worker } from './mocks/browser';
import { route } from './router/route';
import Layout from './components/layout';
import './global.css';

async function app() {
	init();
	route();
}

const init = () => {
	const layout = new Layout();
	document.querySelector('#app').innerHTML = layout.render();

	window.addEventListener('popstate', route);

	const navElements = document.querySelectorAll('.nav');
	navElements.forEach((navEl) => {
		navEl.addEventListener('click', navigate);
	});
};

const navigate = (event) => {
	event.preventDefault();

	// const path = event.target.getAttribute('href');
	const anchor = event.target.closest('a');

	history.pushState(null, null, anchor.href);

	if (anchor && anchor.href) {
		route();
	}
};

const enableMocking = async () => {
	if (process.env.NODE_ENV !== 'development') {
		return;
	}

	// `worker.start()` returns a Promise that resolves
	// once the Service Worker is up and ready to intercept requests.
	return worker.start({
		onUnhandledRequest: 'bypass', // 핸들링되지 않은 요청 무시
	});
};

document.addEventListener(
	'DOMContentLoaded',
	enableMocking().then(() => {
		app();
	}),
);
