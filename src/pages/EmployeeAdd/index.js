import './style.css';
import { ProfileImage } from '../../components/pages/Profile/ProfileImage';
import { ProfileForm } from '../../components/pages/Profile/ProfileForm';

export default function EmployeeAdd() {
	const buttons = `<div class="btn-wrap"><button class="btn btn--primary" type="submit">등록하기</button></div>`;
	const emptyUserData = {
		name: '',
		job: '',
		team: '',
		phone: '',
		email: '',
		bio: '',
		profileImage: '../../../public/avatar.svg',
	};
	return `
    <div class="container">
        <h1 class="page-title">직원 등록</h1>
        <div class="profile-container">
            <div class="profile">
                ${ProfileImage(emptyUserData.profileImage)}
                ${ProfileForm(emptyUserData, buttons)}
            </div>
        </div>
    </div>`;
}
