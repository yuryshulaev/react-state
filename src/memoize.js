function arrayShallowEqual(a, b) {
	if (a == null || b == null || a.length !== b.length) {
		return false;
	}

	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) {
			return false;
		}
	}

	return true;
}

export function memoizeByArgs(fn, passPreviousArgs = false) {
	let lastArgs;
	let lastResult;

	return (...args) => {
		if (arrayShallowEqual(args, lastArgs)) {
			return lastResult;
		}

		const prevArgs = lastArgs;
		lastArgs = args;
		lastResult = passPreviousArgs ? fn(prevArgs || [], ...args) : fn(...args);
		return lastResult;
	};
}

export default function memoize(selectors, fn, passPreviousArgs = false) {
	const memoized = memoizeByArgs(fn, passPreviousArgs);
	return (...args) => memoized(...selectors.map(selector => selector()), ...args);
}
