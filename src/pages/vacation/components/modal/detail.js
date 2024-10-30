export default class VacationRegisterModal {
	constructor() {
		this.template = `<div class="vacation__history-wrapper">
                <div class="vacation__history-background"></div>
                <div class="vacation__history-popup">
                    <div class="vacation__history-title-wrapper">
                        <div class="vacation__history-title">휴가 신청 내역</div>
                    </div>
                    <div class="vacation__history-author-wrapper">
                        <hr>
                        <h3 class="vacation__history-author">박수빈</h3>
                    </div>
                    <div class="vacation__history-form-wrapper">
                        <form action="" class="form">
                            <fieldset class="vacation__apply-select">
                                <legend>신청가능한 근태</legend>
                                <label for="apply">휴가 종류</label>
                                <select name="apply" id="apply" readonly>
                                    <option value="연차">🏖️ 연차</option>
                                    <option value="반차">🌇 반차</option>
                                    <option value="병가">🚑 병가</option>
                                    <option value="기타">💬 기타</option>
                                </select>
                            </fieldset>
                            <fieldset>
                                <legend>시작일</legend>
                                <input type="date" data-placeholder="시작일" placeholder="시작일" required readonly>
                            </fieldset>
                            <fieldset>
                                <legend>종료일</legend>
                                <input type="date" data-placeholder="종료일" placeholder="종료일" required readonly>
                            </fieldset>
                            <input type="text" readonly>
                            <textarea name="" id="" readonly>이런 이런 이런 이유로 ~~~ 휴가 신청합니다 ~</textarea>
                        </form>
                    </div>
                    <div class="vacation__history-btn-wrapper">
                        <button class="btn">취소</button>
                        <button class="btn btn--primary">확인</button>
                    </div>
                </div>
            </div>`;
	}

	render() {}
}
