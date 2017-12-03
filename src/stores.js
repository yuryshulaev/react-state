import * as api from './api';
import storeFetch from './storeFetch';
import TodoStore from './TodoStore';
import spy from './spy';

export const env = {
	api,
	fetch: storeFetch,
};

const stores = {
	todoStore1: new TodoStore({
		todos: [
			{id: 1, title: '1/First', completed: false},
			{id: 2, title: '1/Second', completed: true},
		],
	}, env),
	todoStore2: new TodoStore({
		todos: [
			{id: 1, title: '2/First', completed: false},
			{id: 2, title: '2/Second', completed: true},
		],
	}, env),
};


if (process.env.NODE_ENV === 'development') {
	spy(stores.todoStore1);
	spy(stores.todoStore2);
}

export default stores;
