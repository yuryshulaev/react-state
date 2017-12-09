export default class Store {
	static initialState = {};

	constructor(state = {}, dependencies = {}, env = {}) {
		this.state = this.mergeData(this.convertFromRaw(this.constructor.initialState), state);
		this.env = env;
		this.subscribers = [];

		for (const key in dependencies) {
			const dependency = dependencies[key];
			this[key] = dependency;
			dependency.subscribe(this.onDependencyUpdate);
		}
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

	notify() {
		if (process.env.NODE_ENV === 'development' && this.constructor.debug) {
			console.group('%cnotify', 'color: mediumPurple', this.constructor.name);
			console.groupCollapsed('more');
			console.trace();
			console.groupEnd();
		}

		for (const subscriber of this.subscribers) {
			subscriber(this);
		}

		if (process.env.NODE_ENV === 'development' && this.constructor.debug) {
			console.groupEnd();
		}
	}

	setState(state) {
		this.state = state;
		this.notify();
	}

	onDependencyUpdate = () => {
		this.notify();
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
