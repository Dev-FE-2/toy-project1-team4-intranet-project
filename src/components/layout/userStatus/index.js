import './style.css';
import Avatar from '/public/avatar.svg';

export default class UserStatus {
	render() {
		return `<div class="user-status">
                <img class="avatar-img" src="${Avatar}" alt="프로필 사진" />
            </div>`;
	}
}
