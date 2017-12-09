import Immutable from 'immutable';
import Store from './Store';

export default class ImmutableStore extends Store {
	convertFromRaw(data) {
		return Immutable.fromJS(data);
	}

	mergeData(a, b) {
		return a.merge(b);
	}
}
