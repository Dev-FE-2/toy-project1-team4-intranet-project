import { ProfileForm } from '../../components/pages/Profile/ProfileForm';
import { ProfileImage } from '../../components/pages/Profile/ProfileImage';
import './style.css';
import userData from '../../../server/data/user';

class EmployeeDetail {
	constructor() {
		this.buttons = `
			<div class="btn-wrap">
				<button type="button" class="btn btn--danger">삭제하기</button>
				<button type="submit" class="btn btn--primary">수정하기</button>
			</div>
		`;
	}

	render() {
		return `
        <section class="contents">
			<div class="container">
				<h1 class="page-title">직원 정보 수정</h1>
				<div class="profile-container">
					<div class="profile">
						${ProfileImage(userData.profileImage)}
						${ProfileForm(userData, this.buttons)}
					</div>
				</div>
			</div>
            </section>
		`;
	}
}

export default EmployeeDetail;
