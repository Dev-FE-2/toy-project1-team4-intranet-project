export default function SamplePage() {
	return `<section class="contents">
                <h1 class="page-title">페이지 타이틀</h1>

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
                        <button class="btn btn--secondary" type="button">취소</button>
                        <button class="btn btn--primary" type="submit">확인</button>
                    </div>
                </form>

                <div id="counter"></div>
            </section>`;
}
