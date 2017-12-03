import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import stores from './stores';
import './index.css';

ReactDOM.render(<App stores={stores}/>, document.getElementById('root'));
