import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const render = (Root = App) => {
	ReactDOM.render(
			<Root/>,
			document.getElementById('root')
	);
};

/***
 * ReactDOM.render(element, container[, callback])
 * ReactDOM.hydrate(element, container[, callback])
 * ReactDOM.unmountComponentAtNode(container)
 * ReactDOM.findDOMNode(component)
 * ReactDOM.createPortal(child, container)
 */

render();

if (process.env.NODE_ENV === 'development') {
	if (module.hot) {
		module.hot.accept('./App', () => {
			console.log('Hot reload just happened');
			const NextApp = require('./App').default;
			render(NextApp);
		});
	}
}