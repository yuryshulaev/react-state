import throttle from 'lodash/throttle';
import SeamlessStore from './SeamlessStore';
import memoize from './memoize';

export default class TodoStore extends SeamlessStore {
	static initialState = {
		todos: [],
		requestStatus: 'notAsked',
		filter: 0,
	};

	constructor(...args) {
		super(...args);
		this.subscribeAndCall(throttle(() => this.watchFilter(), 1000));
	}

	async reload() {
		const todos = await this.env.fetch(this, 'https://jsonplaceholder.typicode.com/todos', 'loadRequest');
		this.setState(this.state.set('todos', todos));
	}

	watchFilter = memoize([
		() => this.state.filter,
	], filter => {
		this.reload();
	})

	setFilter(filter) {
		this.setState(this.state.set('filter', filter));
	}

	toggle(index) {
		this.setState(this.state.updateIn(['todos', index, 'completed'], completed => !completed));
	}

	getUnfinishedTodoCount = memoize([
		() => this.state.todos,
	], todos => {
		return todos.reduce((acc, todo) => acc + (todo.completed ? 0 : 1), 0);
	})
}
