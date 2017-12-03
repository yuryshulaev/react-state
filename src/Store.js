import immutable from 'immutable';

export default class Store {
	static initialState = {};

	constructor(state, env = {}) {
		this.state = immutable.fromJS(this.constructor.initialState).merge(state);
		this.env = env;
		this.subscribers = [];
	}

	subscribe(subscriber) {
		console.log('subscribe');
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
		console.log('unsubscribe');
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
}
