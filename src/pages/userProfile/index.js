import './style.css';
import { ProfileImage } from '../../components/pages/Profile/ProfileImage';
import { ProfileForm } from '../../components/pages/Profile/ProfileForm';
import userData from '../../../server/data/user';

export default function Index() {
	const buttons = `<button type="submit" id="submitBtn">수정하기</button>`;

	return `
    <div class="container">
        <h1 class="page-title">프로필</h1>
        <div class="profile-container">
            <div class="profile">
                ${ProfileImage(userData.profileImage)}
                ${ProfileForm(userData, buttons)}
            </div>
        </div>
    </div>`;
}
