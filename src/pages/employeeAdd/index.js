import './style.css';
import { ProfileForm } from '../../components/pages/profile/profileForm';

export default class EmployeeAdd {
	constructor() {
		this.emptyUserData = {
			username: '',
			job: '',
			team: '',
			phone: '',
			email: '',
			bio: '',
			profileImage: '../../../public/avatar.svg',
		};

		this.profileImageSrc = this.emptyUserData.profileImage;
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
		this.profileImageSrc = this.emptyUserData.profileImage;
		this.isImageUploaded = false;
		this.fileName = '';
		this.updateProfileImage();
	}

	updateProfileImage() {
		const imageElement = document.querySelector('.profileAdd-image img');
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
				<span class="file-name">${this.isImageUploaded ? this.fileName : ''}</span>
				<button class="delete-btn" style="display: ${this.isImageUploaded ? 'inline-block' : 'none'};">x</button>
			</div>
		`;

		const profileImageSection = `
			<div class="profileAdd-image-wrapper">
				<div class="profileAdd-image">
					<img src="${this.profileImageSrc}" alt="Profile Image" />
				</div>
				${fileNameSection}
			</div>
		`;

		setTimeout(() => {
			document.querySelector('.profileAdd-image').addEventListener('click', () => {
				this.profileImageInput.click();
			});
			document
				.querySelector('.delete-btn')
				.addEventListener('click', this.handleImageRemove.bind(this));
		}, 0);

		document.body.appendChild(this.profileImageInput);

		return `
			<section class="contents">
				<div class="container">
					<h1 class="page-title">직원 등록</h1>
					<div class="profile-container">
						<div class="profile">
							${profileImageSection}
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
