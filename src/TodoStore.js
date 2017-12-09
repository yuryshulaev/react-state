// @flow
import flyd from 'flyd';
import {dropRepeatsWith} from 'flyd/module/droprepeats';
import atom from './atom';
import debounceInit from './debounceInit';
import {equals} from 'ramda';
import SeamlessStore from './SeamlessStore';

export type TodoModel = {|
	id: number,
	title: string,
	userId: number,
	completed: boolean,
|};

export default class TodoStore extends SeamlessStore {
	todos = atom(this.convertFromRaw([]));
	requestStatus = atom('notAsked');
	filter = atom(0);
	filterDebounced = dropRepeatsWith(equals, debounceInit(1000, this.filter));
	reloadOnFilterChange = flyd.on(() => this.reload(), this.filterDebounced);

	unfinishedTodoCount = debounceInit(200, this.todos).map(todos => {
		return todos.reduce((acc, todo) => acc + (todo.completed ? 0 : 1), 0);
	});

	request = null;

	reload() {
		this.todos(this.env.fetch(this, 'https://jsonplaceholder.typicode.com/todos', 'request'));
	}

	setFilter(filter: number) {
		this.filter(filter);
	}

	toggle(index: number) {
		this.todos(this.todos().updateIn([index, 'completed'], completed => !completed));
	}
}
