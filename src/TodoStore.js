import flyd from 'flyd';
import {dropRepeats, dropRepeatsWith} from 'flyd/module/droprepeats';
import debounceInit from './debounceInit';
import {equals} from 'ramda';
import SeamlessStore from './SeamlessStore';

export default class TodoStore extends SeamlessStore {
	todos = dropRepeats(flyd.stream(this.convertFromRaw([])));
	requestStatus = dropRepeats(flyd.stream('notAsked'));
	filter = dropRepeats(flyd.stream(0));
	filterDebounced = dropRepeatsWith(equals, debounceInit(1000, this.filter));
	reloadOnFilterChange = flyd.on(() => this.reload(), this.filterDebounced);

	unfinishedTodoCount = debounceInit(200, this.todos).map(todos => {
		return todos.reduce((acc, todo) => acc + (todo.completed ? 0 : 1), 0);
	});

	async reload() {
		this.todos(await this.env.fetch(this, 'https://jsonplaceholder.typicode.com/todos', 'loadRequest'));
	}

	setFilter(filter) {
		this.filter(filter);
	}

	toggle(index) {
		this.todos(this.todos().updateIn([index, 'completed'], completed => !completed));
	}
}
