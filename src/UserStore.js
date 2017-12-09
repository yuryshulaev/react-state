import atom from './atom';
import {set} from 'seamless-immutable';
import Store from './Store';

export default class UserStore extends Store {
	currentUser = atom();

	setCurrentUserId(id) {
		this.currentUser(set(this.currentUser(), 'id', id));
	}
}
