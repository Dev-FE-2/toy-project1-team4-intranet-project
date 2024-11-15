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
		return this.#state.path;
	}

	setState(newState) {
		this.#state = { ...this.#state, ...newState };
		this.#alarmListeners(this.#state);
	}

	subscribeListener(listener) {
		this.#listeners.add(listener);
	}

	unsubscribeListener(listener) {
		this.#listeners.delete(listener);
	}

	#alarmListeners(newState) {
		this.#listeners.forEach((listener) => {
			listener(newState);
		});
	}
}

const routerManager = new RouterManager();

export default routerManager;
