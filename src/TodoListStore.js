import immutable from 'immutable';
import throttle from 'lodash/throttle';
import Store from './Store';
import memoize from './memoize';
import fetchRemoteData from './fetchRemoteData';

export default class TodoListStore extends Store {
	static initialState = {
		todos: [],
		requestStatus: 'notAsked',
		filter: 0,
	};

	loadRequest = null;

	constructor(...args) {
		super(...args);
		this.subscribeAndCall(throttle(() => this.watchFilter(), 1000));
	}

	async reload() {
		if (this.loadRequest) {
			this.loadRequest.cancel();
			this.loadRequest = null;
		}

		this.loadRequest = this.env.api.fetchJson('https://jsonplaceholder.typicode.com/todos');
		const todos = await fetchRemoteData(this, this.loadRequest);
		this.loadRequest = null;
		this.setState(this.state.set('todos', immutable.fromJS(todos)));
	}

	watchFilter = memoize([
		() => this.state.get('filter'),
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
		() => this.state.get('todos'),
	], todos => {
		return todos.reduce((acc, todo) => acc + (todo.get('completed') ? 0 : 1), 0);
	})
}
