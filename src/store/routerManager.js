class RouterManager {
	static #instance;
	#state;
	#listeners = new Set();

	constructor() {
		if (RouterManager.#instance) {
			return RouterManager.#instance;
		}

		this.#state = {
			path: window.location.pathname,
		};

		RouterManager.#instance = this;
	}

	get path() {
		// 외부에 전달하는 상태
		return this.#state.path;
	}

	setState(newState) {
		this.#state = { ...this.#state, ...newState };
		this.#alarmListeners();
	}

	subscribeListener(listener) {
		this.#listeners.add(listener);
	}

	unsubscribeListener(listener) {
		this.#listeners.delete(listener);
	}

	#alarmListeners() {
		this.#listeners.forEach((listener) => {
			listener({ path: this.path });
		});
	}
}

const routerManager = new RouterManager();

export default routerManager;
