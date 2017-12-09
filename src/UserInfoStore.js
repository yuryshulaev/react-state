// @flow
import lift from 'flyd/module/lift';
import SeamlessStore from './SeamlessStore';
import UserStore from './UserStore';
import TodoStore from './TodoStore';

export default class UserInfoStore extends SeamlessStore {
	userStore: UserStore;
	todoStore: TodoStore;

	unfinishedTodoCount = lift(
		(currentUser, todos) => {
			return todos.reduce((acc, todo) => acc + (!todo.completed && todo.userId === currentUser.id ? 1 : 0), 0);
		},
		this.userStore.currentUser, this.todoStore.todos
	)
}
