import * as api from './api';
import storeFetch from './storeFetch';
import TodoStore from './TodoStore';
import UserStore from './UserStore';
import UserInfoStore from './UserInfoStore';

export const env = {
	api,
	fetch: storeFetch,
};

class Stores {
	todoStore1 = new TodoStore({}, env).setState({
		todos: [
			{id: 1, title: '1/First', completed: false},
			{id: 2, title: '1/Second', completed: true},
		],
	});

	todoStore2 = new TodoStore({}, env).setState({
		todos: [
			{id: 1, title: '2/First', completed: false},
			{id: 2, title: '2/Second', completed: true},
		],
	});

	userStore = new UserStore().setState({
		currentUser: {
			id: 1,
			name: 'Some user',
		},
	});

	userInfoStore = new UserInfoStore({
		userStore: this.userStore,
		todoStore: this.todoStore1,
	});
}

const stores = new Stores();

export default stores;
