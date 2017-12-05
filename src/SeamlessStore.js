import Immutable from 'seamless-immutable';
import Store from './Store';

export default class SeamlessStore extends Store {
	convertFromRaw(data) {
		return Immutable(data);
	}

	mergeData(a, b) {
		return Immutable.merge(a, b);
	}
}
