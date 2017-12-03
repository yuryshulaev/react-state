import React, {PureComponent} from 'react';
import glamorous from 'glamorous';
import Provider from './Provider';
import TodoList from './TodoList';

const Header = glamorous.h1({
	color: 'blue',
});

const Section = glamorous.section({
	margin: 50,
});

export default class App extends PureComponent {
	render() {
		const {todoStore1, todoStore2} = this.props.stores;

		return (
			<Provider todoStore={todoStore1}>
				<Section>
					<Header>1</Header><TodoList/>
					<Header>1</Header><TodoList todoStore={todoStore1}/>
					<Header>2</Header><TodoList todoStore={todoStore2}/>
					<Provider todoStore={todoStore2}>
						<Header>1</Header><TodoList todoStore={todoStore1}/>
						<Header>2</Header><TodoList/>
					</Provider>
				</Section>
			</Provider>
		);
	}
}
