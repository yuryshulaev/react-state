import React, {PureComponent} from 'react';
import flyd from 'flyd';
import flydObj from 'flyd/module/obj';
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
				this.storeStreams = {};
				this.subscriptions = {};

				for (const storeName of storeNames) {
					this.storeStreams[storeName] = flydObj.stream(connectors[storeName](this.getStore(storeName)));
				}
			}

			componentDidMount() {
				for (const storeName of storeNames) {
					this.subscriptions[storeName] = flyd.on(this.onDependencyUpdate, this.storeStreams[storeName]);
				}
			}

			componentWillUnmount() {
				for (const storeName of storeNames) {
					this.subscriptions[storeName].end();
				}
			}

			onDependencyUpdate = () => {
				this.forceUpdate();
			}

			render() {
				return <PureWrappedComponent {...this.getChildProps()}/>;
			}

			getChildProps() {
				const props = {...this.childProps};

				for (const storeName of storeNames) {
					Object.assign(props, this.storeStreams[storeName]());
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
