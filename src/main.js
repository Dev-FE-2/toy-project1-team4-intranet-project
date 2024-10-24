import './global.css';
import { setupCounter } from './counter.js';
import Layout from './components/Layout';

async function app() {
	const layout = new Layout();
	document.querySelector('#app').innerHTML = layout.render();

	setupCounter(document.querySelector('#counter'));
}

document.addEventListener('DOMContentLoaded', app);
