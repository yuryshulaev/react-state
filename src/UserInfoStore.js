import SeamlessStore from './SeamlessStore';
import memoize from './memoize';

export default class UserInfoStore extends SeamlessStore {
	unfinishedTodoCount = memoize([
		() => this.userStore.state.currentUser.id,
		() => this.todoStore.state.todos,
	], (userId, todos) => {
		return todos.reduce((acc, todo) => acc + (!todo.completed && todo.userId === userId ? 1 : 0), 0);
	})
}
