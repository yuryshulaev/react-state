import React, {PureComponent} from 'react';
import {pure} from 'recompose';
import pick from 'lodash/pick';
import PropTypes from 'prop-types';

export default function connect(connectors) {
	const storeNames = Object.keys(connectors);

	return WrappedComponent => {
		const PureWrappedComponent = pure(WrappedComponent);

		class Connect extends PureComponent {
			static contextTypes = {
				stores: PropTypes.object,
			};

			constructor(props, context) {
				super(props);
				this.childProps = {...pick(context.stores, storeNames), ...props};
			}

			componentDidMount() {
				for (const storeName of storeNames) {
					this.getStore(storeName).subscribe(this.onStoreUpdate);
				}
			}

			componentWillUnmount() {
				for (const storeName of storeNames) {
					this.getStore(storeName).unsubscribe(this.onStoreUpdate);
				}
			}

			onStoreUpdate = store => {
				this.forceUpdate();
			}

			render() {
				return <PureWrappedComponent {...this.getChildProps()}/>;
			}

			getChildProps() {
				const props = {...this.childProps};

				for (const storeName of storeNames) {
					Object.assign(props, connectors[storeName](this.getStore(storeName)))
				}

				return props;
			}

			getStore(name) {
				return this.childProps[name];
			}
		};

		Connect.displayName = 'Connect(' + (WrappedComponent.displayName || WrappedComponent.name || 'Component') + ')';
		return Connect;
	};
}
