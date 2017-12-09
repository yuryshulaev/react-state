// @flow
import atom from './atom';
import SeamlessStore from './SeamlessStore';

export type UserModel = {|
	id: number,
	name: string,
|};

export default class UserStore extends SeamlessStore {
	currentUser = atom();

	setCurrentUserId(id: number) {
		this.currentUser(this.currentUser().set('id', id));
	}
}
