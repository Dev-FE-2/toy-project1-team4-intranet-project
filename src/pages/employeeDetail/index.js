import './style.css';
import employeesData from '../../../server/data/employees';
import { ProfileForm } from '../../components/pages/profile/profileForm';
import { url } from '../../router/url';
import ImageUploader from '../../components/pages/profile/ImageUploader';

export default class EmployeeDetail {
	constructor() {
		const urlParams = new URLSearchParams(window.location.search);
		this.userId = urlParams.get('userId');

		this.employeeData = employeesData.find((employee) => employee.userId === this.userId);
		this.imageUploader = new ImageUploader(
			this.employeeData?.profileImage || '../../../public/avatar.svg',
			this.handleImageChange.bind(this),
		);
	}

	handleImageChange(newImageSrc) {
		this.employeeData.profileImage = newImageSrc;
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

	render() {
		setTimeout(() => {
			document
				.querySelector('.btn--danger')
				.addEventListener('click', this.handleDeleteConfirmation.bind(this));
			document
				.querySelector('.btn--primary')
				.addEventListener('click', this.handleUpdate.bind(this));
		}, 0);

		return `
			<section class="contents">
				<div class="container">
					<h1 class="page-title">직원 정보 수정</h1>
					<div class="profile-container">
						<div class="profile">
							${this.imageUploader.render()}
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
