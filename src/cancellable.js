// @flow
export type CancellablePromise<T> = Promise<T> & {
	cancelled: boolean,
	cancel: () => void,
};

export default function cancellable<T>(promise: Promise<T>) {
	const cancellablePromise: CancellablePromise<T> = (new Promise((resolve, reject) => {
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
	}) : any);

	cancellablePromise.cancelled = false;
	cancellablePromise.cancel = () => {cancellablePromise.cancelled = true};
	return cancellablePromise;
}
