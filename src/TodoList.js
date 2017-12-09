// @flow
import React, {Component} from 'react';
import {pick} from 'ramda';
import connect from './connect';
import TodoStore, {type TodoModel} from './TodoStore';
import {type UserModel} from './UserStore';
import Todo from './Todo';

type TodoListProps = {|
	todos: TodoModel[],
	unfinishedTodoCount: number,
	filter: number,
	requestStatus: string,
	currentUser: UserModel,
	todoStore: TodoStore,
|};

export default connect({
	todoStore: pick(['todos', 'filter', 'requestStatus', 'unfinishedTodoCount']),
	userStore: pick(['currentUser']),
})(class TodoList extends Component<TodoListProps> {
	render() {
		const {todos, unfinishedTodoCount, filter, requestStatus, currentUser} = this.props;

		return (
			<div>
				<div onClick={this.onFilterClick}>{filter}</div>
				<div>{requestStatus}</div>
				{todos.map((todo, i) =>
					<Todo key={todo.id} todo={todo} index={i} isAuthor={todo.userId === currentUser.id} onClick={this.onTodoClick}/>
				)}
				<div>Unfinished: <strong>{unfinishedTodoCount}</strong></div>
			</div>
		);
	}

	onFilterClick = () => {
		const {todoStore, filter} = this.props;
		todoStore.setFilter(filter + 1);
	}

	onTodoClick = (index, event) => {
		const {todoStore} = this.props;
		todoStore.toggle(index);
	}
});
