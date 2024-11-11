class AuthManager {
	#userState;

	constructor() {
		this.#userState = this.#loadUserFromStorage();
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
