import './style.css';
import { ProfileForm } from '../../components/pages/profile/profileForm';
import { url } from '../../router/url';
import userData from '../../../server/data/user';
import ImageUploader from '../../components/pages/profile/ImageUploader';

export default class UserProfile {
	constructor() {
		this.userData = userData;
		this.imageUploader = new ImageUploader(
			this.userData.profileImage || '../../../public/avatar.svg',
			this.handleImageChange.bind(this),
		);
	}

	handleImageChange(newImageSrc) {
		this.userData.profileImage = newImageSrc;
	}

	handleUpdate(event) {
		event.preventDefault();
		alert('프로필 수정되었습니다');
		window.location.href = url.home;
	}

	render() {
		setTimeout(() => {
			document
				.querySelector('.btn--primary')
				.addEventListener('click', this.handleUpdate.bind(this));
		}, 0);

		return `
			<section class="contents">
				<div class="container">
					<h1 class="page-title">프로필</h1>
					<div class="profile-container">
						<div class="profile">
							${this.imageUploader.render()}
							${ProfileForm(
								this.userData,
								`
								<div class="btn-wrap">
									<button class="btn btn--primary" type="submit">수정하기</button>
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
