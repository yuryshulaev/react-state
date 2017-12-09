import atom from './atom';
import SeamlessStore from './SeamlessStore';

export default class UserStore extends SeamlessStore {
	currentUser = atom();

	setCurrentUserId(id) {
		this.currentUser(this.currentUser().set('id', id));
	}
}
