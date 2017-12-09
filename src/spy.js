// @flow
import flyd from 'flyd';

function getAllPropertyNames(obj) {
	const props = [];

	do {
		props.push(...Object.getOwnPropertyNames(obj));
		obj = Object.getPrototypeOf(obj);
	} while (obj);

	return props;
}

export default function spy(obj: Object) {
	for (const key of getAllPropertyNames(obj)) {
		const value = obj[key];

		if (typeof value === 'function' && key !== 'constructor' && !flyd.isStream(value)) {
			obj[key] = function (...args) {
				console.log('%ccalled', 'color: magenta', obj.constructor.name, key, args);
				return value.apply(this, args);
			};
		}
	}

	return obj;
}
