import { worker } from './mocks/browser';
import { route, navigate } from './router';
import Layout from './components/layout';
import './global.css';

async function app() {
	init();
	route();
}

const init = () => {
	const appElement = document.querySelector('#app');
	appElement.innerHTML = new Layout().render();

	window.addEventListener('popstate', route);

	const navElements = document.querySelectorAll('nav');
	navElements.forEach((navEl) => {
		navEl.addEventListener('click', navigate);
	});
};

const enableMocking = async () => {
	if (process.env.NODE_ENV !== 'development') return;

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
