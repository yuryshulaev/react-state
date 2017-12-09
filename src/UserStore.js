import SeamlessStore from './SeamlessStore';

export default class UserStore extends SeamlessStore {
	static initialState = {
		currentUser: {
			id: 1,
			name: 'Some user',
		},
	};

	setCurrentUserId(id) {
		this.setState(this.state.setIn(['currentUser', 'id'], id))
	}
}
