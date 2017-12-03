export default async function fetchRemoteData(store, promise, requestStatusField = 'requestStatus', callback = x => x) {
	console.log('remote loading');
	store.setState(store.state.set('requestStatus', 'loading'));

	try {
		const data = await callback(promise);
		console.log('remote success');
		store.setState(store.state.set('requestStatus', 'success'));
		return data;
	} catch (err) {
		console.log('remote error');
		console.error(err);
		store.setState(store.state.set('requestStatus', 'error'));
		throw err;
	}
}
