export function ProfileForm({ name, job, team, phone, email, bio }, buttons) {
	return `
    <form id="profileForm">
        <input type="text" id="name" placeholder="이름" value="${name}">
        <input type="text" id="job" placeholder="직업" value="${job}">
        <input type="text" id="team" placeholder="직무" value="${team}">
        <input type="text" id="phone" placeholder="전화번호" value="${phone}">
        <input type="email" id="email" placeholder="이메일" value="${email}">
        <textarea id="bio" placeholder="소개">${bio}</textarea>

        <div class="button-container">
            ${buttons}
        </div>
    </form>`;
}
