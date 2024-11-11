class AuthManager {
	static #instance; // class 변수
	#userState; // 인스턴스 변수

	constructor() {
		// 하나의 인스턴스로 상태관리를 하기 위해서 싱글톤 패턴 적용
		if (AuthManager.#instance) {
			return AuthManager.#instance; // 이미 인스턴스가 존재하면 기존 인스턴스를 반환
		}

		// 인스턴스가 없으면 초기화하고 static 변수에 저장
		this.#userState = this.#loadUserFromStorage();
		AuthManager.#instance = this;
	}

	setState(newState) {
		this.#userState = { ...this.#userState, ...newState };
		this.#saveUserToStorage();
	}

	#loadUserFromStorage() {
		const userData = localStorage.getItem('user');
		return userData ? JSON.parse(userData) : null;
	}

	#saveUserToStorage() {
		localStorage.setItem('user', JSON.stringify(this.#userState));
	}

	login(userInfo) {
		this.setState(userInfo);
		console.log('User logged in:', this.user);
	}

	logout() {
		this.setState(null);
		console.log('User logged out');
	}

	getUserInfo() {
		return this.#userState;
	}

	isAuthenticated() {
		return this.#userState !== null;
	}
}

const authManager = new AuthManager();

export default authManager;
