import { postUserData } from '../../apis/userProfileApi';
import { route } from '../../router/route';
import { Error503 } from '../../components/common';
import AvatarImg from '/public/avatar.svg';

export default class SignUpPage {
	#contentsElement;
	#formElement;

	constructor(contentsElement) {
		this.#contentsElement = contentsElement;
	}

	async createFormData(event) {
		event.preventDefault();

		const formData = new FormData(this.#formElement);
		// console.log('작성한 formData', Object.fromEntries(formData.entries()));
		// await postUserData(formData);

		try {
			const response = await postUserData(formData);

			console.log(response);

			alert('회원가입을 완료했습니다.');
			route('/login');
		} catch (error) {
			console.error(error);

			if (process.env.NODE_ENV === 'development') {
				console.log('작성한 formData', Object.fromEntries(formData.entries()));
			}

			const element = document.querySelector('#formContainer');
			new Error503(element).render();
		}
	}

	get #template() {
		return `<section class="contents">
                <h1 class="page-title">회원가입</h1>

				<div id="formContainer" class="form-container">
					<form id="signUpForm" method="post" class="form">
						<fieldset>
							<legend>프로필 사진</legend>
							<input name="image" id="image" type="file" class="form-item" placeholder="프로필 사진" value="" />
						</fieldset>
						<fieldset>
							<legend>이메일</legend>
							<input name="email" id="email" type="email" class="form-item" placeholder="이메일" value="" required />
						</fieldset>
						<fieldset>
							<legend>비밀번호</legend>
							<input name="password" id="password" type="password" class="form-item" placeholder="비밀번호" value="" required />
						</fieldset>
						<fieldset>
							<legend>비밀번호 확인</legend>
							<input name="rePassword" id="rePassword" type="password" class="form-item" placeholder="비밀번호 확인" value="" required />
						</fieldset>
						<fieldset>
							<legend>이름</legend>
							<input name="username" id="username" type="text" class="form-item" placeholder="이름" value="" required />
						</fieldset>
						<fieldset>
							<legend>휴대폰 번호</legend>
							<input name="phone" id="phone" type="tel" class="form-item" placeholder="휴대폰 번호" value="" required />
						</fieldset>
						<fieldset>
							<legend>직무</legend>
							<input name="job" id="job" type="text" class="form-item" placeholder="직무" value="" />
						</fieldset>
						<fieldset>
							<legend>소속</legend>
							<input name="team" id="team" type="text" class="form-item" placeholder="소속" value="" />
						</fieldset>
						<fieldset>
							<legend>자기 소개</legend>
							<textarea name="bio" id="bio" class="form-item" placeholder="자기 소개" value=""></textarea>
						</fieldset>
						<div class="btn-wrap">
							<button class="btn btn--primary" type="submit">회원가입</button>
						</div>
					</form>
				</div>
            </section>`;
	}

	async render() {
		this.#contentsElement.innerHTML = this.#template;
		this.#formElement = document.querySelector('#signUpForm');
		this.#formElement.addEventListener('submit', async (event) => {
			try {
				await this.createFormData(event); // createFormData 호출 시 에러가 catch로 잡히도록 처리
			} catch (error) {
				console.error('Render 함수 내에서 잡힌 에러:', error);
			}
		});
	}
}
