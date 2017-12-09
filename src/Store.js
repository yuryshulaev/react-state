export default class Store {
	constructor(dependencies = {}, env = {}) {
		this.env = env;
		Object.assign(this, dependencies);
	}

	setState(state) {
		for (const key in state) {
			this[key](state[key]);
		}

		return this;
	}
}
