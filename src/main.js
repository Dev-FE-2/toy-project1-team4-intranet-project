import './global.css';
import Layout from './components/Layout';
import { route } from './router/route';

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

document.addEventListener('DOMContentLoaded', app);
