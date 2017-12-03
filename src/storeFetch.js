import immutable from 'immutable';

export default async function storeFetch(store, url, requestField = null, requestStatusField = 'requestStatus') {
	if (requestField && store[requestField]) {
		store[requestField].cancel();
		store[requestField] = null;
	}

	store.setState(store.state.set(requestStatusField, 'loading'));
	const request = store.env.api.fetchJson(url);

	if (requestField) {
		store[requestField] = request;
	}

	try {
		const data = await request;
		store.setState(store.state.set(requestStatusField, 'success'));
		return immutable.fromJS(data);
	} catch (err) {
		console.error(err);
		store.setState(store.state.set(requestStatusField, 'error'));
		throw err;
	}
}
