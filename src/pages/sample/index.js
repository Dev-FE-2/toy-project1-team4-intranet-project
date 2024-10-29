export default class SamplePage {
	constructor(id) {
		this.id = id;
	}

	render() {
		return `<section class="contents">
                <h1 class="page-title">${this.id ? this.id : '페이지'} 타이틀</h1>

                <form action="" class="form">
                    <fieldset>
                        <legend>이름</legend>
                        <input type="text" class="form-item" placeholder="이름" />
                    </fieldset>
                    <fieldset>
                        <legend>포지션</legend>
                        <input type="text" class="form-item" placeholder="포지션" />
                    </fieldset>
                    <div class="btn-wrap">
                        <button class="btn btn--danger" type="button">삭제</button>
                        <button class="btn btn--primary" type="submit">등록</button>
                    </div>
                </form>

                <div id="counter"></div>
            </section>`;
	}
}
