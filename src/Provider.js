import {PureComponent} from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';

export default class Provider extends PureComponent {
	static childContextTypes = {
		stores: PropTypes.object,
	};

	static contextTypes = {
		stores: PropTypes.object,
	};

	getChildContext() {
		return {
			stores: {...this.context.stores, ...omit(this.props, ['children'])},
		};
	}

	render() {
		return this.props.children;
	}
}
