import flyd from 'flyd';

export default function atom(value) {
	const stream = flyd.stream(value);
	stream.shouldUpdateValue = (value, stream) => value !== stream();
	return stream;
}
