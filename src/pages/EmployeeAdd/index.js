import './style.css';
import { ProfileForm } from '../../components/pages/Profile/ProfileForm';
import ImageUploader from '../../components/pages/Profile/ImageUploader';

export default class EmployeeAdd {
	constructor() {
		this.emptyUserData = this.getEmptyUserData();
		this.imageUploader = new ImageUploader(
			this.emptyUserData.profileImage,
			this.handleImageChange.bind(this),
		);
	}

	getEmptyUserData() {
		return {
			username: '',
			job: '',
			team: '',
			phone: '',
			email: '',
			bio: '',
			profileImage: '../../../public/avatar.svg',
		};
	}

	handleImageChange(newImageSrc) {
		this.emptyUserData.profileImage = newImageSrc;
	}

	render() {
		return `
			<section class="contents">
				<div class="container">
					<h1 class="page-title">직원 등록</h1>
					<div class="profile-container">
						<div class="profile">
							${this.imageUploader.render()}
							${ProfileForm(
								this.emptyUserData,
								`
								<div class="btn-wrap">
									<button class="btn btn--primary" type="submit">등록하기</button>
								</div>
							`,
							)}
						</div>
					</div>
				</div>
			</section>
		`;
	}
}
