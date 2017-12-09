import flyd from 'flyd';

function debounceInit(time, source) {
	let timeout;

	return flyd.combine(function (source, self) {
		if (timeout) {
			clearTimeout(timeout);
		} else {
			self(source());
		}

		timeout = setTimeout(function () {
			self(source());
		}, time);
	}, [source]);
}

export default flyd.curryN(2, debounceInit);
