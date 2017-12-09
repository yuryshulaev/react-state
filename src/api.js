// @flow
import cancellable from './cancellable';

export function fetchJson(url: string) {
	return new cancellable(fetch(url).then(response => response.json()));
}
