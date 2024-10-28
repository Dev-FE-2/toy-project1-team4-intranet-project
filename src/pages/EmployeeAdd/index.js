import './style.css';
import { ProfileImage } from '../../components/pages/Profile/ProfileImage';
import { ProfileForm } from '../../components/pages/Profile/ProfileForm';

class EmployeeAdd {
	constructor() {
		this.buttons = `
			<div class="btn-wrap">
				<button class="btn btn--primary" type="submit">등록하기</button>
			</div>
		`;
		this.emptyUserData = {
			name: '',
			job: '',
			team: '',
			phone: '',
			email: '',
			bio: '',
			profileImage: '../../../public/avatar.svg',
		};
	}

	render() {
		return `
		<section class="contents">
			<div class="container">
				<h1 class="page-title">직원 등록</h1>
				<div class="profile-container">
					<div class="profile">
						${ProfileImage(this.emptyUserData.profileImage)}
						${ProfileForm(this.emptyUserData, this.buttons)}
					</div>
				</div>
			</div>
			</section>
		`;
	}
}

export default EmployeeAdd;
