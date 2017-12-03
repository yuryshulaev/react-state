import cancellable from './cancellable';

export function fetchJson(url) {
	return new cancellable(fetch(url).then(response => response.json()));
}
