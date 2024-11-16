import { route } from './route';

export const navigate = (event) => {
	const anchor = event.target.closest('a');

	// 최상단 DOM에 적용된 이벤트 리스너의 영향으로 다른 요소의 클릭 이벤트가 제대로 동작하기 어려움. 이를 방지하기 위한 ealry return
	if (!anchor) return;

	event.preventDefault();

	const pullUrl = anchor.href;

	history.pushState(null, null, pullUrl);
	route();
};
