import AvatarImg from '/public/avatar.svg';

export default class SamplePage {
	constructor(contentsElement, id) {
		this.contentsElement = contentsElement;
		this.id = id;
	}

	async fetchSampleData() {
		const response = await fetch(`http://localhost:5173/api/sample/${this.id}`);
		console.log('sampleData', sampleData);

		const sampleData = await response.json();
		console.log('sampleData', sampleData);

		return sampleData;
	}

	getTemplate(sampleData) {
		const { title, body, username, image } = sampleData;

		return `<section class="contents">
                <h1 class="page-title"><img src="${image ?? AvatarImg}" alt="${username} 님의 프로필 사진" width="30" height="30"> ${username} 님의 가입 인사</h1>

                <form action="" class="form">
                    <fieldset>
                        <legend>제목</legend>
                        <input type="text" class="form-item" placeholder="제목" value="${title}" />
                    </fieldset>
                    <fieldset>
                        <legend>가입 인사 글</legend>
                        <input type="text" class="form-item" placeholder="가입 인사 글" value="${body}" />
                    </fieldset>
                    <div class="btn-wrap">
                        <button class="btn btn--danger" type="button">삭제</button>
                        <button class="btn btn--primary" type="submit">등록</button>
                    </div>
                </form>
            </section>`;
	}

	async render() {
		const sampleData = await this.fetchSampleData();
		this.contentsElement.innerHTML = this.getTemplate(sampleData);
	}
}
