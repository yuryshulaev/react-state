import lift from 'flyd/module/lift';
import SeamlessStore from './SeamlessStore';

export default class UserInfoStore extends SeamlessStore {
	unfinishedTodoCount = lift(
		(currentUser, todos) => {
			return todos.reduce((acc, todo) => acc + (!todo.completed && todo.userId === currentUser.id ? 1 : 0), 0);
		},
		this.userStore.currentUser, this.todoStore.todos
	)
}
