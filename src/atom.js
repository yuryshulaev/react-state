// @flow
import flyd from 'flyd';

export default function atom<T>(value: T) {
	const stream = flyd.stream(value);
	stream.shouldUpdateValue = (value, stream) => value !== stream();
	return stream;
}
