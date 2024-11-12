class AuthManager {
	static #instance; // class 변수 선언
	#state;
	#listeners = new Set(); // 상태 변화 리스너

	constructor() {
		// 하나의 인스턴스로 상태관리를 하기 위해서 싱글톤 패턴 적용
		if (AuthManager.#instance) {
			return AuthManager.#instance; // 이미 인스턴스가 존재하면 기존 인스턴스를 반환
		}

		// 인스턴스가 없으면 초기화하고 static 변수에 저장
		this.#state = this.#loadUserFromStorage();
		AuthManager.#instance = this;
	}

	setState(newState) {
		this.#state = { ...this.#state, ...newState };
		this.#saveUserToStorage();
		this.#alarmListeners();
	}

	#loadUserFromStorage() {
		const userData = localStorage.getItem('user');
		return userData ? JSON.parse(userData) : null;
	}

	#saveUserToStorage() {
		localStorage.setItem('user', JSON.stringify(this.#state));
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
		return this.#state;
	}

	isAuthenticated() {
		return this.#state !== null;
	}

	subscribeListener(listener) {
		// 이벤트 리스너 등록
		this.#listeners.add(listener);
	}

	unsubscribeListener(listener) {
		// 이벤트 리스너 제거
		this.#listeners.delete(listener);
	}

	#alarmListeners() {
		this.#listeners.forEach((listener) => {
			listener(this.#state);
		});
	}
}

const authManager = new AuthManager();

export default authManager;
