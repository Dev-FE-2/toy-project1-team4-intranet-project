export default class ImageUploader {
	constructor(initialImageSrc, onImageChange) {
		this.imageSrc = initialImageSrc;
		this.isImageUploaded = false;
		this.fileName = '';
		this.onImageChange = onImageChange;

		this.profileImageInput = this.initProfileImageInput();
	}

	initProfileImageInput() {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = 'image/*';
		input.style.display = 'none';
		input.addEventListener('change', this.handleImageUpload.bind(this));
		return input;
	}

	handleImageUpload(event) {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				this.imageSrc = e.target.result;
				this.isImageUploaded = true;
				this.fileName = file.name;
				this.updateProfileImage();
				this.onImageChange(this.imageSrc);
			};
			reader.readAsDataURL(file);
		}
	}

	handleImageRemove() {
		this.imageSrc = '../../../public/avatar.svg';
		this.isImageUploaded = false;
		this.fileName = '';
		this.updateProfileImage();
		this.onImageChange(this.imageSrc);
	}

	updateProfileImage() {
		const imageElement = document.querySelector('.profile-image img');
		const fileNameElement = document.querySelector('.file-name');
		const deleteButton = document.querySelector('.delete-btn');

		if (imageElement) {
			imageElement.src = this.imageSrc;
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
			<div class="profile-image-wrapper">
				<div class="profile-image">
					<img src="${this.imageSrc}" alt="Profile Image" />
				</div>
				${fileNameSection}
			</div>
		`;

		setTimeout(() => {
			document.querySelector('.profile-image').addEventListener('click', () => {
				this.profileImageInput.click();
			});
			document
				.querySelector('.delete-btn')
				.addEventListener('click', this.handleImageRemove.bind(this));
		}, 0);

		document.body.appendChild(this.profileImageInput);

		return profileImageSection;
	}
}
