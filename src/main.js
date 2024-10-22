import './global.css';
import { setupCounter } from './counter.js';
import Layout from './layout.js';

async function app() {
	document.querySelector('#app').innerHTML = Layout();

	setupCounter(document.querySelector('#counter'));
}

document.addEventListener('DOMContentLoaded', app);
