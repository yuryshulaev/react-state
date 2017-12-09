import React, {PureComponent} from 'react';
import glamorous from 'glamorous';

const Root = glamorous.h2(({completed, isAuthor}) => ({
	textDecoration: completed && 'line-through',
	color: isAuthor && 'mediumPurple',
}));

export default class Todo extends PureComponent {
	render() {
		const {todo, isAuthor} = this.props;

		return (
			<Root completed={todo.completed} isAuthor={isAuthor} onClick={this.onClick}>
				{todo.title} by {todo.userId}
			</Root>
		);
	}

	onClick = event => {
		const {onClick, index} = this.props;
		onClick(index, event);
	}
}
