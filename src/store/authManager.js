import { route, url } from '../router';
import defaultProfileImage from '/public/avatar.svg';

class AuthManager {
	static #instance; // class 변수 선언
	#state;
	#listeners = new Set(); // 상태 변화 리스너

	constructor() {
		// 하나의 인스턴스로 상태관리를 하기 위해서 싱글톤 패턴 적용
		if (AuthManager.#instance) {
			return AuthManager.#instance; // 이미 인스턴스가 존재하면 기존 인스턴스를 반환
		}

		const storedUserData = this.#loadUserFromStorage();

		this.#state = {
			userId: storedUserData?.userId,
			profileImage: storedUserData?.profileImage ?? '',
		};

		AuthManager.#instance = this; // 인스턴스가 없으면 초기화하고 static 변수에 저장
	}

	get userId() {
		return this.#state.userId;
	}

	get isAuthenticated() {
		return !!this.#state.userId;
	}

	get profileImage() {
		return this.#state.profileImage || defaultProfileImage;
	}

	setState(newState) {
		this.#state = { ...this.#state, ...newState };
		console.log('AuthManager setState: ', this.#state);
		this.#saveUserToStorage();
		this.#alarmListeners();
	}

	#loadUserFromStorage() {
		const userStringData = localStorage.getItem('user');
		const userData = JSON.parse(userStringData);

		return userData && userData.userId ? userData : null;
	}

	#saveUserToStorage() {
		if (this.#state.userId) {
			localStorage.setItem('user', JSON.stringify(this.#state));
		}
	}

	login({ userId, profileImage }) {
		this.setState({ userId, profileImage });
		console.log('User logged in userId:', userId);
	}

	logout = () => {
		localStorage.removeItem('user');
		this.setState({ userId: null });
		route(url.login);
	};

	subscribeListener(listener) {
		// 이벤트 리스너 등록
		this.#listeners.add(listener);
	}

	unsubscribeListener(listener) {
		// 이벤트 리스너 제거
		this.#listeners.delete(listener);
	}

	#alarmListeners() {
		// 상태변화 시 외부 이벤트 리스너 호출
		this.#listeners.forEach((listener) => {
			listener({
				isAuthenticated: this.isAuthenticated,
				userId: this.userId,
				profileImage: this.profileImage,
			});
		});
	}
}

const authManager = new AuthManager();

export default authManager;
