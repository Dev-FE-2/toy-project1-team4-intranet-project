import './style.css';
import ImgNoData from '../../../assets/no-data.jpg';

export default class NoData {
	constructor() {
		this.template = `<div class="no-data" >
							<img src="${ImgNoData}" alt="">
							<p>찾으시는 결과가 없습니다.</p>
						</div>`;
	}

	render() {
		return this.template;
	}
}
