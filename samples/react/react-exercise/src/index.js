import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
/***
 * ReactDOM.render(element, container[, callback])
 * ReactDOM.hydrate(element, container[, callback])
 * ReactDOM.unmountComponentAtNode(container)
 * ReactDOM.findDOMNode(component)
 * ReactDOM.createPortal(child, container)
 */