import React, {Component} from 'react';
import connect, {pickState} from './connect';
import Todo from './Todo';

export default connect({
	todoStore: todoStore => ({
		...pickState(['todos', 'filter', 'requestStatus'])(todoStore),
		unfinishedTodoCount: todoStore.getUnfinishedTodoCount(),
	}),
})(class TodoList extends Component {
	render() {
		const {todos, unfinishedTodoCount, filter, requestStatus} = this.props;

		return (
			<div>
				<div onClick={this.onFilterClick}>{filter}</div>
				<div>{requestStatus}</div>
				{todos.map((todo, i) =>
					<Todo key={todo.get('id')} todo={todo} index={i} onClick={this.onTodoClick}/>
				)}
				<div>Unfinished: <strong>{unfinishedTodoCount}</strong></div>
			</div>
		);
	}

	onFilterClick = () => {
		const {todoStore} = this.props;
		todoStore.setFilter(todoStore.state.get('filter') + 1);
	}

	onTodoClick = (index, event) => {
		const {todoStore} = this.props;
		todoStore.toggle(index);
	}
});
