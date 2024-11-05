import './style.css';
import employeesData from '../../../server/data/employees';
import { ProfileForm } from '../../components/pages/profile/profileForm';
import { url } from '../../router/url';

export default class EmployeeDetail {
	constructor() {
		const urlParams = new URLSearchParams(window.location.search);
		this.userId = urlParams.get('userId');

		this.employeeData = employeesData.find((employee) => employee.userId === this.userId);
		this.profileImageSrc = this.employeeData?.profileImage || '../../../public/avatar.svg';
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

	handleDeleteConfirmation() {
		if (confirm('직원을 삭제하시겠습니까?')) {
			window.location.href = url.employeeList;
		}
	}

	handleUpdate(event) {
		event.preventDefault();
		alert('직원 정보가 수정되었습니다.');
		window.location.href = url.employeeList;
	}

	updateProfileImage() {
		const imageElement = document.querySelector('.profileDetail-image img');
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
			<div class="profileDetail-image-wrapper">
				<div class="profileDetail-image">
					<img src="${this.profileImageSrc}" alt="Profile Image" />
				</div>
				${fileNameSection}
			</div>
		`;

		setTimeout(() => {
			document.querySelector('.profileDetail-image').addEventListener('click', () => {
				this.profileImageInput.click();
			});
			document
				.querySelector('.delete-btn')
				.addEventListener('click', this.handleImageRemove.bind(this));
			document
				.querySelector('.btn--danger')
				.addEventListener('click', this.handleDeleteConfirmation.bind(this));
			document
				.querySelector('.btn--primary')
				.addEventListener('click', this.handleUpdate.bind(this));
		}, 0);

		document.body.appendChild(this.profileImageInput);

		return `
			<section class="contents">
				<div class="container">
					<h1 class="page-title">직원 정보 수정</h1>
					<div class="profile-container">
						<div class="profile">
							${profileImageSection}
							${ProfileForm(
								this.employeeData || {},
								`
								<div class="btn-wrap">
									<button type="button" class="btn btn--danger">직원삭제</button>
									<button type="submit" class="btn btn--primary">수정하기</button>
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
