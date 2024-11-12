class AuthManager {
	static #instance; // class 변수 선언
	#state;
	#listeners = new Set(); // 상태 변화 리스너

	constructor() {
		// 하나의 인스턴스로 상태관리를 하기 위해서 싱글톤 패턴 적용
		if (AuthManager.#instance) {
			return AuthManager.#instance; // 이미 인스턴스가 존재하면 기존 인스턴스를 반환
		}

		this.#state = {
			userId: this.#loadUserFromStorage(),
		};

		AuthManager.#instance = this; // 인스턴스가 없으면 초기화하고 static 변수에 저장
		console.log(this.#state);
	}

	setState(newState) {
		this.#state = { ...this.#state, ...newState };
		this.#saveUserToStorage();
		this.#alarmListeners();
	}

	#loadUserFromStorage() {
		const userData = localStorage.getItem('user');
		const userId = userData ? JSON.parse(userData).userId : null;

		return userId;
	}

	#saveUserToStorage() {
		localStorage.setItem('user', JSON.stringify(this.#state.userId));
	}

	login({ userId }) {
		this.setState({ userId });
		console.log('User logged in userId:', userId);
	}

	logout() {
		this.setState(null);
		console.log('User logged out');
	}

	get userId() {
		return this.#state?.userId;
	}

	get isAuthenticated() {
		return this.#state.userId !== null;
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
		// 상태변화시 이벤트 리스너 호출
		this.#listeners.forEach((listener) => {
			listener({
				...this.#state,
				isAuthenticated: this.isAuthenticated,
			});
		});
	}
}

const authManager = new AuthManager();

export default authManager;
