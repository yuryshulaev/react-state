export default function cancellable(promise) {
	const cancellablePromise = new Promise((resolve, reject) => {
		promise.then(
			result => {
				if (!cancellablePromise.cancelled) {
					resolve(result);
				}
			},
			err => {
				if (!cancellablePromise.cancelled) {
					reject(err);
				}
			}
		)
	});

	cancellablePromise.cancelled = false;
	cancellablePromise.cancel = () => {cancellablePromise.cancelled = true};
	return cancellablePromise;
}
