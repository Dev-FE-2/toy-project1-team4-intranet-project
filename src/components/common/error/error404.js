import { url } from '../../../router/url';
import { ButtonGroup } from '../form';
import '../style.css';
import NotFound404Img from '../../../assets/404.png';

export default class Error404 {
	#parentEl;
	#url;
	#buttonTemplate;
	#template;

	constructor(parentEl) {
		this.#parentEl = parentEl;
		this.#url;
		this.#buttonTemplate = new ButtonGroup([
			{
				label: '홈으로 이동',
				colorType: 'primary',
				elementType: 'anchor',
				anchorLink: url.home,
			},
		]).render();
		this.#template = `<div class="notfound-wrapper">
                    <img class="notfound-img" src="${NotFound404Img}" alt="404">
                    <h1 class="page-title">페이지를 찾을 수 없습니다.</h1>
                    <p>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.<br>입력하신 주소가 정확한지 다시 한 번 확인해주세요.</p>

                        ${this.#buttonTemplate}
                    </div>`;
	}

	render() {
		this.#parentEl.innerHTML = this.#template;

		return this.#template;
	}
}
