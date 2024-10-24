export default class LoginPage {
	render() {
		return `<section class="contents">
                <h1 class="page-title">로그인</h1>

                <form action="" class="form">
                    <fieldset>
                        <legend>아이디</legend>
                        <input type="text" class="form-item" placeholder="아이디" />
                    </fieldset>
                    <fieldset>
                        <legend>비밀번호</legend>
                        <input type="password" class="form-item" placeholder="비밀번호" />
                    </fieldset>
                    <div class="btn-wrap">
                        <button class="btn btn--primary" type="submit">로그인</button>
                    </div>
                </form>
            </section>`;
	}
}
