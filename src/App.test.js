import React from 'react';
import ReactDOM from 'react-dom';
import TodoListStore from './TodoListStore';
import App from './App';

it('renders without crashing', () => {
	const env = {
		api: {
			fetchJson: () => Promise.resolve([]),
		}
	};

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

	const div = document.createElement('div');
	ReactDOM.render(<App stores={stores}/>, div);
});
