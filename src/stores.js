import * as api from './api';
import TodoListStore from './TodoListStore';
import spy from './spy';

export const env = {api};

const stores = {
	todoStore1: new TodoListStore({
		todos: [
			{id: 1, title: '1/First', completed: false},
			{id: 2, title: '1/Second', completed: true},
		],
	}, env),
	todoStore2: new TodoListStore({
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
