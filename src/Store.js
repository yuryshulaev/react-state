export default class Store {
	static initialState = {};

	constructor(state, env = {}) {
		this.state = this.mergeData(this.convertFromRaw(this.constructor.initialState), state);
		this.env = env;
		this.subscribers = [];
	}

	subscribe(subscriber) {
		const index = this.subscribers.indexOf(subscriber);

		if (index !== -1) {
			return;
		}

		this.subscribers.push(subscriber);
	}

	subscribeAndCall(subscriber) {
		this.subscribe(subscriber);
		subscriber(this);
	}

	unsubscribe(subscriber) {
		const index = this.subscribers.indexOf(subscriber);

		if (index !== -1) {
			this.subscribers.splice(index, 1);
		}
	}

	emit() {
		for (const subscriber of this.subscribers) {
			subscriber(this);
		}
	}

	setState(state) {
		this.state = state;
		this.emit();
	}

	convertFromRaw(data) {
		return data;
	}

	mergeData(a, b) {
		return {...a, ...b};
	}

	pickState(keys) {
		const picked = {};

		for (const key of keys) {
			picked[key] = this.state[key];
		}

		return picked;
	}
}
