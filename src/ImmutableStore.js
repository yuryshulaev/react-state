import Immutable from 'immutable';
import Store from './Store';

export default class ImmutableStore extends Store {
	convertFromRaw(data) {
		return Immutable.fromJS(data);
	}

	mergeData(a, b) {
		return a.merge(b);
	}

	pickState(keys) {
		const picked = {};

		for (const key of keys) {
			picked[key] = this.state.get(key);
		}

		return picked;
	}
}
