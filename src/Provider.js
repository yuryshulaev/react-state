import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

export default class Provider extends PureComponent {
	static childContextTypes = {
		stores: PropTypes.object,
	}

	getChildContext() {
		return {
			stores: omit(this.props, ['children']),
		};
	}

	render() {
		return this.props.children;
	}
}
