import flyd from 'flyd';
import {dropRepeatsWith} from 'flyd/module/droprepeats';
import {equals} from 'ramda';
import {updateIn} from 'seamless-immutable';
import atom from './atom';
import debounceInit from './debounceInit';
import Store from './Store';

export default class TodoStore extends Store {
	todos = atom([]);
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

	setFilter(filter) {
		this.filter(filter);
	}

	toggle(index) {
		this.todos(updateIn(this.todos(), [index, 'completed'], completed => !completed));
	}
}
