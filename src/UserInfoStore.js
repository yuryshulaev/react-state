import lift from 'flyd/module/lift';
import Store from './Store';

export default class UserInfoStore extends Store {
	unfinishedTodoCount = lift(
		(currentUser, todos) => {
			return todos.reduce((acc, todo) => acc + (!todo.completed && todo.userId === currentUser.id ? 1 : 0), 0);
		},
		this.userStore.currentUser, this.todoStore.todos
	)
}
