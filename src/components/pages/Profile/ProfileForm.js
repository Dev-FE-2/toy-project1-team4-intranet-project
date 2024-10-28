export function ProfileForm({ name, job, team, phone, email, bio }, buttons) {
	return `
    <form id="profileForm" class="form">
        <legend>직원 정보</legend>
        <input type="text" class="form-item" id="name" placeholder="이름" value="${name}">
        <input type="text" class="form-item" id="job" placeholder="직업" value="${job}">
        <input type="text" class="form-item" id="team" placeholder="직무" value="${team}">
        <input type="text" class="form-item" id="phone" placeholder="전화번호" value="${phone}">
        <input type="email" class="form-item" id="email" placeholder="이메일" value="${email}">
        <textarea class="profile-form__textarea form-item" id="bio" placeholder="소개">${bio}</textarea>

        <div class="button-container">
            ${buttons}
        </div>
    </form>`;
}
