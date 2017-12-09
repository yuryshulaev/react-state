// @flow
import React, {PureComponent} from 'react';
import glamorous from 'glamorous';
import Store from './Store';
import Provider from './Provider';
import TodoList from './TodoList';
import UserInfo from './UserInfo';

const Header = glamorous.h1({
	color: 'blue',
});

const Section = glamorous.section({
	margin: 50,
});

export type AppProps = {|
	stores: {[string]: Store},
|};

export default class App extends PureComponent<AppProps> {
	render() {
		const {stores} = this.props;
		const {todoStore1, todoStore2} = stores;

		return (
			<Provider todoStore={todoStore1} {...stores}>
				<Section>
					<Header>User</Header>
					<UserInfo/>
				</Section>
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
