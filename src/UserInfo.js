import React, {Component} from 'react';
import connect from './connect';

export default connect({
	userInfoStore: userInfoStore => ({
		userStore: userInfoStore.userStore,
		currentUser: userInfoStore.userStore.state.currentUser,
		unfinishedTodoCount: userInfoStore.unfinishedTodoCount(userInfoStore.userStore.state.currentUser.id),
	}),
})(class UserInfo extends Component {
	render() {
		const {currentUser, unfinishedTodoCount} = this.props;

		return (
			<div onClick={this.onClick}>
				<div>ID: {currentUser.id}</div>
				<div>Name: {currentUser.name}</div>
				<div>Unfinished todo count: {unfinishedTodoCount}</div>
			</div>
		);
	}

	onClick = () => {
		const {userStore, currentUser} = this.props;
		userStore.setCurrentUserId(currentUser.id + 1);
	}
});
