import React from 'react';
import ReactDOM from 'react-dom';
import {act} from 'react-dom/test-utils';
import Counter from './Counter';

let container = null;

beforeEach(() => {
	container = document.createElement('div');
	document.body.appendChild(container);
});

afterEach(() => {
	document.body.removeChild(container);
	container = null;
});

it('Can render and update a Counter', () => {
	act(() => {
		ReactDOM.render(<Counter />, container);
	});

	const button = container.querySelector('button');
	const p = container.querySelector('p');

	expect(p.textContent).toBe('Your click count: 0');
	expect(document.title).toBe('Your click count: 0');

	act(() => {
		button.dispatchEvent(new MouseEvent('click', {bubbles: true}));
	});
	expect(p.textContent).toBe('Your click count: 1');
	expect(document.title).toBe('Your click count: 1');
});