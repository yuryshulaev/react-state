export default async function storeFetch(store, url, requestField = null, requestStatusField = 'requestStatus') {
	if (requestField && store[requestField]) {
		store[requestField].cancel();
		store[requestField] = null;
	}

	store[requestStatusField]('loading');
	const request = store.env.api.fetchJson(url);

	if (requestField) {
		store[requestField] = request;
	}

	try {
		const data = await request;
		store[requestStatusField]('success');
		return data;
	} catch (err) {
		console.error(err);
		store[requestStatusField]('error');
		throw err;
	}
}
