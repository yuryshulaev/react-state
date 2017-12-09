// @flow
export default class Store {
	env: Object

	constructor(dependencies: Object = {}, env: Object = {}) {
		this.env = env;
		Object.assign(this, dependencies);
	}

	setState(state: Object) {
		for (const key in state) {
			(this: {[string]: Function})[key](this.convertFromRaw(state[key]));
		}

		return this;
	}

	convertFromRaw(data: any) {
		return data;
	}

	mergeData(a: Object, b: Object) {
		return {...a, ...b};
	}
}
