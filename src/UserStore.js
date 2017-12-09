import flyd from 'flyd';
import {dropRepeats} from 'flyd/module/droprepeats';
import SeamlessStore from './SeamlessStore';

export default class UserStore extends SeamlessStore {
	currentUser = dropRepeats(flyd.stream(this.convertFromRaw({
		id: 1,
		name: 'Some user',
	})));

	setCurrentUserId(id) {
		this.currentUser(this.currentUser().set('id', id));
	}
}
