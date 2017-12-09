export default class Store {
	constructor(dependencies = {}, env = {}) {
		this.env = env;
		Object.assign(this, dependencies);
	}

	setState(state) {
		for (const key in state) {
			this[key](this.convertFromRaw(state[key]));
		}

		return this;
	}

	convertFromRaw(data) {
		return data;
	}

	mergeData(a, b) {
		return {...a, ...b};
	}
}
