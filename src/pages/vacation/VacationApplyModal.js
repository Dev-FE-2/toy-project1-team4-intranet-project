export default class VacationApplyModal {
	constructor() {}

	render() {
		return `
      <div class="vacation__apply-wrapper" id="applyModal">
        <div class="vacation__apply-background"></div>
        <div class="vacation__apply-popup">
            <div class="vacation__apply-title-wrapper">
                <div class="vacation__apply-title">휴가 신청</div>
            </div>
            <div class="vacation__apply-form-wrapper">
                <form action="" class="form">
                    <fieldset class="vacation__apply-select">
                        <legend>신청가능한 근태</legend>
                        <label for="apply">휴가 종류</label>
                        <select name="apply" id="apply">
                            <option value="연차">🏖️ 연차</option>
                            <option value="반차">🌇 반차</option>
                            <option value="병가">🚑 병가</option>
                            <option value="기타">💬 기타</option>
                        </select>
                    </fieldset>
                    <fieldset class="vacation__apply-select">
                        <legend>시작일</legend>
                        <input type="date" data-placeholder="시작일" placeholder="시작일" required>
                    </fieldset>
                    <fieldset class="vacation__apply-select">
                        <legend>종료일</legend>
                        <input type="date" data-placeholder="종료일" placeholder="종료일" required>
                    </fieldset>
                    <textarea name="" id="" placeholder="휴가 사유를 입력해주세요."></textarea>
                </form>
            </div>
            <div class="vacation__apply-btn-wrapper">
                <button class="btn">취소</button>
                <button class="btn btn--primary">휴가 신청하기</button>
            </div>
        </div>
    </div>
    `;
	}
}
