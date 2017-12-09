// @flow
import React, {Component} from 'react';
import {pick} from 'ramda';
import connect from './connect';
import UserStore, {type UserModel} from './UserStore';

type UserInfoProps = {|
	currentUser: UserModel,
	userStore: UserStore,
	unfinishedTodoCount: number,
|};

export default connect({
	userInfoStore: userInfoStore => ({
		...pick(['unfinishedTodoCount'], userInfoStore),
		userStore: userInfoStore.userStore,
		currentUser: userInfoStore.userStore.currentUser,
	}),
})(class UserInfo extends Component<UserInfoProps> {
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
