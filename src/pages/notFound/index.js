import NotFound404Img from '../../assets/404.png';
import './style.css';

export default class NotFound404Page {
	render() {
		return `<section class="contents">
                <div class="notfound-wrapper">
                    <img class="notfound-img" src="${NotFound404Img}" alt="404">

                    <h1 class="page-title">페이지를 찾을 수 없습니다.</h1>
                    <p>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.<br>입력하신 주소가 정확한지 다시 한 번 확인해주세요.</p>

                    <div class="btn-wrap">
                        <a class="btn btn--primary" href="/">홈으로 이동</a>
                    </div>
                </div>
            </section>`;
	}
}
