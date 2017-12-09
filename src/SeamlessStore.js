// @flow
import Immutable from 'seamless-immutable';
import Store from './Store';

export default class SeamlessStore extends Store {
	convertFromRaw(data: any) {
		return Immutable(data);
	}

	mergeData(a: Object, b: Object) {
		return Immutable.merge(a, b);
	}
}
