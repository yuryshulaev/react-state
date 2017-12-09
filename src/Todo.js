// @flow
import React, {PureComponent} from 'react';
import glamorous from 'glamorous';
import {type TodoModel} from './TodoStore';

const Root = glamorous.h2(({completed, isAuthor}) => ({
	textDecoration: completed && 'line-through',
	color: isAuthor && 'mediumPurple',
}));

export type TodoProps = {|
	todo: TodoModel,
	isAuthor: boolean,
	index: number,
	onClick: (number, SyntheticEvent<*>) => mixed,
|};

export default class Todo extends PureComponent<TodoProps> {
	render() {
		const {todo, isAuthor} = this.props;

		return (
			<Root completed={todo.completed} isAuthor={isAuthor} onClick={this.onClick}>
				{todo.title} by {todo.userId}
			</Root>
		);
	}

	onClick = (event: SyntheticEvent<*>) => {
		const {onClick, index} = this.props;
		onClick(index, event);
	}
}
