import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import stores from './stores';
import spy from './spy';
import './index.css';

if (process.env.NODE_ENV === 'development') {
	for (const key in stores) {
		spy(stores[key]);
	}

	global.stores = stores;
}

ReactDOM.render(<App stores={stores}/>, document.getElementById('root'));
