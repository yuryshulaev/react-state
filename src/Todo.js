import React, {PureComponent} from 'react';
import glamorous from 'glamorous';

const Root = glamorous.h2(({completed}) => ({
	textDecoration: completed && 'line-through',
}));

export default class Todo extends PureComponent {
	render() {
		const {todo} = this.props;

		return (
			<Root completed={todo.completed} onClick={this.onClick}>
				{todo.title}
			</Root>
		);
	}

	onClick = event => {
		const {onClick, index} = this.props;
		onClick(index, event);
	}
}
