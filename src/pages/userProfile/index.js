import './style.css';
import userData from '../../../server/data/user';
import { ProfileForm } from '../../components/pages/Profile/ProfileForm';

class UserProfile {
	constructor() {
		this.userData = userData;
		this.profileImageSrc = this.userData.profileImage || '../../../public/avatar.svg';
		this.isImageUploaded = false;

		this.profileImageInput = document.createElement('input');
		this.profileImageInput.type = 'file';
		this.profileImageInput.accept = 'image/*';
		this.profileImageInput.style.display = 'none';
		this.profileImageInput.addEventListener('change', this.handleImageUpload.bind(this));
	}

	handleImageUpload(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				this.profileImageSrc = e.target.result;
				this.isImageUploaded = true;
				this.fileName = file.name;
				this.updateProfileImage();
			};
			reader.readAsDataURL(file);
		}
	}

	handleImageRemove() {
		this.profileImageSrc = '../../../public/avatar.svg';
		this.isImageUploaded = false;
		this.fileName = '';
		this.updateProfileImage();
	}

	updateProfileImage() {
		const imageElement = document.querySelector('.profile-image img');
		const fileNameElement = document.querySelector('.file-name');
		const deleteButton = document.querySelector('.delete-btn');
		if (imageElement) {
			imageElement.src = this.profileImageSrc;
		}
		if (fileNameElement) {
			fileNameElement.textContent = this.isImageUploaded ? this.fileName : '';
		}
		if (deleteButton) {
			deleteButton.style.display = this.isImageUploaded ? 'inline-block' : 'none';
		}
	}

	render() {
		const fileNameSection = `
			<div class="file-info">
				<span class="file-name"></span>
				<button class="delete-btn" onclick="window.userProfileInstance.handleImageRemove()" style="display: none;">x</button>
			</div>
		`;
		this.buttons = `
			<div class="btn-wrap">
				<button class="btn btn--primary" type="submit">수정하기</button>
			</div>
		`;

		const profileImageSection = `
			<div class="profile-image-wrapper">
				<div class="profile-image" onclick="window.userProfileInstance.profileImageInput.click()">
					<img src="${this.profileImageSrc}" alt="Profile Image" />
				</div>
				${fileNameSection}
			</div>
		`;

		document.body.appendChild(this.profileImageInput);

		return `
			<section class="contents">
				<div class="container">
					<h1 class="page-title">프로필</h1>
					<div class="profile-container">
						<div class="profile">
							${profileImageSection}
							${ProfileForm(this.userData, this.buttons)}
						</div>
					</div>
				</div>
			</section>
		`;
	}
}

window.userProfileInstance = new UserProfile();
document.querySelector('#app').innerHTML = window.userProfileInstance.render();

export default UserProfile;
