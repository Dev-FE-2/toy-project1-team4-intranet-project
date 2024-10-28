import './global.css';
import Layout from './components/Layout';
import { route } from './router/route';

async function app() {
	const layout = new Layout();
	document.querySelector('#app').innerHTML = layout.render();
	init();
}

const init = () => {
	const navElements = document.querySelector('.nav');

	window.addEventListener('popstate', route);
	navElements.addEventListener('click', navigate);
};

const navigate = (event) => {
	event.preventDefault();

	// const path = event.target.getAttribute('href'); // a 요소 하위에 다른 요소를 둘러싸면 클릭버블링이 안생긴다.

	const anchor = event.target.closest('a');

	history.pushState(null, null, anchor.href);

	if (anchor && anchor.href) {
		route();
	}
};

document.addEventListener('DOMContentLoaded', app);
